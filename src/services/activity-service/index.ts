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

export default {
  listActivities
};
