import express from "express";
import cors from "cors";
import historyRoutes from "./routes/history.routes";

const app = express();

app.use(cors());
app.use("/api/history", historyRoutes);

export default app;
