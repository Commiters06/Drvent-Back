import { prisma, redisServer } from "@/config";
import { Event } from "@prisma/client";

async function findFirst(): Promise<Event> {
  const EventData = await redisServer.get("eventData");

  if(!EventData || EventData === "null") {
    const Event = await prisma.event.findFirst();
    await redisServer.set("eventData", JSON.stringify(Event));
    return Event;
  }
  return JSON.parse(EventData);
}

const eventRepository = {
  findFirst,
};

export default eventRepository;
