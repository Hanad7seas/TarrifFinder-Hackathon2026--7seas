import axios from "axios";

const BASE_URL =
  process.env.UPCITEMDB_BASE_URL || "https://api.upcitemdb.com/prod/trial";

interface UPCItemDBItem {
  ean: string;
  title: string;
  description?: string;
  brand?: string;
  model?: string;
  category?: string;
  images?: string[];
  offers?: { merchant: string; domain: string; price: string; currency: string }[];
}

interface UPCItemDBResponse {
  code: string;
  total: number;
  offset: number;
  items: UPCItemDBItem[];
}

export interface LookupResult {
  upc: string;
  name: string;
  brand: string;
  category: string;
  imageUrl: string | null;
  description: string;
}

export async function lookupByUPC(upc: string): Promise<LookupResult | null> {
  try {
    const response = await axios.get<UPCItemDBResponse>(
      `${BASE_URL}/lookup?upc=${upc}`,
      { timeout: 5000 }
    );

    const items = response.data?.items;
    if (!items || items.length === 0) return null;

    const item = items[0];
    return {
      upc,
      name: item.title || "Unknown Product",
      brand: item.brand || "",
      category: item.category || "",
      imageUrl: item.images?.[0] || null,
      description: item.description || "",
    };
  } catch (err) {
    console.warn(`UPCitemdb lookup failed for ${upc}:`, (err as Error).message);
    return null;
  }
}
