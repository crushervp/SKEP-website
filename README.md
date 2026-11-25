# SKEP Dry Chillies — B2B Spice Exporter & Processor

Official B2B website for **Shree Kalmeshwara Enterprises (SKEP Dry Chillies)**, Byadagi, Karnataka, India.

Specializing in 100% original, unblended GI-tagged Byadagi Dabbi, Byadagi Kaddi, Guntur Sannam S4, and commercial spice processor products (stemless flakes and cold-ground powders).

---

## 🌶️ Features

1. **APMC Byadagi Live Mandi Rates Bulletin:**
   - Real-time rates for **DABBI**, **KDL / KADDI**, **GUNTUR**, **2043**, and **5531** across Low, Medium, High, and Average price tiers.
   - Live Total Bags Arrived counter.
   - Interactive unit toggle: **`₹ / Qtl`** (Rupees per Quintal / 100 kg) & **`₹ / kg`**.

2. **Google Sheets Live Sync Engine:**
   - Automatically synchronizes APMC auction prices and chilli product photos every **Monday and Thursday night** after Byadagi APMC auctions.
   - Supports direct Google Drive photo links with automatic thumbnail optimization.

3. **B2B Bulk Order & Container Load Estimator:**
   - Multiples of 25 kg ordering system (default 25 kg).
   - Instant calculation of 25kg export bags, net weight, FCL / LCL container requirements, and ASTA/SHU quality specs.

4. **Multi-Variety Quote Basket & Inquiry Generator:**
   - Export inquiry ticket generation with printable summary and 1-click WhatsApp/Email sharing.

---

## 📁 Repository Structure

```
SKEP-website/
├── frontend/
│   ├── index.html                                            # Main responsive B2B website
│   └── SKEP Dry Chillies - B2B Spice Exporter & Processor.html # Full standalone web file
└── backend/
    ├── templates/
    │   ├── APMC_Mandi_Rates.csv                              # Monday & Thursday rates template
    │   ├── Chilli_Images.csv                                 # Chilli product photo template
    │   └── SKEP_Master_Sync_Sheet.csv                        # Combined single-sheet template
    ├── GOOGLE_SHEETS_SETUP_GUIDE.md                          # Full Google Sheets sync setup instructions
    ├── package.json
    └── server.js                                             # Lightweight Node.js local server
```

---

## 🚀 Running Locally

### Option A: Static Frontend
Simply open `frontend/index.html` in any modern web browser.

### Option B: Local Node.js Server
```bash
cd backend
npm start
```
Then visit [http://localhost:3000](http://localhost:3000).

---

## 📄 License & Ownership
© 2026 Shree Kalmeshwara Enterprises (SKEP Dry Chillies). All rights reserved.
Plot No. 42, APMC Spice Market Yard Road, Byadagi, Haveri District, Karnataka 581106, India.
