import { prisma } from "@/config";
import { Activity } from "@prisma/client";

async function getAllByDate(date: Date) {
  return await prisma.activity.findMany({ where: { date: date } }) as ActivityModel[];
}

async function getActivityById(id: number) {
  return await prisma.activity.findFirst({ where: { id } });
}

async function getUsersEntry(activityId: number) {
  return await prisma.activityUser.findMany({ where: { activityId } });
}

async function insertUserActivity(userId: number, activityId: number) {
  await prisma.activityUser.create({ data: { activityId, userId } });
}

async function getUsersCountInActivity(activityId: number) {
  return await prisma.activityUser.count({ where: { activityId } });
}

type ActivityModel = Activity & {
  iBooked: boolean
}

export default {
  getAllByDate,
  getUsersEntry,
  insertUserActivity,
  getActivityById,
  getUsersCountInActivity
};
