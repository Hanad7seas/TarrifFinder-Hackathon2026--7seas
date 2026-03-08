import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // ─── TARIFFS ──────────────────────────────────────────────
  await prisma.tariff.deleteMany();
  const tariffs = await prisma.tariff.createMany({
    data: [
      // ── Active tariffs ────────────────────────────────────
      { hsCode: "7208.10", item: "Hot-Rolled Steel Coil", description: "Steel flat-rolled products", originCountry: "US", tariffRate: "25%", status: "active", effectiveDate: new Date("2025-03-13"), reason: "Canadian retaliatory tariff on US steel under Steel & Aluminum Order (SOR/2025-95). No CUSMA exemption.", legalAuthority: "SOR/2025-95" },
      { hsCode: "7209.15", item: "Cold-Rolled Steel Sheet", description: "Steel flat-rolled, cold-reduced", originCountry: "US", tariffRate: "25%", status: "active", effectiveDate: new Date("2025-03-13"), reason: "Canadian retaliatory tariff on US steel. Remains in effect as negotiations continue.", legalAuthority: "SOR/2025-95" },
      { hsCode: "7601.10", item: "Aluminum Unwrought", description: "Aluminium, not alloyed", originCountry: "US", tariffRate: "25%", status: "active", effectiveDate: new Date("2025-03-13"), reason: "Canadian retaliatory tariff on US aluminum. Remission for manufacturing use extended to June 30, 2026." },
      { hsCode: "7601.20", item: "Aluminum Alloys", description: "Aluminium alloys", originCountry: "US", tariffRate: "25%", status: "active", effectiveDate: new Date("2025-03-13"), reason: "Canadian retaliatory tariff on US aluminum alloys." },
      { hsCode: "8703.23", item: "US-made Automobiles", description: "Motor cars, spark-ignition", originCountry: "US", tariffRate: "25%", status: "active", effectiveDate: new Date("2025-03-13"), reason: "Canadian retaliatory auto tariff under Motor Vehicles Order (SOR/2025-118). CUSMA-compliant vehicles may qualify for exemption.", legalAuthority: "SOR/2025-118" },
      { hsCode: "8708.99", item: "Auto Parts (non-CUSMA)", description: "Parts for motor vehicles", originCountry: "US", tariffRate: "25%", status: "active", effectiveDate: new Date("2025-03-13"), reason: "Non-CUSMA auto parts from US subject to 25% tariff. CUSMA-compliant parts are exempt." },
      { hsCode: "7308.30", item: "Steel Doors & Windows", description: "Steel doors, windows and frames", originCountry: "All Countries", tariffRate: "25%", status: "active", effectiveDate: new Date("2025-12-26"), reason: "New 25% Canadian tariff on steel derivative products from ALL countries, effective Dec 26, 2025." },
      { hsCode: "7317.00", item: "Steel Nails, Fasteners", description: "Nails, tacks, staples of iron or steel", originCountry: "All Countries", tariffRate: "25%", status: "active", effectiveDate: new Date("2025-12-26"), reason: "Global 25% tariff on steel derivatives effective Dec 26, 2025." },
      { hsCode: "8507.60", item: "Chinese EV Batteries", description: "Lithium-ion accumulators", originCountry: "CN", tariffRate: "100%", status: "active", effectiveDate: new Date("2024-10-01"), reason: "100% tariff on Chinese EVs and EV components. Strategic industry protection for domestic EV manufacturing." },

      // ── Phase 1 removed tariffs (Mar 4 – Sept 1, 2025) ───
      { hsCode: "2009.12", item: "Orange Juice", description: "Orange juice, frozen", originCountry: "US", tariffRate: "0%", status: "removed", effectiveDate: new Date("2025-03-04"), endDate: new Date("2025-09-01"), reason: "Was 25% under Phase 1 retaliatory tariffs (Mar 4 – Sept 1, 2025). Removed when Canada dropped consumer goods tariffs." },
      { hsCode: "2009.89", item: "Cranberry & Other Fruit Juice", description: "Other fruit juice", originCountry: "US", tariffRate: "0%", status: "removed", effectiveDate: new Date("2025-03-04"), endDate: new Date("2025-09-01"), reason: "Was 25% under Phase 1 retaliatory tariffs (Mar 4 – Sept 1, 2025). Removed effective Sept 1, 2025." },
      { hsCode: "2202.10", item: "Soft Drinks (Pepsi, Coke, etc.)", description: "Waters with added sugar or sweetening matter", originCountry: "US", tariffRate: "0%", status: "removed", effectiveDate: new Date("2025-03-04"), endDate: new Date("2025-09-01"), reason: "Was 25% under Phase 1 retaliatory tariffs (Mar 4 – Sept 1, 2025). Removed effective Sept 1, 2025." },
      { hsCode: "2203.00", item: "Beer", description: "Beer made from malt", originCountry: "US", tariffRate: "0%", status: "removed", effectiveDate: new Date("2025-03-04"), endDate: new Date("2025-09-01"), reason: "Was 25% under Phase 1 retaliatory tariffs (Mar 4 – Sept 1, 2025). Removed effective Sept 1, 2025." },
      { hsCode: "2208.30", item: "Bourbon / Whiskey", description: "Whisky", originCountry: "US", tariffRate: "0%", status: "removed", effectiveDate: new Date("2025-03-04"), endDate: new Date("2025-09-01"), reason: "Was 25% under Phase 1 retaliatory tariffs (Mar 4 – Sept 1, 2025). Removed effective Sept 1, 2025." },
      { hsCode: "0901.21", item: "Coffee, roasted", description: "Coffee, roasted, not decaffeinated", originCountry: "US", tariffRate: "0%", status: "removed", effectiveDate: new Date("2025-03-04"), endDate: new Date("2025-09-01"), reason: "Was 25% under Phase 1 retaliatory tariffs (Mar 4 – Sept 1, 2025). Removed effective Sept 1, 2025." },
      { hsCode: "2008.11", item: "Peanut Butter", description: "Groundnuts, peanut butter", originCountry: "US", tariffRate: "0%", status: "removed", effectiveDate: new Date("2025-03-04"), endDate: new Date("2025-09-01"), reason: "Was 25% under Phase 1 retaliatory tariffs (Mar 4 – Sept 1, 2025). Removed effective Sept 1, 2025." },
      { hsCode: "2204.21", item: "Wine", description: "Wine of fresh grapes", originCountry: "US", tariffRate: "0%", status: "removed", effectiveDate: new Date("2025-03-04"), endDate: new Date("2025-09-01"), reason: "Was 25% under Phase 1 retaliatory tariffs (Mar 4 – Sept 1, 2025). Removed effective Sept 1, 2025." },
      { hsCode: "2103.20", item: "Ketchup / Tomato Sauces", description: "Tomato ketchup and other tomato sauces", originCountry: "US", tariffRate: "0%", status: "removed", effectiveDate: new Date("2025-03-04"), endDate: new Date("2025-09-01"), reason: "Was 25% under Phase 1 retaliatory tariffs (Mar 4 – Sept 1, 2025). Removed effective Sept 1, 2025." },
      { hsCode: "2103.30", item: "Mustard & Prepared Sauces", description: "Mustard flour, meal and prepared mustard", originCountry: "US", tariffRate: "0%", status: "removed", effectiveDate: new Date("2025-03-04"), endDate: new Date("2025-09-01"), reason: "Was 25% under Phase 1 retaliatory tariffs (Mar 4 – Sept 1, 2025). Removed effective Sept 1, 2025." },
      { hsCode: "2103.90", item: "Dressings & Condiments", description: "Sauces and preparations therefor", originCountry: "US", tariffRate: "0%", status: "removed", effectiveDate: new Date("2025-03-04"), endDate: new Date("2025-09-01"), reason: "Was 25% under Phase 1 retaliatory tariffs (Mar 4 – Sept 1, 2025). Removed effective Sept 1, 2025." },
      { hsCode: "2104.10", item: "Soups & Broths (Campbell's etc.)", description: "Soups and broths and preparations therefor", originCountry: "US", tariffRate: "0%", status: "removed", effectiveDate: new Date("2025-03-04"), endDate: new Date("2025-09-01"), reason: "Was 25% under Phase 1 retaliatory tariffs (Mar 4 – Sept 1, 2025). Removed effective Sept 1, 2025." },
      { hsCode: "2106.90", item: "Chips, Snacks & Food Preparations", description: "Food preparations not elsewhere specified", originCountry: "US", tariffRate: "0%", status: "removed", effectiveDate: new Date("2025-03-04"), endDate: new Date("2025-09-01"), reason: "Was 25% under Phase 1 retaliatory tariffs (Mar 4 – Sept 1, 2025). Removed effective Sept 1, 2025." },
      { hsCode: "1904.10", item: "Breakfast Cereals (Cheerios, Corn Flakes)", description: "Prepared cereals obtained by swelling or roasting", originCountry: "US", tariffRate: "0%", status: "removed", effectiveDate: new Date("2025-03-04"), endDate: new Date("2025-09-01"), reason: "Was 25% under Phase 1 retaliatory tariffs (Mar 4 – Sept 1, 2025). Removed effective Sept 1, 2025." },
      { hsCode: "1904.20", item: "Granola Bars & Oats (Quaker etc.)", description: "Prepared cereals, granola bars", originCountry: "US", tariffRate: "0%", status: "removed", effectiveDate: new Date("2025-03-04"), endDate: new Date("2025-09-01"), reason: "Was 25% under Phase 1 retaliatory tariffs (Mar 4 – Sept 1, 2025). Removed effective Sept 1, 2025." },
      { hsCode: "1905.31", item: "Cookies & Biscuits (Oreo etc.)", description: "Sweet biscuits (cookies)", originCountry: "US", tariffRate: "0%", status: "removed", effectiveDate: new Date("2025-03-04"), endDate: new Date("2025-09-01"), reason: "Was 25% under Phase 1 retaliatory tariffs (Mar 4 – Sept 1, 2025). Removed effective Sept 1, 2025." },
      { hsCode: "1704.90", item: "Candy & Confectionery (M&M's etc.)", description: "Sugar confectionery not containing cocoa", originCountry: "US", tariffRate: "0%", status: "removed", effectiveDate: new Date("2025-03-04"), endDate: new Date("2025-09-01"), reason: "Was 25% under Phase 1 retaliatory tariffs (Mar 4 – Sept 1, 2025). Removed effective Sept 1, 2025." },
      { hsCode: "1806.32", item: "Chocolate (Hershey's, Reese's)", description: "Chocolate and food preparations containing cocoa", originCountry: "US", tariffRate: "0%", status: "removed", effectiveDate: new Date("2025-03-04"), endDate: new Date("2025-09-01"), reason: "Was 25% under Phase 1 retaliatory tariffs (Mar 4 – Sept 1, 2025). Removed effective Sept 1, 2025." },
      { hsCode: "2007.99", item: "Jams, Jellies & Syrups", description: "Jams, fruit jellies, marmalades and purées", originCountry: "US", tariffRate: "0%", status: "removed", effectiveDate: new Date("2025-03-04"), endDate: new Date("2025-09-01"), reason: "Was 25% under Phase 1 retaliatory tariffs (Mar 4 – Sept 1, 2025). Removed effective Sept 1, 2025." },
      { hsCode: "3402.20", item: "Laundry & Dish Detergents (Tide, Dawn)", description: "Preparations for washing, retail packaging", originCountry: "US", tariffRate: "0%", status: "removed", effectiveDate: new Date("2025-03-04"), endDate: new Date("2025-09-01"), reason: "Was 25% under Phase 1 retaliatory tariffs (Mar 4 – Sept 1, 2025). Removed effective Sept 1, 2025." },
      { hsCode: "3402.90", item: "Cleaning Sprays & Products", description: "Surface-active preparations and cleaning agents", originCountry: "US", tariffRate: "0%", status: "removed", effectiveDate: new Date("2025-03-04"), endDate: new Date("2025-09-01"), reason: "Was 25% under Phase 1 retaliatory tariffs (Mar 4 – Sept 1, 2025). Removed effective Sept 1, 2025." },
      { hsCode: "3306.10", item: "Toothpaste (Colgate, Crest)", description: "Dentifrices", originCountry: "US", tariffRate: "0%", status: "removed", effectiveDate: new Date("2025-03-04"), endDate: new Date("2025-09-01"), reason: "Was 25% under Phase 1 retaliatory tariffs (Mar 4 – Sept 1, 2025). Removed effective Sept 1, 2025." },
    ],
    skipDuplicates: true,
  });
  console.log(`✅ Seeded ${tariffs.count} tariffs`);

  // ─── PRODUCTS + ALTERNATIVES ─────────────────────────────
  await prisma.alternative.deleteMany();
  await prisma.product.deleteMany();

  const productsData = [
    // ── Beverages: Juice ─────────────────────────────────
    {
      upc: "048500017753", name: "Tropicana Pure Premium No Pulp Orange Juice 1.75L", brand: "Tropicana", category: "Fruit Juice", originCountry: "US", originDetail: "Tropicana Products Inc (PepsiCo), Bradenton, Florida, USA", hsCode: "2009.12", priceCad: 7.99,
      alternatives: [
        { altName: "Oasis Orange Juice 1.75L", altBrand: "Oasis", altOrigin: "Canada (Lassonde, Quebec)", altPriceCad: "$6.99", badge: "🍁 Canadian", isCanadian: true },
        { altName: "PC Orange Juice 1.75L", altBrand: "President's Choice", altOrigin: "Canada (Loblaw)", altPriceCad: "$5.99", badge: "🍁 Canadian", isCanadian: true },
      ],
    },
    {
      upc: "025000056826", name: "Minute Maid Orange Juice 1.75L", brand: "Minute Maid", category: "Fruit Juice", originCountry: "US", originDetail: "The Coca-Cola Company, USA", hsCode: "2009.12", priceCad: 7.49,
      alternatives: [
        { altName: "PC Orange Juice 1.75L", altBrand: "President's Choice", altOrigin: "Canada (Loblaw)", altPriceCad: "$5.99", badge: "🍁 Canadian", isCanadian: true },
        { altName: "Oasis Classic Orange Juice 1.75L", altBrand: "Oasis", altOrigin: "Canada (Quebec)", altPriceCad: "$6.99", badge: "🍁 Canadian", isCanadian: true },
      ],
    },
    {
      upc: "018200435601", name: "Ocean Spray Cranberry Juice 1.5L", brand: "Ocean Spray", category: "Fruit Juice", originCountry: "US", originDetail: "Ocean Spray Cranberries Inc, USA", hsCode: "2009.89", priceCad: 6.99,
      alternatives: [
        { altName: "Northland Cranberry Cocktail", altBrand: "Northland", altOrigin: "Canada", altPriceCad: "$5.49", badge: "🍁 Canadian", isCanadian: true },
        { altName: "PC Cranberry Cocktail 1.89L", altBrand: "President's Choice", altOrigin: "Canada (Loblaw)", altPriceCad: "$4.99", badge: "🍁 Canadian", isCanadian: true },
      ],
    },

    // ── Beverages: Soft Drinks ────────────────────────────
    {
      upc: "012000001086", name: "Pepsi Cola 2L", brand: "Pepsi", category: "Soft Drinks", originCountry: "US", originDetail: "PepsiCo Inc, USA", hsCode: "2202.10", priceCad: 3.49,
      alternatives: [
        { altName: "PC Cola 2L", altBrand: "President's Choice", altOrigin: "Canada (Loblaw)", altPriceCad: "$2.49", badge: "🍁 Canadian", isCanadian: true },
        { altName: "Clearly Canadian Sparkling Water", altBrand: "Clearly Canadian", altOrigin: "Canada", altPriceCad: "$2.99", badge: "🍁 Canadian", isCanadian: true },
      ],
    },
    {
      upc: "049000028911", name: "Coca-Cola 2L", brand: "Coca-Cola", category: "Soft Drinks", originCountry: "US", originDetail: "The Coca-Cola Company, USA", hsCode: "2202.10", priceCad: 3.49,
      alternatives: [
        { altName: "Crush Orange Soda (Canadian-made)", altBrand: "Crush", altOrigin: "Canada", altPriceCad: "$2.49", badge: "🍁 Canadian", isCanadian: true },
        { altName: "PC Cola 2L", altBrand: "President's Choice", altOrigin: "Canada (Loblaw)", altPriceCad: "$2.49", badge: "🍁 Canadian", isCanadian: true },
      ],
    },
    {
      upc: "012000030178", name: "Mountain Dew 2L", brand: "Pepsi", category: "Soft Drinks", originCountry: "US", originDetail: "PepsiCo Inc, USA", hsCode: "2202.10", priceCad: 3.49,
      alternatives: [
        { altName: "Clearly Canadian Sparkling Water", altBrand: "Clearly Canadian", altOrigin: "Canada", altPriceCad: "$2.99", badge: "🍁 Canadian", isCanadian: true },
      ],
    },

    // ── Beverages: Beer ───────────────────────────────────
    {
      upc: "018200111686", name: "Budweiser Lager Beer 24pk Cans", brand: "Budweiser", category: "Beer", originCountry: "US", originDetail: "Anheuser-Busch InBev, St. Louis, Missouri (US-brewed)", hsCode: "2203.00", priceCad: 39.95,
      alternatives: [
        { altName: "Molson Canadian 24-pack", altBrand: "Molson", altOrigin: "Canada (Toronto, ON)", altPriceCad: "$39.95", badge: "🍁 Canadian", isCanadian: true },
        { altName: "Steam Whistle Pilsner 24-pack", altBrand: "Steam Whistle", altOrigin: "Canada (Toronto, ON)", altPriceCad: "$52.99", badge: "🍁 Canadian", isCanadian: true },
        { altName: "Labatt Blue 24-pack", altBrand: "Labatt", altOrigin: "Canada (London, ON)", altPriceCad: "$38.95", badge: "🍁 Canadian", isCanadian: true },
      ],
    },
    {
      upc: "082666895404", name: "Budweiser 24-pack Bottles", brand: "Budweiser", category: "Beer", originCountry: "US", originDetail: "Anheuser-Busch InBev, USA", hsCode: "2203.00", priceCad: 49.99,
      alternatives: [
        { altName: "Molson Canadian 24-pack", altBrand: "Molson", altOrigin: "Canada (Toronto, ON)", altPriceCad: "$46.99", badge: "🍁 Canadian", isCanadian: true },
        { altName: "Keith's IPA 24-pack", altBrand: "Alexander Keith's", altOrigin: "Canada (Halifax, NS)", altPriceCad: "$48.99", badge: "🍁 Canadian", isCanadian: true },
      ],
    },
    {
      upc: "018200334690", name: "Coors Light 24-pack", brand: "Coors", category: "Beer", originCountry: "US", originDetail: "Molson Coors Beverage Company, USA", hsCode: "2203.00", priceCad: 49.99,
      alternatives: [
        { altName: "Labatt Blue 24-pack", altBrand: "Labatt", altOrigin: "Canada (London, ON)", altPriceCad: "$46.99", badge: "🍁 Canadian", isCanadian: true },
        { altName: "Molson Canadian 24-pack", altBrand: "Molson", altOrigin: "Canada (Toronto, ON)", altPriceCad: "$46.99", badge: "🍁 Canadian", isCanadian: true },
      ],
    },

    // ── Beverages: Spirits ────────────────────────────────
    {
      upc: "082184090466", name: "Jack Daniel's Old No. 7 Tennessee Whiskey 750ml", brand: "Jack Daniel's", category: "Spirits & Liquor", originCountry: "US", originDetail: "Jack Daniel Distillery (Brown-Forman), Lynchburg, Tennessee", hsCode: "2208.30", priceCad: 36.95,
      alternatives: [
        { altName: "Crown Royal Whisky 750ml", altBrand: "Crown Royal", altOrigin: "Canada (Gimli, Manitoba)", altPriceCad: "$39.95", badge: "🍁 Canadian", isCanadian: true },
        { altName: "Forty Creek Barrel Select 750ml", altBrand: "Forty Creek", altOrigin: "Canada (Grimsby, ON)", altPriceCad: "$29.99", badge: "🍁 Canadian", isCanadian: true },
        { altName: "Gibson's Finest Whisky 750ml", altBrand: "Gibson's", altOrigin: "Canada", altPriceCad: "$32.95", badge: "🍁 Canadian", isCanadian: true },
      ],
    },
    {
      upc: "080686100630", name: "Jack Daniels Whiskey 750ml", brand: "Jack Daniels", category: "Spirits & Liquor", originCountry: "US", originDetail: "Jack Daniel Distillery, Lynchburg, Tennessee", hsCode: "2208.30", priceCad: 44.95,
      alternatives: [
        { altName: "Crown Royal Whisky 750ml", altBrand: "Crown Royal", altOrigin: "Canada (Gimli, Manitoba)", altPriceCad: "$39.95", badge: "🍁 Canadian", isCanadian: true },
        { altName: "Gibson's Finest Whisky 750ml", altBrand: "Gibson's", altOrigin: "Canada", altPriceCad: "$32.95", badge: "🍁 Canadian", isCanadian: true },
      ],
    },
    {
      upc: "082184090428", name: "Jack Daniel's Old No. 7 Tennessee Whiskey 1.75L", brand: "Jack Daniel's", category: "Spirits & Liquor", originCountry: "US", originDetail: "Jack Daniel Distillery, Lynchburg, Tennessee", hsCode: "2208.30", priceCad: 69.95,
      alternatives: [
        { altName: "Crown Royal 1.75L", altBrand: "Crown Royal", altOrigin: "Canada (Manitoba)", altPriceCad: "$66.95", badge: "🍁 Canadian", isCanadian: true },
      ],
    },
    {
      upc: "080686001409", name: "Jim Beam Kentucky Straight Bourbon 750ml", brand: "Jim Beam", category: "Spirits & Liquor", originCountry: "US", originDetail: "Jim Beam (Beam Suntory), Clermont, Kentucky", hsCode: "2208.30", priceCad: 29.95,
      alternatives: [
        { altName: "Canadian Club Whisky 750ml", altBrand: "Canadian Club", altOrigin: "Canada (Windsor, ON)", altPriceCad: "$29.95", badge: "🍁 Canadian", isCanadian: true },
        { altName: "Alberta Premium Rye 750ml", altBrand: "Alberta Premium", altOrigin: "Canada (Calgary, AB)", altPriceCad: "$24.99", badge: "🍁 Canadian", isCanadian: true },
      ],
    },
    {
      upc: "085592100101", name: "Jim Beam Bourbon 750ml", brand: "Jim Beam", category: "Spirits & Liquor", originCountry: "US", originDetail: "Jim Beam (Beam Suntory), Kentucky", hsCode: "2208.30", priceCad: 34.95,
      alternatives: [
        { altName: "Canadian Club Whisky 750ml", altBrand: "Canadian Club", altOrigin: "Canada (Windsor, ON)", altPriceCad: "$29.95", badge: "🍁 Canadian", isCanadian: true },
      ],
    },

    // ── Beverages: Coffee ─────────────────────────────────
    {
      upc: "025500003672", name: "Folgers Classic Roast Ground Coffee 33.9 oz", brand: "Folgers", category: "Coffee", originCountry: "US", originDetail: "The J.M. Smucker Company, New Orleans, Louisiana", hsCode: "0901.21", priceCad: 13.99,
      alternatives: [
        { altName: "Tim Hortons Ground Coffee", altBrand: "Tim Hortons", altOrigin: "Canada", altPriceCad: "$12.99", badge: "🍁 Canadian", isCanadian: true },
        { altName: "Kicking Horse Coffee", altBrand: "Kicking Horse", altOrigin: "Canada (Invermere, BC)", altPriceCad: "$14.99", badge: "🍁 Canadian", isCanadian: true },
      ],
    },

    // ── Food: Soups ───────────────────────────────────────
    {
      upc: "051000012517", name: "Campbell's Tomato Soup 540ml", brand: "Campbell's", category: "Soups", originCountry: "US", originDetail: "Campbell Soup Company, Camden, NJ", hsCode: "2104.10", priceCad: 2.49,
      alternatives: [
        { altName: "PC Tomato Soup 540ml", altBrand: "President's Choice", altOrigin: "Canada (Loblaw)", altPriceCad: "$1.99", badge: "🍁 Canadian", isCanadian: true },
        { altName: "Habitant Pea Soup 796ml", altBrand: "Habitant", altOrigin: "Canada", altPriceCad: "$2.99", badge: "🍁 Canadian", isCanadian: true },
      ],
    },
    {
      upc: "051000024435", name: "Campbell's Chicken Noodle Soup", brand: "Campbell's", category: "Soups", originCountry: "US", originDetail: "Campbell Soup Company, USA", hsCode: "2104.10", priceCad: 2.49,
      alternatives: [
        { altName: "PC Chicken Noodle Soup 540ml", altBrand: "President's Choice", altOrigin: "Canada (Loblaw)", altPriceCad: "$1.99", badge: "🍁 Canadian", isCanadian: true },
      ],
    },

    // ── Food: Condiments & Sauces ─────────────────────────
    {
      upc: "037600103527", name: "Heinz Ketchup 1L", brand: "Heinz", category: "Sauces & Condiments", originCountry: "US", originDetail: "Kraft Heinz Company — Leamington, ON & US plants", hsCode: "2103.20", priceCad: 5.99,
      alternatives: [
        { altName: "PC Ketchup 1L", altBrand: "President's Choice", altOrigin: "Canada (Loblaw)", altPriceCad: "$4.49", badge: "🍁 Canadian", isCanadian: true },
        { altName: "French's Ketchup 1L", altBrand: "French's", altOrigin: "Canada (Leamington, ON)", altPriceCad: "$4.99", badge: "🍁 Canadian", isCanadian: true },
      ],
    },
    {
      upc: "017000090536", name: "French's Yellow Mustard 750ml", brand: "French's", category: "Sauces & Condiments", originCountry: "US", originDetail: "McCormick & Company, USA", hsCode: "2103.30", priceCad: 4.49,
      alternatives: [
        { altName: "Bick's Yellow Mustard 750ml", altBrand: "Bick's", altOrigin: "Canada", altPriceCad: "$3.49", badge: "🍁 Canadian", isCanadian: true },
      ],
    },
    {
      upc: "021130126026", name: "Hidden Valley Ranch Dressing", brand: "Hidden Valley", category: "Sauces & Condiments", originCountry: "US", originDetail: "Clorox Company, USA", hsCode: "2103.90", priceCad: 5.99,
      alternatives: [
        { altName: "Renée's Caesar Dressing", altBrand: "Renée's", altOrigin: "Canada", altPriceCad: "$5.49", badge: "🍁 Canadian", isCanadian: true },
      ],
    },

    // ── Food: Peanut Butter ───────────────────────────────
    {
      upc: "013000006408", name: "Kraft Peanut Butter 1kg", brand: "Kraft", category: "Prepared Nuts & Fruit", originCountry: "US", originDetail: "Kraft Heinz Company, USA", hsCode: "2008.11", priceCad: 9.99,
      alternatives: [
        { altName: "Squirrel Peanut Butter 1kg", altBrand: "Squirrel", altOrigin: "Canada", altPriceCad: "$8.99", badge: "🍁 Canadian", isCanadian: true },
        { altName: "Smucker's Natural Peanut Butter 1kg", altBrand: "Smucker's (Canadian-made)", altOrigin: "Canada", altPriceCad: "$9.49", badge: "🍁 Canadian", isCanadian: true },
      ],
    },
    {
      upc: "048001006874", name: "Skippy Creamy Peanut Butter 15 oz", brand: "Skippy", category: "Prepared Nuts & Fruit", originCountry: "US", originDetail: "Hormel Foods Corporation, USA", hsCode: "2008.11", priceCad: 5.49,
      alternatives: [
        { altName: "Squirrel Peanut Butter 1kg", altBrand: "Squirrel", altOrigin: "Canada", altPriceCad: "$8.99", badge: "🍁 Canadian", isCanadian: true },
        { altName: "No Name Peanut Butter", altBrand: "No Name (Loblaw)", altOrigin: "Canada", altPriceCad: "$3.99", badge: "🍁 Canadian", isCanadian: true },
      ],
    },

    // ── Food: Prepared & Snacks ───────────────────────────
    {
      upc: "043000200650", name: "Kraft Macaroni & Cheese", brand: "Kraft", category: "Food Preparations", originCountry: "US", originDetail: "Kraft Heinz Company, USA", hsCode: "2106.90", priceCad: 2.29,
      alternatives: [
        { altName: "PC Mac & Cheese Dinner", altBrand: "President's Choice", altOrigin: "Canada (Loblaw)", altPriceCad: "$1.79", badge: "🍁 Canadian", isCanadian: true },
      ],
    },
    {
      upc: "028400090179", name: "Doritos Nacho Chips 275g", brand: "Frito-Lay", category: "Food Preparations", originCountry: "US", originDetail: "Frito-Lay (PepsiCo), USA", hsCode: "2106.90", priceCad: 5.49,
      alternatives: [
        { altName: "Old Dutch Ripple Chips 235g", altBrand: "Old Dutch", altOrigin: "Canada", altPriceCad: "$4.99", badge: "🍁 Canadian", isCanadian: true },
        { altName: "Covered Bridge Kettle Chips 200g", altBrand: "Covered Bridge", altOrigin: "Canada (NB)", altPriceCad: "$4.49", badge: "🍁 Canadian", isCanadian: true },
      ],
    },
    {
      upc: "028400090032", name: "Lay's Classic Chips 235g", brand: "Frito-Lay", category: "Food Preparations", originCountry: "US", originDetail: "Frito-Lay (PepsiCo), USA", hsCode: "2106.90", priceCad: 5.49,
      alternatives: [
        { altName: "Old Dutch Ripple Chips 235g", altBrand: "Old Dutch", altOrigin: "Canada", altPriceCad: "$4.99", badge: "🍁 Canadian", isCanadian: true },
        { altName: "Covered Bridge Kettle Chips 200g", altBrand: "Covered Bridge", altOrigin: "Canada (NB)", altPriceCad: "$4.49", badge: "🍁 Canadian", isCanadian: true },
      ],
    },
    {
      upc: "015400850278", name: "Uncle Ben's Long Grain Rice 2kg", brand: "Uncle Ben's", category: "Food Preparations", originCountry: "US", originDetail: "Mars Inc, USA", hsCode: "2106.90", priceCad: 7.99,
      alternatives: [
        { altName: "PC Long Grain White Rice 2kg", altBrand: "President's Choice", altOrigin: "Canada (Loblaw)", altPriceCad: "$5.99", badge: "🍁 Canadian", isCanadian: true },
      ],
    },

    // ── Food: Cereals ─────────────────────────────────────
    {
      upc: "016000275287", name: "General Mills Cheerios 520g", brand: "General Mills", category: "Breakfast Cereals", originCountry: "US", originDetail: "General Mills Inc, Minneapolis, Minnesota", hsCode: "1904.10", priceCad: 7.49,
      alternatives: [
        { altName: "PC Toasted Oat Cereal 520g", altBrand: "President's Choice", altOrigin: "Canada (Loblaw)", altPriceCad: "$5.99", badge: "🍁 Canadian", isCanadian: true },
      ],
    },
    {
      upc: "038000291210", name: "Kellogg's Corn Flakes 680g", brand: "Kellogg's", category: "Breakfast Cereals", originCountry: "US", originDetail: "Kellogg Company, Battle Creek, Michigan", hsCode: "1904.10", priceCad: 6.99,
      alternatives: [
        { altName: "PC Corn Flakes 680g", altBrand: "President's Choice", altOrigin: "Canada (Loblaw)", altPriceCad: "$5.49", badge: "🍁 Canadian", isCanadian: true },
      ],
    },
    {
      upc: "016000126305", name: "Nature Valley Granola Bars", brand: "General Mills", category: "Breakfast Cereals", originCountry: "US", originDetail: "General Mills Inc, USA", hsCode: "1904.20", priceCad: 5.99,
      alternatives: [
        { altName: "PC Toasted Oat Cereal 520g", altBrand: "President's Choice", altOrigin: "Canada (Loblaw)", altPriceCad: "$5.99", badge: "🍁 Canadian", isCanadian: true },
        { altName: "Robin Hood Oats 2kg", altBrand: "Robin Hood", altOrigin: "Canada", altPriceCad: "$7.99", badge: "🍁 Canadian", isCanadian: true },
      ],
    },
    {
      upc: "011110813602", name: "Quaker Oats 2kg", brand: "Quaker", category: "Breakfast Cereals", originCountry: "US", originDetail: "PepsiCo (Quaker Oats Company), USA", hsCode: "1904.20", priceCad: 8.99,
      alternatives: [
        { altName: "Robin Hood Oats 2kg", altBrand: "Robin Hood", altOrigin: "Canada", altPriceCad: "$7.99", badge: "🍁 Canadian", isCanadian: true },
      ],
    },

    // ── Food: Baked Goods ─────────────────────────────────
    {
      upc: "044000030643", name: "Oreo Cookies 500g", brand: "Nabisco", category: "Bread & Baked Goods", originCountry: "US", originDetail: "Mondelez International (Nabisco), USA", hsCode: "1905.31", priceCad: 6.49,
      alternatives: [
        { altName: "Dad's Cookies 500g", altBrand: "Dad's", altOrigin: "Canada", altPriceCad: "$5.49", badge: "🍁 Canadian", isCanadian: true },
        { altName: "Dare Maple Leaf Cookies 500g", altBrand: "Dare", altOrigin: "Canada", altPriceCad: "$5.99", badge: "🍁 Canadian", isCanadian: true },
      ],
    },

    // ── Food: Candy & Chocolate ───────────────────────────
    {
      upc: "040000488422", name: "M&M's 400g", brand: "Mars", category: "Candy & Confectionery", originCountry: "US", originDetail: "Mars Inc, USA", hsCode: "1704.90", priceCad: 7.99,
      alternatives: [
        { altName: "Maynards Sour Patch Kids 400g", altBrand: "Maynards", altOrigin: "Canada", altPriceCad: "$6.99", badge: "🍁 Canadian", isCanadian: true },
        { altName: "Kerr's Candy Mix 400g", altBrand: "Kerr's", altOrigin: "Canada", altPriceCad: "$6.49", badge: "🍁 Canadian", isCanadian: true },
      ],
    },
    {
      upc: "034000002603", name: "Reese's Peanut Butter Cups", brand: "Hershey's", category: "Chocolate", originCountry: "US", originDetail: "The Hershey Company, Hershey, Pennsylvania", hsCode: "1806.32", priceCad: 3.49,
      alternatives: [
        { altName: "Cadbury Dairy Milk 100g (Canadian-made)", altBrand: "Cadbury", altOrigin: "Canada", altPriceCad: "$2.99", badge: "🍁 Canadian", isCanadian: true },
        { altName: "Purdy's Milk Chocolate Bar", altBrand: "Purdy's", altOrigin: "Canada (Vancouver, BC)", altPriceCad: "$4.99", badge: "🍁 Canadian", isCanadian: true },
      ],
    },
    {
      upc: "076840102004", name: "Hershey's Chocolate Bar 100g", brand: "Hershey's", category: "Chocolate", originCountry: "US", originDetail: "The Hershey Company, USA", hsCode: "1806.32", priceCad: 3.29,
      alternatives: [
        { altName: "Cadbury Dairy Milk 100g (Canadian-made)", altBrand: "Cadbury", altOrigin: "Canada", altPriceCad: "$2.99", badge: "🍁 Canadian", isCanadian: true },
        { altName: "Purdy's Milk Chocolate Bar", altBrand: "Purdy's", altOrigin: "Canada (Vancouver, BC)", altPriceCad: "$4.99", badge: "🍁 Canadian", isCanadian: true },
      ],
    },

    // ── Food: Syrups & Jams ───────────────────────────────
    {
      upc: "041196010019", name: "Aunt Jemima Pancake Syrup 750ml", brand: "Aunt Jemima", category: "Jams & Jellies", originCountry: "US", originDetail: "Quaker Oats (PepsiCo), USA", hsCode: "2007.99", priceCad: 6.49,
      alternatives: [
        { altName: "PC Pure Maple Syrup 540ml", altBrand: "President's Choice", altOrigin: "Canada (Quebec)", altPriceCad: "$9.99", badge: "🍁 Canadian", isCanadian: true },
        { altName: "Decacer Pure Maple Syrup 540ml", altBrand: "Decacer", altOrigin: "Canada (Quebec)", altPriceCad: "$11.99", badge: "🍁 Canadian", isCanadian: true },
      ],
    },

    // ── Household: Cleaning ───────────────────────────────
    {
      upc: "037000291497", name: "Tide Original Laundry Detergent 1.47L", brand: "Tide", category: "Cleaning Products", originCountry: "US", originDetail: "Procter & Gamble, USA", hsCode: "3402.20", priceCad: 14.99,
      alternatives: [
        { altName: "PC Free & Clear Laundry Detergent 1.47L", altBrand: "President's Choice", altOrigin: "Canada (Loblaw)", altPriceCad: "$11.99", badge: "🍁 Canadian", isCanadian: true },
      ],
    },
    {
      upc: "037000919650", name: "Dawn Dish Soap 638ml", brand: "Dawn", category: "Cleaning Products", originCountry: "US", originDetail: "Procter & Gamble, USA", hsCode: "3402.20", priceCad: 4.99,
      alternatives: [
        { altName: "PC Ultra Dish Soap 638ml", altBrand: "President's Choice", altOrigin: "Canada (Loblaw)", altPriceCad: "$3.49", badge: "🍁 Canadian", isCanadian: true },
      ],
    },
    {
      upc: "019200813055", name: "Windex Glass Cleaner 765ml", brand: "Windex", category: "Cleaning Products", originCountry: "US", originDetail: "S.C. Johnson & Son, USA", hsCode: "3402.90", priceCad: 5.49,
      alternatives: [
        { altName: "Vim Cream Cleanser 500ml", altBrand: "Vim", altOrigin: "Canada", altPriceCad: "$3.99", badge: "🍁 Canadian", isCanadian: true },
      ],
    },
    {
      upc: "037000866077", name: "Febreze Air Freshener 250ml", brand: "Febreze", category: "Cleaning Products", originCountry: "US", originDetail: "Procter & Gamble, USA", hsCode: "3402.90", priceCad: 5.99,
      alternatives: [
        { altName: "Vim Cream Cleanser 500ml", altBrand: "Vim", altOrigin: "Canada", altPriceCad: "$3.99", badge: "🍁 Canadian", isCanadian: true },
      ],
    },

    // ── Household: Paper ──────────────────────────────────
    {
      upc: "036000291452", name: "Bounty Paper Towels 8-pack", brand: "Bounty", category: "Paper", originCountry: "US", originDetail: "Procter & Gamble, USA", hsCode: "3402.20", priceCad: 16.99,
      alternatives: [
        { altName: "PC Paper Towels 8-pack", altBrand: "President's Choice", altOrigin: "Canada (Loblaw)", altPriceCad: "$12.99", badge: "🍁 Canadian", isCanadian: true },
        { altName: "Cascades Enviro Paper Towels 8-pack", altBrand: "Cascades", altOrigin: "Canada (Kingsey Falls, QC)", altPriceCad: "$13.99", badge: "🍁 Canadian", isCanadian: true },
      ],
    },

    // ── Household: Dental ─────────────────────────────────
    {
      upc: "030772012345", name: "Colgate Total Toothpaste 170ml", brand: "Colgate", category: "Dental Products", originCountry: "US", originDetail: "Colgate-Palmolive, USA", hsCode: "3306.10", priceCad: 4.99,
      alternatives: [
        { altName: "PC Fluoride Toothpaste 170ml", altBrand: "President's Choice", altOrigin: "Canada (Loblaw)", altPriceCad: "$2.99", badge: "🍁 Canadian", isCanadian: true },
      ],
    },
    {
      upc: "037000803430", name: "Crest 3D White Toothpaste 116ml", brand: "Crest", category: "Dental Products", originCountry: "US", originDetail: "Procter & Gamble, USA", hsCode: "3306.10", priceCad: 5.49,
      alternatives: [
        { altName: "Arm & Hammer Toothpaste 116ml (Canadian-made)", altBrand: "Arm & Hammer", altOrigin: "Canada", altPriceCad: "$4.49", badge: "🍁 Canadian", isCanadian: true },
      ],
    },

    // ── Clothing & Footwear (no Canadian tariff — made in Asia) ──
    {
      upc: "088676139901", name: "Levi's 501 Jeans", brand: "Levi's", category: "Men's Pants & Jeans", originCountry: "US", originDetail: "Levi Strauss & Co., San Francisco, California", hsCode: null, priceCad: 89.99,
      alternatives: [
        { altName: "Buffalo David Bitton Jeans", altBrand: "Buffalo", altOrigin: "Canada (Montreal, QC)", altPriceCad: "$79.99", badge: "🍁 Canadian", isCanadian: true },
        { altName: "Reigning Champ Sweatpants", altBrand: "Reigning Champ", altOrigin: "Canada (Vancouver, BC)", altPriceCad: "$95.00", badge: "🍁 Canadian", isCanadian: true },
      ],
    },
    {
      upc: "194501258281", name: "Nike Air Max Sneakers", brand: "Nike", category: "Sports Shoes / Sneakers", originCountry: "US", originDetail: "Nike Inc, Beaverton, Oregon (manufactured in Vietnam/China)", hsCode: null, priceCad: 159.99,
      alternatives: [
        { altName: "Bauer Athletic Shoes", altBrand: "Bauer", altOrigin: "Canada", altPriceCad: "$119.99", badge: "🍁 Canadian", isCanadian: true },
        { altName: "Kodiak Steel Toe Boots", altBrand: "Kodiak", altOrigin: "Canada", altPriceCad: "$109.99", badge: "🍁 Canadian", isCanadian: true },
      ],
    },
    {
      upc: "191886832323", name: "Adidas Running Shoes", brand: "Adidas", category: "Sports Shoes / Sneakers", originCountry: "US", originDetail: "Adidas AG, USA (manufactured in Asia)", hsCode: null, priceCad: 129.99,
      alternatives: [
        { altName: "Kodiak Steel Toe Boots", altBrand: "Kodiak", altOrigin: "Canada", altPriceCad: "$109.99", badge: "🍁 Canadian", isCanadian: true },
      ],
    },

    // ── Auto Parts ────────────────────────────────────────
    {
      upc: "070273523019", name: "Castrol 5W-30 Motor Oil 5L", brand: "Castrol", category: "Auto Parts", originCountry: "US", originDetail: "Castrol (BP plc), USA", hsCode: null, priceCad: 29.99,
      alternatives: [
        { altName: "Petro-Canada PureEnergy 5W-30 5L", altBrand: "Petro-Canada", altOrigin: "Canada", altPriceCad: "$26.99", badge: "🍁 Canadian", isCanadian: true },
      ],
    },
    {
      upc: "085387063394", name: "Pennzoil 5W-30 Motor Oil 5L", brand: "Pennzoil", category: "Auto Parts", originCountry: "US", originDetail: "Shell plc (Pennzoil), USA", hsCode: null, priceCad: 27.99,
      alternatives: [
        { altName: "Petro-Canada Supreme 5W-30 5L", altBrand: "Petro-Canada", altOrigin: "Canada", altPriceCad: "$24.99", badge: "🍁 Canadian", isCanadian: true },
      ],
    },

    // ── Electronics ───────────────────────────────────────
    {
      upc: "194252460672", name: "Apple USB-C Cable 1m", brand: "Apple", category: "Wiring & Cables", originCountry: "US", originDetail: "Apple Inc, Cupertino, California (manufactured in China)", hsCode: null, priceCad: 29.99,
      alternatives: [
        { altName: "Mophie USB-C Cable 1m", altBrand: "Mophie", altOrigin: "Canada (Canadian-sold)", altPriceCad: "$24.99", badge: "🍁 Canadian", isCanadian: true },
        { altName: "Belkin USB-C Cable 1m", altBrand: "Belkin", altOrigin: "Canada (Canadian-made)", altPriceCad: "$19.99", badge: "🍁 Canadian", isCanadian: true },
      ],
    },
    {
      upc: "745883741946", name: "Energizer AA Batteries 16-pack", brand: "Energizer", category: "Batteries", originCountry: "US", originDetail: "Energizer Holdings Inc, USA", hsCode: null, priceCad: 16.99,
      alternatives: [
        { altName: "PC AA Batteries 16-pack", altBrand: "President's Choice", altOrigin: "Canada (Loblaw)", altPriceCad: "$11.99", badge: "🍁 Canadian", isCanadian: true },
      ],
    },
    {
      upc: "039800104595", name: "Duracell AA Batteries 16-pack", brand: "Duracell", category: "Batteries", originCountry: "US", originDetail: "Procter & Gamble / Berkshire Hathaway, USA", hsCode: null, priceCad: 17.99,
      alternatives: [
        { altName: "Kirkland AA Batteries 48-pack", altBrand: "Kirkland (Costco Canada)", altOrigin: "Canada", altPriceCad: "$19.99", badge: "🍁 Canadian", isCanadian: true },
      ],
    },

    // ── Furniture ─────────────────────────────────────────
    {
      upc: "043003826271", name: "IKEA LACK Side Table", brand: "IKEA", category: "Other Furniture", originCountry: "US", originDetail: "IKEA (US-distributed, manufactured overseas)", hsCode: null, priceCad: 19.99,
      alternatives: [
        { altName: "EQ3 Side Table", altBrand: "EQ3", altOrigin: "Canada (Winnipeg, MB)", altPriceCad: "$49.00", badge: "🍁 Canadian", isCanadian: true },
        { altName: "Article Furniture Side Table", altBrand: "Article", altOrigin: "Canada (Vancouver, BC)", altPriceCad: "$59.00", badge: "🍁 Canadian", isCanadian: true },
      ],
    },
  ];

  for (const p of productsData) {
    const { alternatives, ...productFields } = p;
    const product = await prisma.product.create({
      data: { ...productFields, priceCad: productFields.priceCad as unknown as number },
    });
    if (alternatives?.length) {
      await prisma.alternative.createMany({
        data: alternatives.map((a) => ({ ...a, productId: product.id })),
      });
    }
  }
  console.log(`✅ Seeded ${productsData.length} products with alternatives`);

  // ─── INDUSTRIES + COMPANIES ───────────────────────────────
  await prisma.company.deleteMany();
  await prisma.industry.deleteMany();

  const industriesData = [
    {
      name: "Steel & Metals", icon: "⚙️", impactLevel: "Critical",
      description: "25% Canadian counter-tariffs on US steel remain in effect. US charges 50% on Canadian steel. New 25% global tariff on steel derivatives since Dec 2025.",
      companies: [
        { name: "Stelco Holdings", effect: "Higher domestic demand, but US export revenue down", direction: "mixed" },
        { name: "Algoma Steel", effect: "Benefiting from reduced import competition", direction: "up" },
        { name: "Russel Metals", effect: "Distribution costs increased; derivative tariffs add pressure", direction: "down" },
      ],
    },
    {
      name: "Automotive", icon: "🚗", impactLevel: "Critical",
      description: "US 25% Section 232 auto tariff and Canadian retaliatory auto tariff both active. Cross-border supply chains severely disrupted. CUSMA-compliant vehicles exempt.",
      companies: [
        { name: "Magna International", effect: "Supply chain restructuring; $3-4B tariff cost estimated industry-wide", direction: "down" },
        { name: "Linamar Corp", effect: "Shifting to domestic sourcing where possible", direction: "mixed" },
        { name: "Stellantis (Windsor)", effect: "CUSMA compliance critical to avoid tariffs on exports", direction: "mixed" },
      ],
    },
    {
      name: "Aluminum", icon: "🔩", impactLevel: "High",
      description: "25% Canadian counter-tariff on US aluminum. US charges 50% on Canadian aluminum. Remission for manufacturing extended to June 2026.",
      companies: [
        { name: "Rio Tinto Alcan", effect: "Largest Canadian producer; exploring non-US markets", direction: "mixed" },
        { name: "Alcoa (Baie-Comeau)", effect: "Canadian smelter operations relatively insulated", direction: "up" },
        { name: "Novelis (recycling)", effect: "Recycled aluminum gaining market advantage", direction: "up" },
      ],
    },
    {
      name: "Lumber & Forestry", icon: "🪵", impactLevel: "High",
      description: "US imposed 10% tariff on softwood lumber (Oct 2025), 25-50% on furniture/cabinets (Jan 2026). No CUSMA exemption.",
      companies: [
        { name: "Canfor Corporation", effect: "Lumber exports to US down; exploring Asian markets", direction: "down" },
        { name: "West Fraser Timber", effect: "Diversifying away from US market dependency", direction: "mixed" },
        { name: "Resolute Forest Products", effect: "Pulp & paper less affected than lumber", direction: "mixed" },
      ],
    },
    {
      name: "Consumer Goods & Food", icon: "🛒", impactLevel: "Resolved",
      description: "Phase 1 retaliatory tariffs on US consumer goods were REMOVED Sept 1, 2025. Prices stabilizing.",
      companies: [
        { name: "Loblaw Companies", effect: "Import costs normalized after tariff removal", direction: "up" },
        { name: "Saputo Inc.", effect: "Canadian dairy stable; US dairy tariffs removed", direction: "up" },
        { name: "LCBO (Ontario)", effect: "US bourbon/wine back on shelves at pre-tariff prices", direction: "up" },
      ],
    },
    {
      name: "Energy", icon: "⚡", impactLevel: "Low–Medium",
      description: "Canadian energy was initially tariffed at 10% under IEEPA (Mar 2025) but CUSMA exemption applied to most. IEEPA struck down Feb 2026.",
      companies: [
        { name: "Suncor Energy", effect: "CUSMA exemption protected most crude exports", direction: "up" },
        { name: "Canadian Natural Resources", effect: "Limited tariff exposure due to CUSMA compliance", direction: "up" },
        { name: "TC Energy", effect: "Pipeline infrastructure unaffected by goods tariffs", direction: "up" },
      ],
    },
  ];

  for (const ind of industriesData) {
    const { companies, ...indFields } = ind;
    const industry = await prisma.industry.create({ data: indFields });
    await prisma.company.createMany({
      data: companies.map((c) => ({ ...c, industryId: industry.id })),
    });
  }
  console.log(`✅ Seeded ${industriesData.length} industries with companies`);

  // ─── TIMELINE ─────────────────────────────────────────────
  await prisma.timeline.deleteMany();
  await prisma.timeline.createMany({
    data: [
      { eventDate: new Date("2025-03-04"), description: "Canada imposes Phase 1 retaliatory tariffs (25%) on $30B of US consumer goods including soft drinks, chips, candy, soups, and cleaning products", category: "Canada" },
      { eventDate: new Date("2025-03-13"), description: "Canada retaliatory tariffs on US steel, aluminum & misc goods", category: "Canada" },
      { eventDate: new Date("2025-09-01"), description: "Canada removes Phase 1 consumer goods tariffs (bourbon, OJ, beer, soft drinks, snacks, cleaning products, etc.)", category: "Canada" },
      { eventDate: new Date("2025-12-26"), description: "Canada imposes 25% global tariff on steel derivative products", category: "Canada" },
      { eventDate: new Date("2026-02-20"), description: "US Supreme Court strikes down IEEPA tariffs (Learning Resources v. Trump)", category: "US" },
      { eventDate: new Date("2026-02-24"), description: "US replaces IEEPA with 10% Section 122 surcharge (CUSMA goods exempt)", category: "US" },
    ],
  });
  console.log("✅ Seeded timeline events");

  console.log("\n🎉 Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
