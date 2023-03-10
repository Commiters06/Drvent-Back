import { AuthenticatedRequest } from "@/middlewares/authentication-middleware";
import activityService from "@/services/activity-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getActivities(req: AuthenticatedRequest, res: Response) {
  try {
    const activities = await activityService.listActivities(req.query.date as string, req.userId);
    res.status(httpStatus.OK).send(activities);
  } catch (error) {
    throw new Error("Erro ao consultar atividades");
  }
}
