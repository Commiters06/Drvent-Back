import { prisma } from "@/config";
import faker from "@faker-js/faker";
import dayjs from "dayjs";

export function createLocal() {
  const local = {
    id: 1,
    name: "local1"
  };
  return local; 
}

export function createActivity(localId: number) {
  return {
    id: 1,
    description: "atividade1",
    hourStart: "2023-03-18:9:30",
    hourEnd: "2023-03-18:10:00",
    localId,
    date: "2023-03-18",
    limit: 20
  }; 
}

export async function createLocalPrisma () {
  return prisma.local.create({
    data:{
      name: faker.locale
    }
  })
}

export function createActivityPrisma(localId: number, date: string, capacity: number) {
  return prisma.activity.create({
    data:{
      description: faker.lorem.sentences(),
      hourStart: faker.datatype.datetime(),
      hourEnd: faker.datatype.datetime(),
      localId,
      date: dayjs(date).toDate(),
      limit: capacity
    }
  })
}

export function createActivityPrismaSpecific(localId: number, date: string, capacity: number,  hourStart: string, hourEnd: string) {
  return prisma.activity.create({
    data:{
      description: faker.lorem.sentences(),
      hourStart: dayjs(hourStart).toDate(),
      hourEnd: dayjs(hourEnd).toDate(),
      localId,
      date: dayjs(date).toDate(),
      limit: capacity
    }
  })
}