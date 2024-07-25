import express from "express";
const router = express.Router();
import {getPortfolios,getLineChartData,currUserRank,audienceRanking,getMultiplier} from "../controllers/portfolios.js";

router.get("/", getPortfolios);
router.get("/multiplier", getMultiplier);

router.get("/audienceRanking", audienceRanking)
router.get("/currUserRank",currUserRank)
router.post("/data/line-chart", getLineChartData);


export default router;
