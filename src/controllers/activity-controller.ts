import { AuthenticatedRequest } from "@/middlewares/authentication-middleware";
import activityService from "@/services/activity-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getActivities(req: AuthenticatedRequest, res: Response) {

  try{
    const activities = await activityService.listActivities(req.query.date as string, req.userId);
    return res.status(httpStatus.OK).send(activities);
  }catch (err) {
    return res.sendStatus(httpStatus.BAD_REQUEST)
  }
  
}

export async function joinActivity(req: AuthenticatedRequest, res: Response) {

  try{
    const activityId = Number(req.params.activityId);
    await activityService.registerUserInActivity(req.userId, activityId);
    return res.sendStatus(200);  
  }catch(err) {
    if(err.name === "NotFoundError"){
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    if(err.name === "ConflictError"){
      return res.status(httpStatus.CONFLICT).send(err);
    }
    if(err.name === "TimeConflictError"){
      return res.sendStatus(httpStatus.CONFLICT).send(err);
    }
  }
  
}
