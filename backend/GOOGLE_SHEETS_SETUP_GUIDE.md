# SKEP Dry Chillies - Google Sheets Sync Guide
## How to Update APMC Mandi Rates & Chilli Images via Google Sheets

This guide explains how to connect your Google Sheet to the website so that every Monday and Thursday night you can update:
1. The **APMC Byadagi Mandi Rates & Bags Arrived** table.
2. The **Chilli Variety Photos** directly from Google Drive or image URLs.

---

### Step 1: Create Your Google Sheet
1. Go to [Google Sheets](https://sheets.new) and create a new spreadsheet.
2. Name it: `SKEP Byadagi APMC Rates & Chilli Catalog`.
3. Set up two tabs (or import the provided CSV files in `backend/templates/`):

#### Tab 1 Name: `APMC_Mandi_Rates`
Copy & paste or structure like this:

| SECTION | KEY / VARIETY | LOW | MEDIUM | HIGH | AVERAGE |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **META** | **DATE** | 24 Nov 2026 | | | |
| **META** | **TOTAL_BAGS** | 1,42,850 | | | |
| **RATES** | **DABBI** | 32000 | 48000 | 64000 | 49500 |
| **RATES** | **KDL / KADDI** | 26500 | 38000 | 47500 | 39000 |
| **RATES** | **GUNTUR** | 16000 | 21000 | 25500 | 21800 |
| **RATES** | **2043** | 28000 | 42000 | 53000 | 43500 |
| **RATES** | **5531** | 22500 | 34000 | 42000 | 35000 |

> **Tip:** You can enter prices in ₹/Quintal (e.g. `32000`). The website automatically calculates ₹/kg when users click the unit toggle!

---

#### Tab 2 Name: `Chilli_Images`
Copy & paste or structure like this:

| PRODUCT_ID | CHILLI_NAME | IMAGE_URL | NOTES |
| :--- | :--- | :--- | :--- |
| `byadagi-dabbi` | Original Byadagi Dabbi | https://drive.google.com/file/d/.../view | Google Drive share link or direct web link |
| `byadagi-kaddi` | Original Byadagi Kaddi | | Paste link here |
| `guntur-sannam-s4` | Original Guntur Sannam S4 | | Paste link here |
| `teja-s17` | Original Teja S17 | | Paste link here |
| `stemless-flakes` | Stemless & Crushed Flakes | | Paste link here |
| `cold-ground-powder` | Cold-Ground Powder | | Paste link here |

> **How to use Google Drive images:**
> 1. Upload your chilli photo to Google Drive.
> 2. Right-click the photo > **Share** > change access to **"Anyone with the link can view"**.
> 3. Click **Copy link** and paste it into the `IMAGE_URL` column!
> 4. The website will automatically convert the Drive link into a direct high-speed image embed!

---

### Step 2: Share Your Google Sheet
1. In your Google Sheet, click the green **Share** button in the top right.
2. Under *General access*, select **"Anyone with the link"** and set role to **Viewer**.
3. Copy the URL of your Google Sheet. It looks like:
   `https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit`

---

### Step 3: Link to the Website
1. Open your website in the browser.
2. Click the **"Google Sheets Sync"** button in the top bar (or inside the APMC Card).
3. Paste your Google Sheet URL (or Sheet ID) into the input box.
4. Click **"Save & Sync Now"**!
5. That's it! Every Monday and Thursday night, as soon as you type the new numbers or paste image links into Google Sheets, your website updates instantly!
