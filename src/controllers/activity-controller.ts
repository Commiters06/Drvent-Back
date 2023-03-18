import { AuthenticatedRequest } from "@/middlewares/authentication-middleware";
import activityService from "@/services/activity-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getActivities(req: AuthenticatedRequest, res: Response) {
  const activities = await activityService.listActivities(req.query.date as string, req.userId);
  res.status(httpStatus.OK).send(activities);
}

export async function joinActivity(req: AuthenticatedRequest, res: Response) {
  const activityId = Number(req.params.activityId);
  await activityService.registerUserInActivity(req.userId, activityId);
  res.sendStatus(200);  
}
