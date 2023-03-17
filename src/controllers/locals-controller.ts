import { AuthenticatedRequest } from "@/middlewares/authentication-middleware";
import activityService from "@/services/activity-service";
import localsService from "@/services/locals-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getLocals(req: AuthenticatedRequest, res: Response) {
  try {
    const locals = await localsService.listLocals()
    res.status(httpStatus.OK).send(locals);
  } catch (error) {
    if (error.name === "NotFoundError") {
        return res.sendStatus(httpStatus.NOT_FOUND);
    }
  }
}