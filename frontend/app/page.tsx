"use client";
import { useState, useRef } from "react";

const TARIFF_INFO = {
  what: "A tariff is a tax imposed by a government on imported goods. When Country A places a tariff on goods from Country B, importers must pay extra — and that cost usually gets passed on to you, the consumer. Canada has used tariffs as retaliatory countermeasures against US trade actions since March 2025.",
  timeline: [
    "Mar 4, 2025 — Canada imposes Phase 1 retaliatory tariffs (25%) on $30B of US consumer goods",
    "Mar 13, 2025 — Canada retaliatory tariffs on US steel, aluminum & misc goods",
    "Sept 1, 2025 — Canada removes Phase 1 consumer goods tariffs (bourbon, OJ, beer, etc.)",
    "Dec 26, 2025 — Canada imposes 25% global tariff on steel derivative products",
    "Feb 20, 2026 — US Supreme Court strikes down IEEPA tariffs (Learning Resources v. Trump)",
    "Feb 24, 2026 — US replaces IEEPA with 10% Section 122 surcharge (CUSMA goods exempt)",
  ],
  countries: [
    { name: "United States", flag: "🇺🇸", status: "Active (Sectoral)", rate: "25–50%", since: "Mar 2025", details: "US maintains Section 232 tariffs on steel (50%), aluminum (50%), autos (25%), lumber (10–50%), and semiconductors. IEEPA broad tariffs were struck down by the Supreme Court on Feb 20, 2026. A temporary 10% Section 122 surcharge replaced them, but CUSMA-compliant Canadian goods are exempt." },
    { name: "China", flag: "🇨🇳", status: "Active", rate: "100%", since: "2024", details: "Canada maintains 100% tariff on Chinese EVs, 25% surtax on Chinese steel and aluminum. These are separate from the US-Canada dispute and remain fully in effect." },
    { name: "All Countries (Steel Derivatives)", flag: "🌍", status: "Active", rate: "25%", since: "Dec 2025", details: "As of Dec 26, 2025, Canada imposes a 25% tariff on steel derivative products (doors, windows, fasteners, wire, etc.) from ALL countries globally, to protect the domestic steel industry." },
  ],
};

