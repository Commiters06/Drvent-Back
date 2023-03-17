import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getLocals } from "@/controllers/locals-controller";

const localsRouter = Router();

localsRouter
  .all("/*", authenticateToken)
  .get("", getLocals);

export { localsRouter };