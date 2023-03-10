import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getActivities } from "@/controllers";

const activityRouter = Router();

activityRouter
  .all("/*", authenticateToken)
  .get("", getActivities);

export { activityRouter };