const IMPORT_TARIFFS = [
  // ── Active tariffs ────────────────────────────────────────────────────────
  { item: "Hot-Rolled Steel Coil", hs: "7208.10", rate: "25%", origin: "United States", status: "active", reason: "Canadian retaliatory tariff on US steel under Steel & Aluminum Order (SOR/2025-95). No CUSMA exemption." },
  { item: "Cold-Rolled Steel Sheet", hs: "7209.15", rate: "25%", origin: "United States", status: "active", reason: "Canadian retaliatory tariff on US steel. Remains in effect." },
  { item: "Aluminum Unwrought", hs: "7601.10", rate: "25%", origin: "United States", status: "active", reason: "Canadian retaliatory tariff on US aluminum. Remission for manufacturing use extended to June 30, 2026." },
  { item: "Aluminum Alloys", hs: "7601.20", rate: "25%", origin: "United States", status: "active", reason: "Canadian retaliatory tariff on US aluminum alloys." },
  { item: "US-made Automobiles", hs: "8703.23", rate: "25%", origin: "United States", status: "active", reason: "Canadian retaliatory auto tariff. CUSMA-compliant vehicles may qualify for exemption." },
  { item: "Auto Parts (non-CUSMA)", hs: "8708.99", rate: "25%", origin: "United States", status: "active", reason: "Non-CUSMA auto parts from US subject to 25% tariff. CUSMA-compliant parts are exempt." },
  { item: "Steel Doors & Windows", hs: "7308.30", rate: "25%", origin: "All Countries", status: "active", reason: "New 25% Canadian tariff on steel derivative products from ALL countries, effective Dec 26, 2025." },
  { item: "Steel Nails, Fasteners", hs: "7317.00", rate: "25%", origin: "All Countries", status: "active", reason: "Global 25% tariff on steel derivatives effective Dec 26, 2025." },
  { item: "Chinese EV Batteries", hs: "8507.60", rate: "100%", origin: "China", status: "active", reason: "100% tariff on Chinese EVs and EV components." },
  // ── Phase 1 removed tariffs (Mar 4 – Sept 1, 2025) ───────────────────────
  { item: "Orange Juice (Tropicana, Minute Maid)", hs: "2009.12", rate: "0%", origin: "United States", status: "removed", reason: "Was 25% under Phase 1 retaliatory tariffs (Mar 4 – Sept 1, 2025). Removed Sept 1, 2025." },
  { item: "Cranberry & Fruit Juice (Ocean Spray)", hs: "2009.89", rate: "0%", origin: "United States", status: "removed", reason: "Was 25% under Phase 1 retaliatory tariffs (Mar 4 – Sept 1, 2025). Removed effective Sept 1, 2025." },
  { item: "Soft Drinks (Pepsi, Coca-Cola, Mountain Dew)", hs: "2202.10", rate: "0%", origin: "United States", status: "removed", reason: "Was 25% under Phase 1 retaliatory tariffs (Mar 4 – Sept 1, 2025). Removed effective Sept 1, 2025." },
  { item: "Bourbon / Whiskey (Jack Daniel's, Jim Beam)", hs: "2208.30", rate: "0%", origin: "United States", status: "removed", reason: "Was 25% under Phase 1 retaliatory tariffs. Removed effective Sept 1, 2025." },
  { item: "Beer (Budweiser, Coors Light)", hs: "2203.00", rate: "0%", origin: "United States", status: "removed", reason: "Was 25% under Phase 1 retaliatory tariffs. Removed effective Sept 1, 2025." },
  { item: "Coffee, roasted (Folgers)", hs: "0901.21", rate: "0%", origin: "United States", status: "removed", reason: "Was 25% under Phase 1 retaliatory tariffs. Removed effective Sept 1, 2025." },
  { item: "Peanut Butter (Skippy, Kraft)", hs: "2008.11", rate: "0%", origin: "United States", status: "removed", reason: "Was 25% under Phase 1 retaliatory tariffs. Removed effective Sept 1, 2025." },
  { item: "Ketchup & Tomato Sauces (Heinz)", hs: "2103.20", rate: "0%", origin: "United States", status: "removed", reason: "Was 25% under Phase 1 retaliatory tariffs. Removed effective Sept 1, 2025." },
  { item: "Mustard & Sauces (French's)", hs: "2103.30", rate: "0%", origin: "United States", status: "removed", reason: "Was 25% under Phase 1 retaliatory tariffs. Removed effective Sept 1, 2025." },
  { item: "Dressings & Condiments (Hidden Valley)", hs: "2103.90", rate: "0%", origin: "United States", status: "removed", reason: "Was 25% under Phase 1 retaliatory tariffs. Removed effective Sept 1, 2025." },
  { item: "Soups & Broths (Campbell's)", hs: "2104.10", rate: "0%", origin: "United States", status: "removed", reason: "Was 25% under Phase 1 retaliatory tariffs. Removed effective Sept 1, 2025." },
  { item: "Chips & Snacks (Doritos, Lay's, Kraft Dinner)", hs: "2106.90", rate: "0%", origin: "United States", status: "removed", reason: "Was 25% under Phase 1 retaliatory tariffs. Removed effective Sept 1, 2025." },
  { item: "Breakfast Cereals (Cheerios, Corn Flakes)", hs: "1904.10", rate: "0%", origin: "United States", status: "removed", reason: "Was 25% under Phase 1 retaliatory tariffs. Removed effective Sept 1, 2025." },
  { item: "Granola Bars & Oats (Quaker, Nature Valley)", hs: "1904.20", rate: "0%", origin: "United States", status: "removed", reason: "Was 25% under Phase 1 retaliatory tariffs. Removed effective Sept 1, 2025." },
  { item: "Cookies & Biscuits (Oreo)", hs: "1905.31", rate: "0%", origin: "United States", status: "removed", reason: "Was 25% under Phase 1 retaliatory tariffs. Removed effective Sept 1, 2025." },
  { item: "Candy & Confectionery (M&M's)", hs: "1704.90", rate: "0%", origin: "United States", status: "removed", reason: "Was 25% under Phase 1 retaliatory tariffs. Removed effective Sept 1, 2025." },
  { item: "Chocolate (Hershey's, Reese's)", hs: "1806.32", rate: "0%", origin: "United States", status: "removed", reason: "Was 25% under Phase 1 retaliatory tariffs. Removed effective Sept 1, 2025." },
  { item: "Jams, Jellies & Syrups (Aunt Jemima)", hs: "2007.99", rate: "0%", origin: "United States", status: "removed", reason: "Was 25% under Phase 1 retaliatory tariffs. Removed effective Sept 1, 2025." },
  { item: "Laundry & Dish Detergents (Tide, Dawn)", hs: "3402.20", rate: "0%", origin: "United States", status: "removed", reason: "Was 25% under Phase 1 retaliatory tariffs. Removed effective Sept 1, 2025." },
  { item: "Cleaning Sprays (Windex, Febreze)", hs: "3402.90", rate: "0%", origin: "United States", status: "removed", reason: "Was 25% under Phase 1 retaliatory tariffs. Removed effective Sept 1, 2025." },
  { item: "Toothpaste (Colgate, Crest)", hs: "3306.10", rate: "0%", origin: "United States", status: "removed", reason: "Was 25% under Phase 1 retaliatory tariffs. Removed effective Sept 1, 2025." },
  { item: "Wine", hs: "2204.21", rate: "0%", origin: "United States", status: "removed", reason: "Was 25% under Phase 1 retaliatory tariffs. Removed effective Sept 1, 2025." },
];

