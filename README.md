# SKEP Dry Chillies — B2B Spice Exporter & Processor

Official B2B website for **Shree Kalmeshwara Enterprises (SKEP Dry Chillies)**, Byadagi, Karnataka, India.

Specializing in 100% original, unblended GI-tagged Byadagi Dabbi, Byadagi Kaddi, Guntur Sannam S4, and commercial spice processor products (stemless flakes and cold-ground powders).

---

## 🌶️ Features

1. **APMC Byadagi Live Mandi Rates Bulletin:**
   - Pulls live rates for **DABBI**, **KDL / KADDI**, **GUNTUR**, **2043**, and **5531** across Low, Medium, High, and Average price tiers directly from Google Sheets (`APMC_Mandi_Rates` tab).
   - Live auction date and Total Bags Arrived counter.
   - Interactive unit toggle: **`₹ / Qtl`** (Rupees per Quintal / 100 kg) & **`₹ / kg`**.

2. **Read-Only Google Sheets Catalog & Pricing Sync:**
   - Variety cards fetch product photos and per-kg/custom prices directly from Google Sheets (`Chilli_Images` tab) on page load—visitors have read-only access and cannot modify catalog data or sheet links.
   - Automatically extracts URLs from both plain links and Google Drive Smart Chips, converting Drive links to optimized thumbnails.

3. **Bulk Order Estimator:**
   - Multiples of 25 kg ordering system (default 25 kg).
   - Calculates required 25 kg / 50 kg export bags, net weight, FCL / LCL container recommendations, ASTA/moisture specs, and estimated order price from the synced variety rates.

4. **Multi-Variety Quote Basket & Quotation Requests:**
   - Generates an instant inquiry reference ticket with 1-click clipboard summary for WhatsApp/Email.
   - Saves submitted quotation requests directly to the **`Quotation_Requests`** tab in Google Sheets via a deployed Google Apps Script Web App (`doPost`).

---

## 📁 Repository Structure

```
SKEP-website/
├── frontend/
│   └── index.html                    # Main responsive B2B website (configured via GOOGLE_SHEETS_CONFIG)
└── backend/
    ├── templates/
    │   ├── APMC_Mandi_Rates.csv      # Reference template for Mandi rates tab
    │   ├── Chilli_Images.csv         # Reference template for chilli photos & prices
    │   └── SKEP_Master_Sync_Sheet.csv
    ├── GOOGLE_SHEETS_SETUP_GUIDE.md
    ├── github-uploader.js
    ├── package.json
    └── server.js                     # Optional lightweight Node.js static/proxy server
```

---

## 🚀 Running Locally

> **Note:** Serve over `http://localhost` (rather than opening via `file://`) so browser `fetch()` requests to Google Sheets work cleanly.

### Option A: Python Static Server
```bash
python3 -m http.server 3000 --directory frontend
```
Then visit [http://localhost:3000](http://localhost:3000).

### Option B: Local Node.js Server
```bash
cd backend
npm start
```
Then visit [http://localhost:3000](http://localhost:3000).

---

## 🔗 Google Sheets Integration

Configured in `GOOGLE_SHEETS_CONFIG` inside `frontend/index.html`:
- **`APMC_Mandi_Rates` (`gid=0`)**: Market date, `TOTAL_BAGS`, and variety rates in `₹ / Qtl`.
- **`Chilli_Images` (`gid=1822063633`)**: Variety `IMAGE_URL` (supports Google Drive share links / Smart Chips) and `PRICE`.
- **`Quotation_Requests` (`inquiryWebhookUrl`)**: Appends incoming buyer inquiries via Google Apps Script Web App.

---

## 📄 License & Ownership
© 2026 Shree Kalmeshwara Enterprises (SKEP Dry Chillies). All rights reserved.
Plot No. 42, APMC Spice Market Yard Road, Byadagi, Haveri District, Karnataka 581106, India.
