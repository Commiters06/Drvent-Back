import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getActivities, joinActivity } from "@/controllers";

const activityRouter = Router();

activityRouter
  .all("/*", authenticateToken)
  .get("", getActivities)
  .post("/:activityId", joinActivity);

export { activityRouter };