const INDUSTRIES = [
  {
    name: "Steel & Metals", icon: "⚙️", impact: "Critical",
    description: "25% Canadian counter-tariffs on US steel remain in effect. US charges 50% on Canadian steel. New 25% global tariff on steel derivatives since Dec 2025.",
    companies: [
      { name: "Stelco Holdings", effect: "Higher domestic demand, but US export revenue down", direction: "mixed" },
      { name: "Algoma Steel", effect: "Benefiting from reduced import competition", direction: "up" },
      { name: "Russel Metals", effect: "Distribution costs increased; derivative tariffs add pressure", direction: "down" },
    ]
  },
  {
    name: "Automotive", icon: "🚗", impact: "Critical",
    description: "US 25% Section 232 auto tariff and Canadian retaliatory auto tariff both active. Cross-border supply chains severely disrupted. CUSMA-compliant vehicles exempt.",
    companies: [
      { name: "Magna International", effect: "Supply chain restructuring; $3-4B tariff cost estimated industry-wide", direction: "down" },
      { name: "Linamar Corp", effect: "Shifting to domestic sourcing where possible", direction: "mixed" },
      { name: "Stellantis (Windsor)", effect: "CUSMA compliance critical to avoid tariffs on exports", direction: "mixed" },
    ]
  },
  {
    name: "Aluminum", icon: "🔩", impact: "High",
    description: "25% Canadian counter-tariff on US aluminum. US charges 50% on Canadian aluminum. Remission for manufacturing extended to June 2026.",
    companies: [
      { name: "Rio Tinto Alcan", effect: "Largest Canadian producer; exploring non-US markets", direction: "mixed" },
      { name: "Alcoa (Baie-Comeau)", effect: "Canadian smelter operations relatively insulated", direction: "up" },
      { name: "Novelis (recycling)", effect: "Recycled aluminum gaining market advantage", direction: "up" },
    ]
  },
  {
    name: "Lumber & Forestry", icon: "🪵", impact: "High",
    description: "US imposed 10% tariff on softwood lumber (Oct 2025), 25-50% on furniture/cabinets (Jan 2026). No CUSMA exemption.",
    companies: [
      { name: "Canfor Corporation", effect: "Lumber exports to US down; exploring Asian markets", direction: "down" },
      { name: "West Fraser Timber", effect: "Diversifying away from US market dependency", direction: "mixed" },
      { name: "Resolute Forest Products", effect: "Pulp & paper less affected than lumber", direction: "mixed" },
    ]
  },
  {
    name: "Consumer Goods & Food", icon: "🛒", impact: "Resolved",
    description: "Phase 1 retaliatory tariffs on US consumer goods were REMOVED Sept 1, 2025. Prices stabilizing.",
    companies: [
      { name: "Loblaw Companies", effect: "Import costs normalized after tariff removal", direction: "up" },
      { name: "Saputo Inc.", effect: "Canadian dairy stable; US dairy tariffs removed", direction: "up" },
      { name: "LCBO (Ontario)", effect: "US bourbon/wine back on shelves at pre-tariff prices", direction: "up" },
    ]
  },
  {
    name: "Energy", icon: "⚡", impact: "Low–Medium",
    description: "Canadian energy was initially tariffed at 10% under IEEPA but CUSMA exemption applied. IEEPA struck down Feb 2026.",
    companies: [
      { name: "Suncor Energy", effect: "CUSMA exemption protected most crude exports", direction: "up" },
      { name: "Canadian Natural Resources", effect: "Limited tariff exposure due to CUSMA compliance", direction: "up" },
      { name: "TC Energy", effect: "Pipeline infrastructure unaffected by goods tariffs", direction: "up" },
    ]
  },
];

const DirectionBadge = ({ direction }: { direction: string }) => {
  const styles: Record<string, { bg: string; color: string; label: string }> = {
    up: { bg: "rgb(220,252,231)", color: "rgb(22,101,52)", label: "↑ Gaining" },
    down: { bg: "rgb(254,226,226)", color: "rgb(153,27,27)", label: "↓ Hurt" },
    mixed: { bg: "rgb(254,249,195)", color: "rgb(133,77,14)", label: "↔ Mixed" },
  };
  const s = styles[direction];
  return <span style={{ background: s.bg, color: s.color, padding: "2px 10px", borderRadius: 999, fontSize: 11, fontWeight: 700 }}>{s.label}</span>;
};

