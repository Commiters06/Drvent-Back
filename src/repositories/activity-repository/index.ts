import { prisma } from "@/config";
import { Activity } from "@prisma/client";

async function getAllByDate(date: Date) {
  return await prisma.activity.findMany({ where: { date: date } }) as ActivityModel[];
}

async function getUsersEntry(activityId: number) {
  return await prisma.activityUser.findMany({ where: { activityId } });
}

type ActivityModel = Activity & {
    iBooked: boolean
}

export default {
  getAllByDate,
  getUsersEntry
};
