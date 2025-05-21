import express from "express";
import { getStoreHistory } from "../controllers/history.controller";

const router = express.Router();

router.get("/:store_id", getStoreHistory);

export default router;
