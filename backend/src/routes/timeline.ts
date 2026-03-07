import { Router, Request, Response, NextFunction } from "express";
import { prisma } from "../lib/prisma";

const router = Router();

// GET /api/timeline
router.get("/", async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const events = await prisma.timeline.findMany({
      orderBy: { eventDate: "asc" },
    });

    res.json({ events, total: events.length });
  } catch (err) {
    next(err);
  }
});

export default router;
