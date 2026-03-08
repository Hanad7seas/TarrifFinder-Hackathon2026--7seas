import { Router, Request, Response, NextFunction } from "express";
import { prisma } from "../lib/prisma";

const router = Router();

// GET /api/alternatives/:productId
router.get(
  "/:productId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const rawProductId = req.params.productId;
      const productId = Number(
        Array.isArray(rawProductId) ? rawProductId[0] : rawProductId
      );

      if (isNaN(productId)) {
        return res.status(400).json({ error: "productId must be a number" });
      }

      const alternatives = await prisma.alternative.findMany({
        where: { productId },
      });

      res.json({ alternatives, total: alternatives.length });
    } catch (err) {
      next(err);
    }
  }
);

export default router;
