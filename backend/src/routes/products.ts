import { Router, Request, Response, NextFunction } from "express";
import { prisma } from "../lib/prisma";
import { lookupByUPC } from "../services/upcitemdb";
import { lookupByUPCFromOFF } from "../services/openFoodFacts";

const router = Router();

// GET /api/products/search?upc=048500017753
// GET /api/products/search?q=orange+juice
router.get(
  "/search",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { upc, q } = req.query as { upc?: string; q?: string };

      if (upc) {
        // 1. Check our database first
        const dbProduct = await prisma.product.findUnique({
          where: { upc },
          include: {
            alternatives: true,
            tariff: true,
          },
        });

        if (dbProduct) {
          return res.json({ source: "database", product: dbProduct });
        }

        // 2. Try UPCitemdb (free, 100 req/day)
        const upcResult = await lookupByUPC(upc);

        // 3. Fallback to Open Food Facts
        const offResult = !upcResult ? await lookupByUPCFromOFF(upc) : null;

        const externalProduct = upcResult || offResult;

        if (!externalProduct) {
          return res.status(404).json({ error: "Product not found", upc });
        }

        // Determine tariff from HS code or origin
        const originCountry =
          "countryOfOrigin" in externalProduct
            ? externalProduct.countryOfOrigin
            : null;

        const tariffMatch = originCountry
          ? await prisma.tariff.findFirst({
              where: {
                originCountry: {
                  contains: originCountry.toUpperCase().slice(0, 2),
                  mode: "insensitive",
                },
              },
            })
          : null;

        return res.json({
          source: upcResult ? "upcitemdb" : "open_food_facts",
          product: {
            ...externalProduct,
            tariff: tariffMatch || null,
            alternatives: [],
          },
        });
      }

      if (q) {
        const results = await prisma.product.findMany({
          where: {
            OR: [
              { name: { contains: q, mode: "insensitive" } },
              { brand: { contains: q, mode: "insensitive" } },
              { category: { contains: q, mode: "insensitive" } },
            ],
          },
          include: { tariff: true },
          take: 20,
        });
        return res.json({ results, total: results.length });
      }

      return res
        .status(400)
        .json({ error: "Provide either ?upc= or ?q= query parameter" });
    } catch (err) {
      next(err);
    }
  }
);

export default router;
