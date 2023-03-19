import dayjs from "dayjs";
import faker from "@faker-js/faker";
import { Event } from "@prisma/client";
import { prisma } from "@/config";

export async function createEvent(): Promise<Event> {
  const event = await prisma.event.create({
    data: {
      title: faker.lorem.sentence(),
      backgroundImageUrl: faker.image.imageUrl(),
      logoImageUrl: faker.image.imageUrl(),
      startsAt: dayjs().subtract(2, "day").toDate(),
      endsAt: dayjs().add(7, "day").toDate(),
    },
  });

  return event;
}

export async function createEventNotStarted(): Promise<Event> {
  const event = await prisma.event.create({
    data: {
      title: faker.lorem.sentence(),
      backgroundImageUrl: faker.image.imageUrl(),
      logoImageUrl: faker.image.imageUrl(),
      startsAt: dayjs().add(1, "day").toDate(),
      endsAt: dayjs().add(7, "day").toDate(),
    },
  });

  return event;
}
