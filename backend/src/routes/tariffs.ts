import { Router, Request, Response, NextFunction } from "express";
import { prisma } from "../lib/prisma";

const router = Router();

// GET /api/tariffs?status=active
// GET /api/tariffs?status=removed
// GET /api/tariffs  (all)
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { status } = req.query as { status?: string };

    const where =
      status === "active" || status === "removed" ? { status } : {};

    const tariffs = await prisma.tariff.findMany({
      where,
      orderBy: { status: "asc" },
    });

    res.json({ tariffs, total: tariffs.length });
  } catch (err) {
    next(err);
  }
});

// GET /api/tariffs/:hsCode
router.get(
  "/:hsCode",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { hsCode } = req.params;

      const tariff = await prisma.tariff.findUnique({
        where: { hsCode },
        include: { products: true },
      });

      if (!tariff) {
        return res.status(404).json({ error: `No tariff found for HS code ${hsCode}` });
      }

      res.json(tariff);
    } catch (err) {
      next(err);
    }
  }
);

export default router;
