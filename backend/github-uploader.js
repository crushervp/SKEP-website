/**
 * SKEP Dry Chillies - Automated GitHub Repository Creator & File Uploader
 * Compatible with Node.js v6+ (Zero external dependencies)
 * 
 * Usage:
 *   node backend/github-uploader.js <YOUR_GITHUB_TOKEN> [REPO_NAME]
 */

var https = require('https');
var fs = require('fs');
var path = require('path');

var TOKEN = process.argv[2] || process.env.GITHUB_TOKEN;
var REPO_NAME = process.argv[3] || 'SKEP-website';
var ROOT_DIR = path.resolve(__dirname, '..');

if (!TOKEN) {
  console.error('\n[Error] GitHub Personal Access Token (PAT) is required.');
  console.log('Usage: node backend/github-uploader.js <YOUR_GITHUB_TOKEN> [REPO_NAME]\n');
  process.exit(1);
}

function githubRequest(method, endpoint, body) {
  return new Promise(function (resolve, reject) {
    var data = body ? JSON.stringify(body) : null;
    var headers = {
      'User-Agent': 'SKEP-Uploader-Agent',
      'Authorization': (TOKEN.indexOf('github_pat_') === 0 ? 'Bearer ' : 'token ') + TOKEN,
      'Accept': 'application/vnd.github.v3+json'
    };
    if (data) {
      headers['Content-Type'] = 'application/json';
      headers['Content-Length'] = Buffer.byteLength(data);
    }

    var req = https.request({
      hostname: 'api.github.com',
      path: endpoint,
      method: method,
      headers: headers
    }, function (res) {
      var raw = '';
      res.on('data', function (chunk) { raw += chunk; });
      res.on('end', function () {
        try {
          var parsed = JSON.parse(raw || '{}');
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(parsed);
          } else {
            reject(new Error('GitHub API Error (' + res.statusCode + '): ' + (parsed.message || raw)));
          }
        } catch (e) {
          reject(e);
        }
      });
    });
    req.on('error', reject);
    if (data) req.write(data);
    req.end();
  });
}

function getAllFiles(dir, fileList) {
  fileList = fileList || [];
  var items = fs.readdirSync(dir);
  for (var i = 0; i < items.length; i++) {
    var item = items[i];
    if (item === '.git' || item === 'node_modules') continue;
    var fullPath = path.join(dir, item);
    var stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      getAllFiles(fullPath, fileList);
    } else {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

function encodePath(filePath) {
  return filePath.split('/').map(function (segment) {
    return encodeURIComponent(segment);
  }).join('/');
}

function uploadFile(owner, repo, filePath) {
  var relativePath = path.relative(ROOT_DIR, filePath).replace(/\\/g, '/');
  var fileContent = fs.readFileSync(filePath);
  var base64Content = fileContent.toString('base64');
  var encodedPath = encodePath(relativePath);

  // Check if file already exists
  return githubRequest('GET', '/repos/' + owner + '/' + repo + '/contents/' + encodedPath)
    .then(function (existing) {
      return existing && existing.sha ? existing.sha : null;
    })
    .catch(function () {
      return null;
    })
    .then(function (sha) {
      var payload = {
        message: sha ? 'Update ' + relativePath : 'Add ' + relativePath,
        content: base64Content
      };
      if (sha) payload.sha = sha;
      console.log('   Uploading: ' + relativePath + '...');
      return githubRequest('PUT', '/repos/' + owner + '/' + repo + '/contents/' + encodedPath, payload);
    });
}

function uploadFilesSequentially(owner, repo, files, index) {
  index = index || 0;
  if (index >= files.length) {
    return Promise.resolve();
  }
  return uploadFile(owner, repo, files[index]).then(function () {
    return uploadFilesSequentially(owner, repo, files, index + 1);
  });
}

console.log('1. Verifying GitHub token authentication...');
githubRequest('GET', '/user')
  .then(function (user) {
    console.log('   Authenticated successfully as: @' + user.login + ' (' + (user.name || 'User') + ')');

    console.log('2. Connecting to repository "' + REPO_NAME + '" on GitHub...');
    return githubRequest('GET', '/repos/' + user.login + '/' + REPO_NAME)
      .catch(function () {
        return githubRequest('POST', '/user/repos', {
          name: REPO_NAME,
          description: 'Shree Kalmeshwara Enterprises (SKEP Dry Chillies) B2B Portal & Byadagi APMC Rates Bulletin',
          private: false,
          has_issues: true,
          has_projects: true,
          has_wiki: true
        });
      })
      .then(function (repo) {
      console.log('   Target repository: ' + repo.html_url);
      var files = getAllFiles(ROOT_DIR);
      console.log('3. Found ' + files.length + ' files to upload from ' + ROOT_DIR);
      console.log('4. Uploading files sequentially to GitHub...');

      return uploadFilesSequentially(user.login, repo.name, files).then(function () {
        console.log('\n======================================================');
        console.log('🎉 SUCCESS! All files uploaded to GitHub.');
        console.log('🌐 Repository URL: ' + repo.html_url);
        console.log('======================================================\n');
      });
    });
  })
  .catch(function (err) {
    console.error('\n[Error]:', err.message);
    process.exit(1);
  });
