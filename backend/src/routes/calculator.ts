import { Router, Request, Response, NextFunction } from "express";
import { prisma } from "../lib/prisma";

const router = Router();

// GET /api/calculator?price=39.99&hs=2208.30
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { price, hs } = req.query as { price?: string; hs?: string };

    if (!price || !hs) {
      return res.status(400).json({ error: "Provide ?price= and ?hs= parameters" });
    }

    const priceNum = parseFloat(price);
    if (isNaN(priceNum) || priceNum < 0) {
      return res.status(400).json({ error: "price must be a positive number" });
    }

    const tariff = await prisma.tariff.findUnique({ where: { hsCode: hs } });

    if (!tariff) {
      return res.status(404).json({ error: `No tariff data for HS code ${hs}` });
    }

    // Parse rate like "25%" → 0.25
    const rateStr = tariff.tariffRate?.replace("%", "").trim() || "0";
    const rate = parseFloat(rateStr) / 100;

    const tariffAmount = priceNum * rate;
    const priceAfter = priceNum + tariffAmount;
    const percentIncrease = rate * 100;

    res.json({
      hsCode: hs,
      description: tariff.description,
      status: tariff.status,
      priceBefore: priceNum,
      tariffRate: tariff.tariffRate,
      tariffAmount: parseFloat(tariffAmount.toFixed(2)),
      priceAfter: parseFloat(priceAfter.toFixed(2)),
      percentIncrease: parseFloat(percentIncrease.toFixed(1)),
      isActive: tariff.status === "active",
    });
  } catch (err) {
    next(err);
  }
});

export default router;
