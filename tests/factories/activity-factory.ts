import faker from "@faker-js/faker";
import dayjs from "dayjs";

export function createLocal() {
  const local = {
    id: Number(faker.random.numeric(2)),
    name: faker.commerce.productDescription()
  };
  return local; 
}

export function createActivity(localId: number) {
  return {
    id: Number(faker.random.numeric(2)),
    description: faker.commerce.productDescription(),
    hourStart: dayjs("2023-03-18T9:30:00").toDate(),
    hourEnd: dayjs("2023-03-18T10:00:00").toDate(),
    localId: localId,
    date: dayjs("2023-03-18").toDate(),
    limit: 20
  }; 
}

export function createConflitedActivity() {
  const local = createLocal();

  const activity: Activity = {
    id: Number(faker.random.numeric(2)),
    description: faker.commerce.productDescription(),
    hourStart: dayjs("2023-03-18T9:29:00").toDate(),
    hourEnd: dayjs("2023-03-18T11:01:00").toDate(),
    localId: local.id,
    date: dayjs("2023-03-18").toDate(),
    limit: 20
  };

  return activity;
}

export function createActivitiesUserConflict(userId: number, activityJoined: Activity) {
  return[
    {
      id: Number(faker.random.numeric(2)),
      activityId: activityJoined.id,
      userId,
      Activity: activityJoined
    }
  ];
}

type Activity = {
  id: number,
  description: string, 
  hourStart: Date,
  hourEnd: Date,
  localId: number,
  date: Date,
  limit: number
}
