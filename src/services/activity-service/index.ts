import { conflictError, notFoundError } from "@/errors";
import activityRepository from "@/repositories/activity-repository";
import { Activity } from "@prisma/client";
import dayjs from "dayjs";

async function listActivities(date: string, userId: number) {
  const activitiesDb = await activityRepository.getAllByDate(dayjs(date).toDate());

  const activities: { [key: number]: Activity[] } = { };
 
  for(const act of activitiesDb) {
    const usersEntry = await activityRepository.getUsersEntry(act.id);
    act.limit -= usersEntry.length;
    act.iBooked = usersEntry.find(x => x.userId === userId) === undefined ? false : true;

    if(activities[act.localId]) {
      activities[act.localId].push(act);
    }else{
      activities[act.localId] = [act];
    }
  } 

  return activities;
}

async function registerUserInActivity(userId: number, activityId: number) {
  const activity = await activityRepository.getActivityById(activityId);

  if(activity === null) throw notFoundError();
  
  const usersActivityCount = await activityRepository.getUsersCountInActivity(activityId);

  if(activity.limit === usersActivityCount) throw conflictError("Limite de pessoas alcançado");

  await activityRepository.insertUserActivity(userId, activityId);
}

export default {
  listActivities,
  registerUserInActivity
};
