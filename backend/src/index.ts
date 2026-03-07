import "dotenv/config";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { corsMiddleware } from "./middleware/cors";
import { rateLimiter } from "./middleware/rateLimiter";
import { errorHandler, notFound } from "./middleware/errorHandler";
import productsRouter from "./routes/products";
import tariffsRouter from "./routes/tariffs";
import industriesRouter from "./routes/industries";
import alternativesRouter from "./routes/alternatives";
import calculatorRouter from "./routes/calculator";
import timelineRouter from "./routes/timeline";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(corsMiddleware);
app.use(morgan("dev"));
app.use(express.json());
app.use(rateLimiter);

app.get("/", (_req, res) => {
  res.json({ message: "TariffShield API is running", version: "1.0.0" });
});

app.use("/api/products", productsRouter);
app.use("/api/tariffs", tariffsRouter);
app.use("/api/industries", industriesRouter);
app.use("/api/alternatives", alternativesRouter);
app.use("/api/calculator", calculatorRouter);
app.use("/api/timeline", timelineRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`✅ TariffShield API running on http://localhost:${PORT}`);
});

export default app;
