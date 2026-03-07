import { Router, Request, Response, NextFunction } from "express";
import { prisma } from "../lib/prisma";

const router = Router();

// GET /api/industries
router.get("/", async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const industries = await prisma.industry.findMany({
      include: { companies: true },
      orderBy: { id: "asc" },
    });

    res.json({ industries, total: industries.length });
  } catch (err) {
    next(err);
  }
});

export default router;
