import requests
from bs4 import BeautifulSoup
import pandas as pd
import json

URL = "https://www.canada.ca/en/department-finance/programs/international-trade-finance-policy/canadas-response-us-tariffs/complete-list-us-products-subject-to-counter-tariffs.html"

def scrape_canada_tariffs():
    print("Fetching Canada.ca tariff list...")
    headers = {"User-Agent": "Mozilla/5.0"}  # avoids getting blocked
    response = requests.get(URL, headers=headers)
    response.raise_for_status()

    soup = BeautifulSoup(response.text, "html.parser")

    # Find all tables on the page (there may be multiple sections)
    tables = soup.find_all("table")
    print(f"Found {len(tables)} table(s)")

    all_rows = []

    for table in tables:
        headers_row = [th.get_text(strip=True) for th in table.find_all("th")]
        rows = table.find_all("tr")

        for row in rows:
            cells = row.find_all("td")
            if not cells:
                continue  # skip header rows
            values = [cell.get_text(strip=True) for cell in cells]
            if len(values) == len(headers_row):
                all_rows.append(dict(zip(headers_row, values)))

    df = pd.DataFrame(all_rows)
    print(f"Scraped {len(df)} tariff entries")
    print(df.head())

    # --- Save outputs ---

    # 1. CSV (easy to inspect)
    df.to_csv("output/canada_tariffs.csv", index=False)

    # 2. JSON seed file for Person 2 to load into DB
    records = []
    for _, row in df.iterrows():
        records.append({
            "hs_code": str(row.get("Tariff item") or "").strip(),
            "hs_chapter": str(row.get("Harmonized System (HS) Chapter") or "").strip(),
            "hs_heading": str(row.get("Harmonized System (HS) Heading") or "").strip(),
            "description": str(row.get("Indicative description") or "").strip(),
            "effective_date": str(row.get("Effectivedate") or row.get("Effective date") or "").strip(),
            "tariff_rate": str(row.get("Tariff rate") or "").strip(),
            "origin_country": "US",
            "status": "active"
        })

    with open("seeds/tariffs.json", "w") as f:
        json.dump(records, f, indent=2)

    print(f"✅ Saved {len(records)} records to seeds/tariffs.json")
    return df

if __name__ == "__main__":
    df = scrape_canada_tariffs()