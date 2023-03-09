import { Router } from "express";
import { getDaysOfEvent, getDefaultEvent } from "@/controllers";

const eventsRouter = Router();

eventsRouter.get("/", getDefaultEvent);
eventsRouter.get("/days", getDaysOfEvent);

export { eventsRouter };
