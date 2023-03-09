import eventsService from "@/services/events-service";
import dayjs from "dayjs";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function getDefaultEvent(_req: Request, res: Response) {
  try {
    const event = await eventsService.getFirstEvent();
    return res.status(httpStatus.OK).send(event);
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send({});
  }
}

export async function getDaysOfEvent(req: Request, res: Response) {
  try {
    const dates = await eventsService.getDates();
    return res.status(httpStatus.OK).send(dates);
  } catch (error) {
    throw new Error("Erro ao listar dias do envento");
  }
}
