
# TariffShield 🛡️

**Real-time Canadian tariff lookup and product impact analyzer**

TariffShield helps Canadian consumers and businesses instantly check whether a product is affected by US-Canada counter-tariffs, see the price impact, and discover Canadian-made alternatives.

## Overview

With the recent wave of US-Canada tariff escalations, everyday consumers are left guessing which products are affected and how much more they'll pay. TariffShield solves this by letting users:

- **Search by UPC barcode or product name** to instantly check tariff status
- **View tariff rates** by HS (Harmonized System) code with active/removed filters
- **See price impact** — before and after tariff calculations on any product
- **Discover Canadian alternatives** to tariffed US imports
- **Browse affected industries** with company-level breakdowns and impact assessments
- **Track the tariff timeline** — key dates, legal rulings, and policy changes

Data is sourced directly from **Canada.ca**, **CBSA customs tariff schedules**, and the **Canadian Tariff Finder** (tariffinder.ca), cross-referenced with product databases via UPCitemdb and Open Food Facts.

---

## Features

###  Product Search
Search any product by UPC barcode or keyword. Returns tariff status, HS code classification, origin country, and current surtax rate. Supports over 200 pre-seeded common products with verified UPCs.

###  Tariff Impact Calculator
Enter a product price and HS code to see the exact dollar and percentage increase from active tariffs. Compares pre-tariff and post-tariff pricing side by side.

###  Canadian Alternatives
For every tariffed US product, we suggest Canadian-made alternatives — helping consumers support local businesses while avoiding inflated prices.

###  Import Tariff Rates
Full searchable table of active and removed tariff rates by HS code. Filter by status, country of origin, and product category. Data pulled from CBSA schedules.

###  Affected Industries
Browse industries impacted by tariffs — from agriculture and food services to furniture and appliances — with company-level exposure details and impact severity ratings.

###  Tariff Timeline
Chronological view of all tariff-related events including implementation dates, legal challenges, Supreme Court rulings, and policy reversals.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 14 (App Router), React, Tailwind CSS 3.x |
| **Backend** | Node.js, Express.js, REST API |
| **Database** | PostgreSQL hosted on Supabase |
| **ORM** | Prisma |
| **Data Pipeline** | Python 3.11+, pandas, BeautifulSoup4, requests |
| **External APIs** | UPCitemdb API, Open Food Facts API |
| **Data Sources** | Canada.ca tariff lists, CBSA Customs Tariff, tariffinder.ca |
| **Deployment** | Vercel (frontend), Railway (backend) |

---

## Getting Started

### Prerequisites

