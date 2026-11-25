/**
 * SKEP Dry Chillies - Backend Local Server & Google Sheets Sync Proxy
 * Zero-dependency: runs on any standard Node.js installation (v6+)
 */

const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 3000;
const FRONTEND_DIR = path.join(__dirname, '..', 'frontend');
const DATA_FILE = path.join(__dirname, 'cached_sync_data.json');

// MIME types for static assets
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

// Initial default data
let currentSyncData = {
  lastUpdated: new Date().toISOString(),
  date: '24 Nov 2026',
  totalBags: '1,42,850',
  rates: [
    { name: 'DABBI', low: 32000, medium: 48000, high: 64000, average: 49500 },
    { name: 'KDL / KADDI', low: 26500, medium: 38000, high: 47500, average: 39000 },
    { name: 'GUNTUR', low: 16000, medium: 21000, high: 25500, average: 21800 },
    { name: '2043', low: 28000, medium: 42000, high: 53000, average: 43500 },
    { name: '5531', low: 22500, medium: 34000, high: 42000, average: 35000 }
  ],
  images: {}
};

// Load cached data if exists
if (fs.existsSync(DATA_FILE)) {
  try {
    currentSyncData = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  } catch (err) {
    console.error('Error reading cache file:', err.message);
  }
}

function saveCache() {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(currentSyncData, null, 2), 'utf8');
  } catch (err) {
    console.error('Failed to write cache:', err.message);
  }
}

// Fetch helper with HTTPS redirection handling
function fetchUrl(targetUrl, callback) {
  https.get(targetUrl, function (res) {
    if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
      return fetchUrl(res.headers.location, callback);
    }
    var data = '';
    res.on('data', function (chunk) { data += chunk; });
    res.on('end', function () { callback(null, data); });
  }).on('error', function (err) {
    callback(err);
  });
}

const server = http.createServer(function (req, res) {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    return res.end();
  }

  // API: Get current cached rates and images
  if (pathname === '/api/data') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(currentSyncData));
  }

  // API: Proxy fetch from Google Sheets
  if (pathname === '/api/proxy-sheet' && parsedUrl.query.sheetId) {
    const sheetId = parsedUrl.query.sheetId;
    const tabName = parsedUrl.query.tab || 'APMC_Mandi_Rates';
    const gvizUrl = 'https://docs.google.com/spreadsheets/d/' + sheetId + '/gviz/tq?tqx=out:csv&sheet=' + encodeURIComponent(tabName);

    fetchUrl(gvizUrl, function (err, csv) {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: err.message }));
      }
      res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end(csv);
    });
    return;
  }

  // Static File Serving from frontend directory
  let filePath = path.join(FRONTEND_DIR, pathname === '/' ? 'index.html' : pathname);

  // Security: prevent directory traversal
  if (filePath.indexOf(FRONTEND_DIR) !== 0) {
    res.writeHead(403);
    return res.end('Access denied');
  }

  fs.stat(filePath, function (err, stats) {
    if (err || !stats.isFile()) {
      // Fallback to index.html for single-page app
      filePath = path.join(FRONTEND_DIR, 'index.html');
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(filePath, function (readErr, content) {
      if (readErr) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('File not found');
      } else {
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content);
      }
    });
  });
});

server.listen(PORT, function () {
  console.log('========================================================');
  console.log('  SKEP Dry Chillies Server running at http://localhost:' + PORT);
  console.log('  Serving frontend from: ' + FRONTEND_DIR);
  console.log('========================================================');
});
