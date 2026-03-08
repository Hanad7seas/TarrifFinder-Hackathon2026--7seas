import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // ─── TARIFFS ──────────────────────────────────────────────
  await prisma.tariff.deleteMany();
  const tariffs = await prisma.tariff.createMany({
    data: [
      { hsCode: "7208.10", item: "Hot-Rolled Steel Coil", description: "Steel flat-rolled products", originCountry: "US", tariffRate: "25%", status: "active", effectiveDate: new Date("2025-03-13"), reason: "Canadian retaliatory tariff on US steel under Steel & Aluminum Order (SOR/2025-95). No CUSMA exemption.", legalAuthority: "SOR/2025-95" },
      { hsCode: "7209.15", item: "Cold-Rolled Steel Sheet", description: "Steel flat-rolled, cold-reduced", originCountry: "US", tariffRate: "25%", status: "active", effectiveDate: new Date("2025-03-13"), reason: "Canadian retaliatory tariff on US steel. Remains in effect as negotiations continue.", legalAuthority: "SOR/2025-95" },
      { hsCode: "7601.10", item: "Aluminum Unwrought", description: "Aluminium, not alloyed", originCountry: "US", tariffRate: "25%", status: "active", effectiveDate: new Date("2025-03-13"), reason: "Canadian retaliatory tariff on US aluminum. Remission for manufacturing use extended to June 30, 2026." },
      { hsCode: "7601.20", item: "Aluminum Alloys", description: "Aluminium alloys", originCountry: "US", tariffRate: "25%", status: "active", effectiveDate: new Date("2025-03-13"), reason: "Canadian retaliatory tariff on US aluminum alloys." },
      { hsCode: "8703.23", item: "US-made Automobiles", description: "Motor cars, spark-ignition", originCountry: "US", tariffRate: "25%", status: "active", effectiveDate: new Date("2025-03-13"), reason: "Canadian retaliatory auto tariff under Motor Vehicles Order (SOR/2025-118). CUSMA-compliant vehicles may qualify for exemption.", legalAuthority: "SOR/2025-118" },
      { hsCode: "8708.99", item: "Auto Parts (non-CUSMA)", description: "Parts for motor vehicles", originCountry: "US", tariffRate: "25%", status: "active", effectiveDate: new Date("2025-03-13"), reason: "Non-CUSMA auto parts from US subject to 25% tariff. CUSMA-compliant parts are exempt." },
      { hsCode: "7308.30", item: "Steel Doors & Windows", description: "Steel doors, windows and frames", originCountry: "All Countries", tariffRate: "25%", status: "active", effectiveDate: new Date("2025-12-26"), reason: "New 25% Canadian tariff on steel derivative products from ALL countries, effective Dec 26, 2025." },
      { hsCode: "7317.00", item: "Steel Nails, Fasteners", description: "Nails, tacks, staples of iron or steel", originCountry: "All Countries", tariffRate: "25%", status: "active", effectiveDate: new Date("2025-12-26"), reason: "Global 25% tariff on steel derivatives effective Dec 26, 2025." },
      { hsCode: "8507.60", item: "Chinese EV Batteries", description: "Lithium-ion accumulators", originCountry: "CN", tariffRate: "100%", status: "active", effectiveDate: new Date("2024-10-01"), reason: "100% tariff on Chinese EVs and EV components. Strategic industry protection for domestic EV manufacturing." },
      { hsCode: "2009.12", item: "Orange Juice", description: "Orange juice, frozen", originCountry: "US", tariffRate: "0%", status: "removed", effectiveDate: new Date("2025-03-04"), endDate: new Date("2025-09-01"), reason: "Was 25% under Phase 1 retaliatory tariffs (Mar 4 – Sept 1, 2025). Removed when Canada dropped consumer goods tariffs." },
      { hsCode: "2208.30", item: "Bourbon / Whiskey", description: "Whisky", originCountry: "US", tariffRate: "0%", status: "removed", effectiveDate: new Date("2025-03-04"), endDate: new Date("2025-09-01"), reason: "Was 25% under Phase 1 retaliatory tariffs (Mar 4 – Sept 1, 2025). Removed effective Sept 1, 2025." },
      { hsCode: "2203.00", item: "Beer", description: "Beer made from malt", originCountry: "US", tariffRate: "0%", status: "removed", effectiveDate: new Date("2025-03-04"), endDate: new Date("2025-09-01"), reason: "Was 25% under Phase 1 retaliatory tariffs (Mar 4 – Sept 1, 2025). Removed effective Sept 1, 2025." },
      { hsCode: "0901.21", item: "Coffee, roasted", description: "Coffee, roasted, not decaffeinated", originCountry: "US", tariffRate: "0%", status: "removed", effectiveDate: new Date("2025-03-04"), endDate: new Date("2025-09-01"), reason: "Was 25% under Phase 1 retaliatory tariffs (Mar 4 – Sept 1, 2025). Removed effective Sept 1, 2025." },
      { hsCode: "2008.11", item: "Peanut Butter", description: "Groundnuts, peanut butter", originCountry: "US", tariffRate: "0%", status: "removed", effectiveDate: new Date("2025-03-04"), endDate: new Date("2025-09-01"), reason: "Was 25% under Phase 1 retaliatory tariffs (Mar 4 – Sept 1, 2025). Removed effective Sept 1, 2025." },
      { hsCode: "2204.21", item: "Wine", description: "Wine of fresh grapes", originCountry: "US", tariffRate: "0%", status: "removed", effectiveDate: new Date("2025-03-04"), endDate: new Date("2025-09-01"), reason: "Was 25% under Phase 1 retaliatory tariffs (Mar 4 – Sept 1, 2025). Removed effective Sept 1, 2025." },
      { hsCode: "2103.20", item: "Ketchup / Tomato Sauces", description: "Tomato ketchup and other tomato sauces", originCountry: "US", tariffRate: "0%", status: "removed", effectiveDate: new Date("2025-03-04"), endDate: new Date("2025-09-01"), reason: "Was 25% under Phase 1 retaliatory tariffs (Mar 4 – Sept 1, 2025). Removed effective Sept 1, 2025." },
    ],
    skipDuplicates: true,
  });
  console.log(`✅ Seeded ${tariffs.count} tariffs`);

  // ─── PRODUCTS + ALTERNATIVES ─────────────────────────────
  await prisma.alternative.deleteMany();
  await prisma.product.deleteMany();

  const productsData = [
    {
      upc: "048500017753", name: "Tropicana Pure Premium No Pulp Orange Juice", brand: "Tropicana", category: "Beverages — Juice", originCountry: "US", originDetail: "Tropicana Products Inc (PepsiCo), Bradenton, Florida, USA", hsCode: "2009.12", priceCad: 4.29,
      alternatives: [{ altName: "Oasis Classic Orange Juice", altOrigin: "Canada (Lassonde, Quebec)", altPriceCad: "$3.99", badge: "🍁 Canadian", isCanadian: true }, { altName: "PC Blue Menu OJ", altOrigin: "Canada (Loblaw)", altPriceCad: "$3.49", badge: "🍁 Canadian", isCanadian: true }],
    },
    {
      upc: "048500202081", name: "Tropicana 100% Orange Juice Boxes (44pk)", brand: "Tropicana", category: "Beverages — Juice", originCountry: "US", originDetail: "Tropicana Products Inc (PepsiCo), USA", hsCode: "2009.12", priceCad: 14.99,
      alternatives: [{ altName: "SunRype Juice Boxes", altOrigin: "Canada (BC)", altPriceCad: "$11.99", badge: "🍁 Canadian", isCanadian: true }, { altName: "PC Organics Juice Boxes", altOrigin: "Canada (Loblaw)", altPriceCad: "$12.49", badge: "🍁 Canadian", isCanadian: true }],
    },
    {
      upc: "048500206034", name: "Tropicana No Pulp OJ 59 fl oz Carton", brand: "Tropicana", category: "Beverages — Juice", originCountry: "US", originDetail: "Tropicana Products Inc (PepsiCo), USA", hsCode: "2009.12", priceCad: 6.49,
      alternatives: [{ altName: "Oasis Premium OJ 1.65L", altOrigin: "Canada (Quebec)", altPriceCad: "$5.99", badge: "🍁 Canadian", isCanadian: true }],
    },
    {
      upc: "082184090466", name: "Jack Daniel's Old No. 7 Tennessee Whiskey 750ml", brand: "Jack Daniel's", category: "Spirits — Bourbon / Whiskey", originCountry: "US", originDetail: "Jack Daniel Distillery (Brown-Forman), Lynchburg, Tennessee", hsCode: "2208.30", priceCad: 36.95,
      alternatives: [{ altName: "Crown Royal", altOrigin: "Canada (Gimli, Manitoba)", altPriceCad: "$36.99", badge: "🍁 Canadian", isCanadian: true }, { altName: "Forty Creek Barrel Select", altOrigin: "Canada (Grimsby, ON)", altPriceCad: "$29.99", badge: "🍁 Canadian", isCanadian: true }, { altName: "Lot No. 40 Canadian Whisky", altOrigin: "Canada (Windsor, ON)", altPriceCad: "$44.99", badge: "🍁 Premium", isCanadian: true }],
    },
    {
      upc: "082184090428", name: "Jack Daniel's Old No. 7 Tennessee Whiskey 1.75L", brand: "Jack Daniel's", category: "Spirits — Bourbon / Whiskey", originCountry: "US", originDetail: "Jack Daniel Distillery, Lynchburg, Tennessee", hsCode: "2208.30", priceCad: 69.95,
      alternatives: [{ altName: "Crown Royal 1.75L", altOrigin: "Canada (Manitoba)", altPriceCad: "$66.95", badge: "🍁 Canadian", isCanadian: true }, { altName: "Gibson's Finest 1.14L", altOrigin: "Canada", altPriceCad: "$39.95", badge: "🍁 Canadian", isCanadian: true }],
    },
    {
      upc: "082184038727", name: "Jack Daniel's Gentleman Jack 750ml", brand: "Jack Daniel's", category: "Spirits — Bourbon / Whiskey", originCountry: "US", originDetail: "Jack Daniel Distillery, Lynchburg, Tennessee", hsCode: "2208.30", priceCad: 45.95,
      alternatives: [{ altName: "Crown Royal Reserve", altOrigin: "Canada (Manitoba)", altPriceCad: "$49.95", badge: "🍁 Canadian", isCanadian: true }],
    },
    {
      upc: "085246139431", name: "Maker's Mark Kentucky Straight Bourbon 750ml", brand: "Maker's Mark", category: "Spirits — Bourbon", originCountry: "US", originDetail: "Maker's Mark Distillery (Beam Suntory), Loretto, Kentucky", hsCode: "2208.30", priceCad: 42.95,
      alternatives: [{ altName: "Forty Creek Confederation Oak", altOrigin: "Canada (Grimsby, ON)", altPriceCad: "$39.95", badge: "🍁 Canadian", isCanadian: true }, { altName: "JP Wiser's 18 Year", altOrigin: "Canada (Windsor, ON)", altPriceCad: "$54.95", badge: "🍁 Premium", isCanadian: true }],
    },
    {
      upc: "080686001409", name: "Jim Beam Kentucky Straight Bourbon 750ml", brand: "Jim Beam", category: "Spirits — Bourbon", originCountry: "US", originDetail: "Jim Beam (Beam Suntory), Clermont, Kentucky", hsCode: "2208.30", priceCad: 29.95,
      alternatives: [{ altName: "Canadian Club 1858", altOrigin: "Canada (Windsor, ON)", altPriceCad: "$27.95", badge: "🍁 Canadian", isCanadian: true }, { altName: "Alberta Premium", altOrigin: "Canada (Calgary, AB)", altPriceCad: "$24.99", badge: "🍁 Canadian", isCanadian: true }],
    },
    {
      upc: "018200111686", name: "Budweiser Lager Beer 24pk / 12 fl oz Cans", brand: "Budweiser", category: "Beverages — Beer", originCountry: "US", originDetail: "Anheuser-Busch InBev, St. Louis, Missouri (US-brewed)", hsCode: "2203.00", priceCad: 39.95,
      alternatives: [{ altName: "Molson Canadian", altOrigin: "Canada (Toronto, ON)", altPriceCad: "$39.95", badge: "🍁 Canadian", isCanadian: true }, { altName: "Keith's IPA", altOrigin: "Canada (Halifax, NS)", altPriceCad: "$41.95", badge: "🍁 Canadian", isCanadian: true }, { altName: "Labatt Blue", altOrigin: "Canada (London, ON)", altPriceCad: "$38.95", badge: "🍁 Canadian", isCanadian: true }],
    },
    {
      upc: "018200007712", name: "Budweiser Beer Bottles 12pk / 12 fl oz", brand: "Budweiser", category: "Beverages — Beer", originCountry: "US", originDetail: "Anheuser-Busch InBev (US-brewed batches)", hsCode: "2203.00", priceCad: 22.95,
      alternatives: [{ altName: "Molson Canadian 12pk", altOrigin: "Canada", altPriceCad: "$22.95", badge: "🍁 Canadian", isCanadian: true }, { altName: "Sleeman Original 12pk", altOrigin: "Canada (Guelph, ON)", altPriceCad: "$23.95", badge: "🍁 Canadian", isCanadian: true }],
    },
    {
      upc: "048001006874", name: "Skippy Creamy Peanut Butter 15 oz", brand: "Skippy", category: "Spreads — Peanut Butter", originCountry: "US", originDetail: "Hormel Foods Corporation, USA", hsCode: "2008.11", priceCad: 5.49,
      alternatives: [{ altName: "Kraft Peanut Butter", altOrigin: "Canada (made in ON)", altPriceCad: "$5.29", badge: "🍁 Canadian", isCanadian: true }, { altName: "No Name PB (Loblaw)", altOrigin: "Canada", altPriceCad: "$3.99", badge: "🍁 Canadian", isCanadian: true }],
    },
    {
      upc: "025500003672", name: "Folgers Classic Roast Ground Coffee 33.9 oz", brand: "Folgers", category: "Beverages — Coffee", originCountry: "US", originDetail: "The J.M. Smucker Company, New Orleans, Louisiana", hsCode: "0901.21", priceCad: 13.99,
      alternatives: [{ altName: "Tim Hortons Ground Coffee", altOrigin: "Canada", altPriceCad: "$12.99", badge: "🍁 Canadian", isCanadian: true }, { altName: "Kicking Horse Coffee", altOrigin: "Canada (Invermere, BC)", altPriceCad: "$14.99", badge: "🍁 Canadian", isCanadian: true }],
    },
    {
      upc: "013000006408", name: "Heinz Tomato Ketchup 20 oz", brand: "Heinz", category: "Condiments", originCountry: "US", originDetail: "Kraft Heinz Company — US plants and Leamington, ON plant", hsCode: "2103.20", priceCad: 4.99,
      alternatives: [{ altName: "French's Ketchup", altOrigin: "Canada (Leamington, ON)", altPriceCad: "$4.49", badge: "🍁 Canadian", isCanadian: true }, { altName: "PC Organics Ketchup", altOrigin: "Canada (Loblaw)", altPriceCad: "$4.99", badge: "🍁 Canadian", isCanadian: true }],
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
      companies: [{ name: "Stelco Holdings", effect: "Higher domestic demand, but US export revenue down", direction: "mixed" }, { name: "Algoma Steel", effect: "Benefiting from reduced import competition", direction: "up" }, { name: "Russel Metals", effect: "Distribution costs increased; derivative tariffs add pressure", direction: "down" }],
    },
    {
      name: "Automotive", icon: "🚗", impactLevel: "Critical",
      description: "US 25% Section 232 auto tariff and Canadian retaliatory auto tariff both active. Cross-border supply chains severely disrupted. CUSMA-compliant vehicles exempt.",
      companies: [{ name: "Magna International", effect: "Supply chain restructuring; $3-4B tariff cost estimated industry-wide", direction: "down" }, { name: "Linamar Corp", effect: "Shifting to domestic sourcing where possible", direction: "mixed" }, { name: "Stellantis (Windsor)", effect: "CUSMA compliance critical to avoid tariffs on exports", direction: "mixed" }],
    },
    {
      name: "Aluminum", icon: "🔩", impactLevel: "High",
      description: "25% Canadian counter-tariff on US aluminum. US charges 50% on Canadian aluminum. Remission for manufacturing extended to June 2026.",
      companies: [{ name: "Rio Tinto Alcan", effect: "Largest Canadian producer; exploring non-US markets", direction: "mixed" }, { name: "Alcoa (Baie-Comeau)", effect: "Canadian smelter operations relatively insulated", direction: "up" }, { name: "Novelis (recycling)", effect: "Recycled aluminum gaining market advantage", direction: "up" }],
    },
    {
      name: "Lumber & Forestry", icon: "🪵", impactLevel: "High",
      description: "US imposed 10% tariff on softwood lumber (Oct 2025), 25-50% on furniture/cabinets (Jan 2026). No CUSMA exemption.",
      companies: [{ name: "Canfor Corporation", effect: "Lumber exports to US down; exploring Asian markets", direction: "down" }, { name: "West Fraser Timber", effect: "Diversifying away from US market dependency", direction: "mixed" }, { name: "Resolute Forest Products", effect: "Pulp & paper less affected than lumber", direction: "mixed" }],
    },
    {
      name: "Consumer Goods & Food", icon: "🛒", impactLevel: "Resolved",
      description: "Phase 1 retaliatory tariffs on US consumer goods were REMOVED Sept 1, 2025. Prices stabilizing.",
      companies: [{ name: "Loblaw Companies", effect: "Import costs normalized after tariff removal", direction: "up" }, { name: "Saputo Inc.", effect: "Canadian dairy stable; US dairy tariffs removed", direction: "up" }, { name: "LCBO (Ontario)", effect: "US bourbon/wine back on shelves at pre-tariff prices", direction: "up" }],
    },
    {
      name: "Energy", icon: "⚡", impactLevel: "Low–Medium",
      description: "Canadian energy was initially tariffed at 10% under IEEPA (Mar 2025) but CUSMA exemption applied to most. IEEPA struck down Feb 2026.",
      companies: [{ name: "Suncor Energy", effect: "CUSMA exemption protected most crude exports", direction: "up" }, { name: "Canadian Natural Resources", effect: "Limited tariff exposure due to CUSMA compliance", direction: "up" }, { name: "TC Energy", effect: "Pipeline infrastructure unaffected by goods tariffs", direction: "up" }],
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
      { eventDate: new Date("2025-03-04"), description: "Canada imposes Phase 1 retaliatory tariffs (25%) on $30B of US consumer goods", category: "Canada" },
      { eventDate: new Date("2025-03-13"), description: "Canada retaliatory tariffs on US steel, aluminum & misc goods", category: "Canada" },
      { eventDate: new Date("2025-09-01"), description: "Canada removes Phase 1 consumer goods tariffs (bourbon, OJ, beer, etc.)", category: "Canada" },
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