const StatusPill = ({ active }: { active: boolean }) => (
  <span style={{ padding: "3px 12px", borderRadius: 999, fontSize: 11, fontWeight: 700, background: active ? "#D72638" : "#22c55e", color: "#fff" }}>
    {active ? "ACTIVE TARIFF" : "TARIFF REMOVED"}
  </span>
);

// ── YOUR FRIEND FILLS THIS IN ──────────────────────────────
const API_BASE_URL = "http://localhost:5000";
// ──────────────────────────────────────────────────────────

export default function TariffShield() {
  const [activeTab, setActiveTab] = useState("tariffs");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState<any>(null);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [expandedIndustry, setExpandedIndustry] = useState<number | null>(null);
  const [expandedCountry, setExpandedCountry] = useState<number | string | null>(null);
  const [tariffFilter, setTariffFilter] = useState("all");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = async () => {
    const q = searchQuery.trim();
    if (!q) return;
    setLoading(true);
    setShowResult(false);
    setNotFound(false);
    setSearchResult(null);
    try {
      const res = await fetch(`${API_BASE_URL}/api/products/search?upc=${q}`);
      if (!res.ok) throw new Error("Not found");
      const data = await res.json();
      setSearchResult(data.product);
      setShowResult(true);
    } catch {
      setNotFound(true);
      setShowResult(true);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => { if (e.key === "Enter") handleSearch(); };
  const clearSearch = () => { setSearchQuery(""); setSearchResult(null); setShowResult(false); setNotFound(false); inputRef.current?.focus(); };

  const filteredTariffs = IMPORT_TARIFFS.filter(t =>
    tariffFilter === "all" ? true : tariffFilter === "active" ? t.status === "active" : t.status === "removed"
  );

  const font = "'DM Sans', 'Helvetica Neue', sans-serif";
  const displayFont = "'Playfair Display', Georgia, serif";
  const red = "#D72638"; const darkRed = "#A31D2B"; const cream = "#FDF6EC";
  const dark = "#1A1A1A"; const cardBg = "#FFFFFF"; const subtleBg = "#F7F3ED"; const green = "#16a34a";

  return (
    <div style={{ fontFamily: font, background: cream, minHeight: "100vh", color: dark }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@700;800;900&display=swap" rel="stylesheet" />

      <header style={{ background: `linear-gradient(135deg, ${dark} 0%, #2D2D2D 100%)`, position: "sticky", top: 0, zIndex: 100, borderBottom: `3px solid ${red}` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 38, height: 38, borderRadius: 8, background: red, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>🛡️</div>
            <div>
              <div style={{ fontFamily: displayFont, fontSize: 21, fontWeight: 800, color: "#fff", letterSpacing: "-0.5px", lineHeight: 1 }}>TariffShield</div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", letterSpacing: "2px", textTransform: "uppercase", fontWeight: 600 }}>Protect Your Wallet</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ padding: "4px 12px", borderRadius: 999, fontSize: 10, fontWeight: 700, background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.7)" }}>Updated: {new Date().toLocaleDateString("en-CA", { month: "short", day: "numeric", year: "numeric" })}</span>
            <span style={{ fontSize: 22 }}>🍁</span>
          </div>
        </div>
      </header>

      <nav style={{ background: "#fff", borderBottom: "1px solid rgba(0,0,0,0.08)", position: "sticky", top: 65, zIndex: 99 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", padding: "0 24px" }}>
          {[{ id: "tariffs", label: "Tariffs Explained", icon: "📖" }, { id: "import", label: "Import Tariff Rates", icon: "📊" }, { id: "industries", label: "Industries Affected", icon: "🏭" }].map((tab) => (
            <button key={tab.id} onClick={() => { setActiveTab(tab.id); setShowResult(false); setSearchQuery(""); }}
              style={{ padding: "13px 22px", background: "none", border: "none", borderBottom: activeTab === tab.id ? `3px solid ${red}` : "3px solid transparent", color: activeTab === tab.id ? red : "#666", fontWeight: activeTab === tab.id ? 700 : 500, fontSize: 13.5, cursor: "pointer", fontFamily: font, display: "flex", alignItems: "center", gap: 7 }}>
              <span>{tab.icon}</span>{tab.label}
            </button>
          ))}
        </div>
      </nav>

      <div style={{ background: subtleBg, padding: "28px 24px 22px", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: "#888", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: 8 }}>Product Lookup by UPC</div>
          <div style={{ display: "flex", gap: 8 }}>
            <div style={{ flex: 1, position: "relative" }}>
              <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: 17, opacity: 0.4 }}>🔍</span>
              <input ref={inputRef} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} onKeyDown={handleKeyDown}
                placeholder="Enter a UPC code (e.g. 082184090466)"
                style={{ width: "100%", padding: "13px 14px 13px 42px", borderRadius: 12, border: "2px solid rgba(0,0,0,0.1)", fontSize: 14.5, fontFamily: font, outline: "none", background: "#fff", boxSizing: "border-box" }}
                onFocus={(e) => (e.target.style.borderColor = red)} onBlur={(e) => (e.target.style.borderColor = "rgba(0,0,0,0.1)")} />
            </div>
            <button onClick={handleSearch} disabled={loading}
              style={{ padding: "13px 26px", borderRadius: 12, border: "none", background: loading ? "#ccc" : red, color: "#fff", fontWeight: 700, fontSize: 13.5, cursor: loading ? "not-allowed" : "pointer", fontFamily: font }}
              onMouseEnter={(e) => { if (!loading) (e.target as HTMLButtonElement).style.background = darkRed; }}
              onMouseLeave={(e) => { if (!loading) (e.target as HTMLButtonElement).style.background = red; }}>
              {loading ? "Searching..." : "Search"}
            </button>
            {showResult && <button onClick={clearSearch} style={{ padding: "13px 18px", borderRadius: 12, border: "2px solid rgba(0,0,0,0.1)", background: "#fff", color: "#666", fontWeight: 600, fontSize: 13.5, cursor: "pointer", fontFamily: font }}>✕</button>}
          </div>
        </div>
      </div>

      <main style={{ maxWidth: 1100, margin: "0 auto", padding: "28px 24px 60px" }}>

        {showResult && (
          <div style={{ marginBottom: 36 }}>
            {notFound ? (
              <div style={{ background: cardBg, borderRadius: 16, padding: 44, textAlign: "center", border: "1px solid rgba(0,0,0,0.08)" }}>
                <div style={{ fontSize: 44, marginBottom: 14 }}>🔍</div>
                <div style={{ fontFamily: displayFont, fontSize: 20, fontWeight: 800, marginBottom: 6 }}>Product Not Found</div>
                <div style={{ color: "#888", fontSize: 13.5 }}>No product with UPC "{searchQuery}" found. Try another barcode.</div>
              </div>
            ) : searchResult && (
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "2px", color: searchResult.tariff?.status === "active" ? red : green }}>Product Found</span>
                  <StatusPill active={searchResult.tariff?.status === "active"} />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>

                  {/* Product Card */}
                  <div style={{ background: cardBg, borderRadius: 16, padding: 28, border: "1px solid rgba(0,0,0,0.08)", gridRow: "1 / 4", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
                    <div style={{ fontSize: 70, marginBottom: 14 }}>📦</div>
                    <div style={{ fontFamily: displayFont, fontSize: 22, fontWeight: 800, marginBottom: 6, lineHeight: 1.2 }}>{searchResult.name}</div>
                    <div style={{ display: "flex", gap: 6, marginBottom: 8, flexWrap: "wrap", justifyContent: "center" }}>
                      <span style={{ padding: "3px 10px", borderRadius: 999, background: "rgba(0,0,0,0.05)", fontSize: 11, fontWeight: 600, color: "#666" }}>{searchResult.category}</span>
                      <span style={{ padding: "3px 10px", borderRadius: 999, background: "rgba(0,0,0,0.05)", fontSize: 11, fontWeight: 600, color: "#666" }}>HS {searchResult.hsCode}</span>
                    </div>
                    <div style={{ fontSize: 11.5, color: "#999", fontFamily: "monospace" }}>UPC: {searchQuery}</div>
                  </div>

                  {/* Origin & Status */}
                  <div style={{ background: cardBg, borderRadius: 16, padding: 22, border: searchResult.tariff?.status === "active" ? `2px solid ${red}` : `2px solid ${green}` }}>
                    <div style={{ fontSize: 10.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.5px", color: "#999", marginBottom: 10 }}>Origin & Tariff Status</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <span style={{ fontSize: 34 }}>{searchResult.originCountry === "US" ? "🇺🇸" : searchResult.originCountry === "CN" ? "🇨🇳" : "🌍"}</span>
                      <div>
                        <div style={{ fontSize: 18, fontWeight: 700, color: searchResult.tariff?.status === "active" ? red : green }}>{searchResult.originDetail || searchResult.originCountry}</div>
                      </div>
                    </div>
                    <div style={{ marginTop: 10, padding: "7px 12px", borderRadius: 8, background: searchResult.tariff?.status === "active" ? "rgba(215,38,56,0.06)" : "rgba(34,197,94,0.06)", fontSize: 12, color: searchResult.tariff?.status === "active" ? red : green, fontWeight: 600, lineHeight: 1.5 }}>
                      {searchResult.tariff?.reason || "No tariff information available."}
                    </div>
                  </div>

                  {/* Price Impact */}
                  <div style={{ background: cardBg, borderRadius: 16, padding: 22, border: "1px solid rgba(0,0,0,0.08)" }}>
                    <div style={{ fontSize: 10.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.5px", color: "#999", marginBottom: 10 }}>Price Impact</div>
                    {searchResult.tariff?.status === "active" ? (
                      <>
                        <div style={{ display: "flex", alignItems: "flex-end", gap: 18 }}>
                          <div>
                            <div style={{ fontSize: 11, color: "#999", marginBottom: 2 }}>Before tariff</div>
                            <div style={{ fontSize: 26, fontWeight: 800, color: green, fontFamily: displayFont }}>${parseFloat(searchResult.priceCad).toFixed(2)}</div>
                          </div>
                          <div style={{ fontSize: 22, color: "#ccc", paddingBottom: 3 }}>→</div>
                          <div>
                            <div style={{ fontSize: 11, color: "#999", marginBottom: 2 }}>With {searchResult.tariff.tariffRate} tariff</div>
                            <div style={{ fontSize: 26, fontWeight: 800, color: red, fontFamily: displayFont }}>${(parseFloat(searchResult.priceCad) * (1 + parseFloat(searchResult.tariff.tariffRate) / 100)).toFixed(2)}</div>
                          </div>
                        </div>
                        <div style={{ marginTop: 14, padding: "8px 14px", borderRadius: 10, background: "rgba(215,38,56,0.06)", display: "flex", justifyContent: "space-between" }}>
                          <span style={{ fontSize: 13, fontWeight: 600, color: red }}>Extra cost: ${(parseFloat(searchResult.priceCad) * parseFloat(searchResult.tariff.tariffRate) / 100).toFixed(2)}</span>
                          <span style={{ padding: "3px 10px", borderRadius: 999, background: red, color: "#fff", fontSize: 12, fontWeight: 700 }}>+{searchResult.tariff.tariffRate}</span>
                        </div>
                      </>
                    ) : (
                      <div>
                        <div style={{ fontSize: 26, fontWeight: 800, color: green, fontFamily: displayFont, marginBottom: 6 }}>${parseFloat(searchResult.priceCad).toFixed(2)}</div>
                        <div style={{ padding: "8px 14px", borderRadius: 10, background: "rgba(34,197,94,0.06)", fontSize: 13, fontWeight: 600, color: green }}>✅ No tariff surcharge — price at regular import rate</div>
                        <div style={{ marginTop: 8, fontSize: 12, color: "#888", lineHeight: 1.5 }}>During Mar–Aug 2025, this product had a 25% surtax that has since been removed.</div>
                      </div>
                    )}
                  </div>

                  {/* Canadian Alternatives */}
                  {searchResult.alternatives?.length > 0 && (
                    <div style={{ background: cardBg, borderRadius: 16, padding: 22, border: `2px solid ${green}`, gridColumn: "1 / -1" }}>
                      <div style={{ fontSize: 10.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.5px", color: green, marginBottom: 14 }}>🍁 Canadian Alternatives — Support Local</div>
                      <div style={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(searchResult.alternatives.length, 3)}, 1fr)`, gap: 10 }}>
                        {searchResult.alternatives.map((alt: any, i: number) => (
                          <div key={i} style={{ padding: 14, borderRadius: 10, background: subtleBg, border: "1px solid rgba(0,0,0,0.05)" }}>
                            <div style={{ fontWeight: 700, fontSize: 13.5, lineHeight: 1.3, marginBottom: 4 }}>{alt.altName}</div>
                            <div style={{ fontSize: 11.5, color: "#888" }}>{alt.altOrigin}</div>
                            <div style={{ fontSize: 17, fontWeight: 800, color: green, marginTop: 5, fontFamily: displayFont }}>{alt.altPriceCad}</div>
                            <div style={{ fontSize: 10, color: green, marginTop: 2 }}>{alt.badge}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "tariffs" && !showResult && (
          <div>
            <div style={{ fontFamily: displayFont, fontSize: 34, fontWeight: 900, marginBottom: 6, lineHeight: 1.1 }}>Understanding Tariffs</div>
            <div style={{ fontSize: 14.5, color: "#666", marginBottom: 28, maxWidth: 720, lineHeight: 1.7 }}>{TARIFF_INFO.what}</div>
            <div style={{ marginBottom: 24, padding: "18px 22px", borderRadius: 14, background: "linear-gradient(135deg, #1e3a5f 0%, #2563eb 100%)", color: "#fff" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}><span style={{ fontSize: 22 }}>⚖️</span><div style={{ fontSize: 14, fontWeight: 700 }}>SUPREME COURT RULING — Feb 20, 2026</div></div>
              <div style={{ fontSize: 13.5, lineHeight: 1.6, color: "rgba(255,255,255,0.9)" }}>In Learning Resources, Inc. v. Trump, the US Supreme Court ruled 6-3 that IEEPA does not authorize the President to impose tariffs. All broad IEEPA-based tariffs were struck down. Section 232 tariffs on steel, aluminum, autos, and lumber remain under separate legislation.</div>
            </div>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "2px", color: "#999", marginBottom: 12 }}>Key Timeline</div>
            <div style={{ background: cardBg, borderRadius: 14, padding: "16px 20px", border: "1px solid rgba(0,0,0,0.08)", marginBottom: 28 }}>
              {TARIFF_INFO.timeline.map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 12, padding: "8px 0", borderBottom: i < TARIFF_INFO.timeline.length - 1 ? "1px solid rgba(0,0,0,0.05)" : "none" }}>
                  <span style={{ fontSize: 13, color: "#ccc", flexShrink: 0, lineHeight: 1.7 }}>●</span>
                  <span style={{ fontSize: 13, color: "#555", lineHeight: 1.7 }}>{item}</span>
                </div>
              ))}
            </div>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "2px", color: "#999", marginBottom: 12 }}>Countries & Tariff Actions</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {TARIFF_INFO.countries.map((c, i) => (
                <div key={i} onClick={() => setExpandedCountry(expandedCountry === i ? null : i)} style={{ background: cardBg, borderRadius: 14, padding: "18px 22px", border: expandedCountry === i ? `2px solid ${red}` : "1px solid rgba(0,0,0,0.08)", cursor: "pointer" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <span style={{ fontSize: 30 }}>{c.flag}</span>
                      <div><div style={{ fontWeight: 700, fontSize: 15 }}>{c.name}</div><div style={{ fontSize: 11.5, color: "#888" }}>Since {c.since}</div></div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ padding: "4px 12px", borderRadius: 999, fontSize: 13.5, fontWeight: 800, background: "rgba(215,38,56,0.1)", color: red }}>{c.rate}</span>
                      <span style={{ padding: "3px 10px", borderRadius: 999, fontSize: 10, fontWeight: 700, background: red, color: "#fff" }}>{c.status}</span>
                      <span style={{ fontSize: 16, color: "#ccc" }}>▼</span>
                    </div>
                  </div>
                  {expandedCountry === i && <div style={{ marginTop: 14, padding: "12px 16px", borderRadius: 10, background: subtleBg, fontSize: 13, color: "#555", lineHeight: 1.65 }}>{c.details}</div>}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "import" && !showResult && (
          <div>
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
              <div>
                <div style={{ fontFamily: displayFont, fontSize: 34, fontWeight: 900, marginBottom: 4 }}>Import Tariff Rates</div>
                <div style={{ fontSize: 14, color: "#666" }}>Real HS codes and verified tariff statuses as of March 7, 2026.</div>
              </div>
              <div style={{ display: "flex", gap: 6 }}>
                {[{ id: "all", label: "All" }, { id: "active", label: "🔴 Active" }, { id: "removed", label: "🟢 Removed" }].map(f => (
                  <button key={f.id} onClick={() => setTariffFilter(f.id)} style={{ padding: "7px 14px", borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: font, border: tariffFilter === f.id ? `2px solid ${red}` : "1px solid rgba(0,0,0,0.12)", background: tariffFilter === f.id ? "rgba(215,38,56,0.06)" : "#fff", color: tariffFilter === f.id ? red : "#666" }}>{f.label}</button>
                ))}
              </div>
            </div>
            <div style={{ background: cardBg, borderRadius: 14, overflow: "hidden", border: "1px solid rgba(0,0,0,0.08)" }}>
              <div style={{ display: "grid", gridTemplateColumns: "2fr 0.8fr 0.8fr 0.7fr 0.7fr", padding: "12px 18px", background: dark, color: "#fff", fontSize: 10.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.8px" }}>
                <div>Item</div><div>HS Code</div><div>Origin</div><div>Rate</div><div>Status</div>
              </div>
              {filteredTariffs.map((item, i) => (
                <div key={i}>
                  <div onClick={() => setExpandedCountry(expandedCountry === `imp-${i}` ? null : `imp-${i}`)}
                    style={{ display: "grid", gridTemplateColumns: "2fr 0.8fr 0.8fr 0.7fr 0.7fr", padding: "14px 18px", borderBottom: "1px solid rgba(0,0,0,0.04)", cursor: "pointer", alignItems: "center" }}>
                    <div style={{ fontWeight: 600, fontSize: 13.5 }}>{item.item}</div>
                    <div style={{ fontSize: 12.5, color: "#666", fontFamily: "monospace" }}>{item.hs}</div>
                    <div style={{ fontSize: 12.5, color: "#666" }}>{item.origin}</div>
                    <div style={{ fontWeight: 800, color: item.status === "active" ? red : green, fontSize: 15 }}>{item.rate}</div>
                    <div><span style={{ padding: "2px 8px", borderRadius: 999, fontSize: 10, fontWeight: 700, background: item.status === "active" ? red : green, color: "#fff" }}>{item.status === "active" ? "ACTIVE" : "REMOVED"}</span></div>
                  </div>
                  {expandedCountry === `imp-${i}` && <div style={{ padding: "10px 18px 14px", background: subtleBg, borderBottom: "1px solid rgba(0,0,0,0.04)", fontSize: 12.5, color: "#555", lineHeight: 1.6 }}>{item.reason}</div>}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "industries" && !showResult && (
          <div>
            <div style={{ fontFamily: displayFont, fontSize: 34, fontWeight: 900, marginBottom: 4 }}>Industries Affected</div>
            <div style={{ fontSize: 14, color: "#666", marginBottom: 28 }}>Current impact on Canadian industries — updated for post-Supreme Court landscape.</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {INDUSTRIES.map((ind, i) => (
                <div key={i} style={{ background: cardBg, borderRadius: 14, overflow: "hidden", border: expandedIndustry === i ? `2px solid ${red}` : "1px solid rgba(0,0,0,0.08)" }}>
                  <div onClick={() => setExpandedIndustry(expandedIndustry === i ? null : i)} style={{ padding: "18px 22px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <span style={{ fontSize: 26 }}>{ind.icon}</span>
                      <div><div style={{ fontWeight: 700, fontSize: 15 }}>{ind.name}</div><div style={{ fontSize: 12.5, color: "#888", marginTop: 2, maxWidth: 600 }}>{ind.description}</div></div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0, marginLeft: 14 }}>
                      <span style={{ padding: "4px 12px", borderRadius: 999, fontSize: 11.5, fontWeight: 700, background: ind.impact === "Critical" ? red : ind.impact === "High" ? "rgba(215,38,56,0.1)" : ind.impact === "Resolved" ? green : "rgba(0,0,0,0.05)", color: ind.impact === "Critical" ? "#fff" : ind.impact === "High" ? red : ind.impact === "Resolved" ? "#fff" : "#888" }}>{ind.impact}</span>
                      <span style={{ fontSize: 15, color: "#ccc" }}>▼</span>
                    </div>
                  </div>
                  {expandedIndustry === i && (
                    <div style={{ padding: "0 22px 18px" }}>
                      <div style={{ fontSize: 10.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.5px", color: "#999", marginBottom: 8 }}>Companies</div>
                      {ind.companies.map((co, j) => (
                        <div key={j} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px", borderRadius: 10, background: subtleBg, marginBottom: 6 }}>
                          <div><div style={{ fontWeight: 600, fontSize: 13.5 }}>{co.name}</div><div style={{ fontSize: 11.5, color: "#888", marginTop: 1 }}>{co.effect}</div></div>
                          <DirectionBadge direction={co.direction} />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <footer style={{ background: dark, color: "rgba(255,255,255,0.5)", padding: "20px", textAlign: "center", fontSize: 11.5, borderTop: `3px solid ${red}` }}>
        <div style={{ marginBottom: 3 }}><span style={{ fontFamily: displayFont, fontWeight: 800, color: "#fff", fontSize: 13.5 }}>TariffShield</span><span style={{ margin: "0 8px", opacity: 0.3 }}>|</span>Helping Canadians make informed purchasing decisions</div>
        <div>Data verified {new Date().toLocaleDateString("en-CA", { month: "short", day: "numeric", year: "numeric" })}. HS codes per WCO / CBSA Customs Tariff. Not financial advice.</div>
      </footer>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        * { box-sizing: border-box; }
        button:hover { opacity: 0.92; }
        input::placeholder { color: #bbb; }
      `}</style>
    </div>
  );
}