- **Node.js** >= 18.x
- **Python** >= 3.11
- **npm** or **yarn**
- **PostgreSQL** (or a free [Supabase](https://supabase.com) account)
- **Git**

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/your-team/tariffshield.git
cd tariffshield
```

**2. Set up the frontend**

```bash
cd frontend
npm install
cp .env.example .env.local
# Add your API URL to .env.local:
# NEXT_PUBLIC_API_URL=http://localhost:3001
```

**3. Set up the backend**

```bash
cd ../backend
npm install
cp .env.example .env
# Add your database connection string to .env:
# DATABASE_URL=postgresql://user:password@host:5432/tariffshield
# PORT=3001
```

**4. Initialize the database**

```bash
npx prisma migrate dev --name init
npx prisma generate
```

**5. Seed the database**

```bash
# First, run the data pipeline to generate seed files
cd ../data
pip install pandas beautifulsoup4 requests openpyxl
python scrapers/scrape_tariffs.py
python scrapers/build_product_seeds.py

# Then seed the database
cd ../backend
npm run seed
```

**6. Set up the data pipeline (optional — only needed if re-scraping)**

```bash
cd ../data
pip install -r requirements.txt
```

### Usage

**Start the backend server:**

```bash
cd backend
npm run dev
# API running at https://tarrif-finder-hackathon2026-7seas-p1l279gul.vercel.app/
```

**Start the frontend (in a new terminal):**

```bash
cd frontend
npm run dev
# App running at https://tarrif-finder-hackathon2026-7seas-p1l279gul.vercel.app/
```

Open https://tarrif-finder-hackathon2026-7seas-p1l279gul.vercel.app/ in your browser.

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/products/search?upc=048500017753` | Look up product by UPC barcode |
| `GET` | `/api/products/search?q=orange+juice` | Search products by name/keyword |
| `GET` | `/api/tariffs?status=active` | List tariff rates with optional status filter |
| `GET` | `/api/tariffs/:hsCode` | Get tariff details for a specific HS code |
| `GET` | `/api/industries` | List all affected industries with impact data |
| `GET` | `/api/alternatives/:productId` | Get Canadian alternatives for a product |
| `GET` | `/api/calculator?price=39.99&hs=2208.30` | Calculate tariff impact on a given price |
| `GET` | `/api/timeline` | Get chronological tariff events |

---

## Project Structure

```
tariffshield/
├── frontend/                   # Next.js 14 app
│   ├── src/
│   │   ├── app/                # Pages & layouts (App Router)
│   │   ├── components/         # Reusable React components
│   │   │   ├── SearchBar.tsx
│   │   │   ├── ProductCard.tsx
│   │   │   ├── PriceImpact.tsx
│   │   │   ├── AlternativesGrid.tsx
│   │   │   ├── TariffTable.tsx
│   │   │   ├── IndustryCard.tsx
│   │   │   └── NewsBanner.tsx
│   │   └── lib/                # API client, utils, types
│   └── public/                 # Static assets
│
├── backend/                    # Express.js API server
│   ├── src/
│   │   ├── routes/             # API route handlers
│   │   ├── models/             # Prisma models
│   │   └── middleware/         # CORS, rate limiting
│   └── prisma/                 # Schema & migrations
│
├── data/                       # Python data pipeline
│   ├── scrapers/               # Canada.ca scraping scripts
│   ├── mappings/               # HS code → category maps
│   ├── seeds/                  # JSON seed files for DB
│   └── output/                 # Processed datasets
│
└── docs/                       # Documentation
```

---

## Database Schema

Four core tables power the application:

- **products** — UPC, name, brand, category, origin country, HS code, price
- **tariffs** — HS code, tariff rate, status (active/removed), effective dates, legal authority
- **alternatives** — Canadian-made alternatives linked to original products
- **industries** — Affected industries with impact severity and descriptions

---

## Data Sources

All tariff data is sourced from official Canadian government publications:

- [Canada.ca — Canadian Counter-Tariffs](https://www.canada.ca/en/department-finance/programs/tariffs.html) — Complete list of US products subject to surtaxes
- [CBSA Customs Tariff Schedule](https://www.cbsa-asfc.gc.ca/trade-commerce/tariff-tarif/menu-eng.html) — Official HS code classifications and duty rates
- [Canadian Tariff Finder](https://tariffinder.ca) — Interactive tariff lookup by product and country
- [UPCitemdb](https://www.upcitemdb.com/api) — UPC barcode → product information
- [Open Food Facts](https://world.openfoodfacts.org/api) — Open-source food product database

---

## Team

| Member | Role | Responsibilities |
|--------|------|-----------------|
| Person 1 | Frontend Developer | UI/UX, search interface, product display, responsive design, Vercel deployment |
| Person 2 | Backend / API Developer | REST API, database schema, search endpoints, Railway deployment |
| Person 3 | Data Engineer | Tariff data scraping, HS code mapping, product seeding, alternatives dataset |
| Person 4 | Full-Stack / Integration | Frontend-API integration, calculator, testing, demo prep |

---

## License

This project is licensed under the MIT License.

---

## Acknowledgements

- Government of Canada for open tariff data
- [Supabase](https://supabase.com) for database hosting
- [Vercel](https://vercel.com) for frontend deployment
- Used Claude for build, Cursor for Debug, OpenAi for organization. 
=======
>>>>>>> origin/main
