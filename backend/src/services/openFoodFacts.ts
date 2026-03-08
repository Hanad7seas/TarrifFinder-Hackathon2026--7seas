import axios from "axios";

const BASE_URL =
  process.env.OPEN_FOOD_FACTS_URL || "https://world.openfoodfacts.org/api/v2";

interface OFFProduct {
  product_name?: string;
  brands?: string;
  categories?: string;
  countries_tags?: string[];
  origins?: string;
  manufacturing_places?: string;
  image_front_url?: string;
}

interface OFFResponse {
  status: number;
  product?: OFFProduct;
}

export interface OFFResult {
  upc: string;
  name: string;
  brand: string;
  category: string;
  countryOfOrigin: string | null;
  imageUrl: string | null;
}

export async function lookupByUPCFromOFF(
  upc: string
): Promise<OFFResult | null> {
  try {
    const response = await axios.get<OFFResponse>(
      `${BASE_URL}/product/${upc}.json`,
      { timeout: 5000 }
    );

    if (response.data?.status !== 1 || !response.data.product) return null;

    const p = response.data.product;

    const originRaw =
      p.origins ||
      p.manufacturing_places ||
      p.countries_tags?.[0]?.replace("en:", "") ||
      null;

    return {
      upc,
      name: p.product_name || "Unknown Product",
      brand: p.brands || "",
      category: p.categories?.split(",")[0]?.trim() || "",
      countryOfOrigin: originRaw || null,
      imageUrl: p.image_front_url || null,
    };
  } catch (err) {
    console.warn(`Open Food Facts lookup failed for ${upc}:`, (err as Error).message);
    return null;
  }
}
