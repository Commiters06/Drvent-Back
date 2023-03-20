import app, { init } from "@/app";
import faker from "@faker-js/faker";
import exp from "constants";
import dayjs from "dayjs";
import httpStatus from "http-status";
import { boolean } from "joi";
import supertest from "supertest";
import { createEnrollmentWithAddress, createUser } from "../factories";
import { createActivity, createActivityPrisma, createActivityPrismaSpecific, createLocalPrisma } from "../factories/activity-factory";
import { cleanDb, generateValidToken } from "../helpers";

beforeAll(async () => {
  await init();
  await cleanDb();
});

const server = supertest(app);

describe("GET /activity/", () => {
  it("should respond with status 200 and empty object if no activity was created", async () => {
    const user = await createUser();
    const token = await generateValidToken(user);
    await createEnrollmentWithAddress(user);

    const response = await server.get("/activity/").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({});
  });

  it("should respond with status 200 and activities if created", async () => {
    const user = await createUser();
    const token = await generateValidToken(user);
    await createEnrollmentWithAddress(user);
    const local = await createLocalPrisma()
    const activity = await createActivityPrisma(local.id, "2021-07-09", 20)

    const response = await server.get(`/activity/?date=2021-07-09`).set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.objectContaining({
      [activity.localId] : expect.arrayContaining([
        expect.objectContaining({
          createdAt: expect.any(String),
          date:expect.any(String),
          description: expect.any(String),
          hourEnd: expect.any(String),
          hourStart: expect.any(String),
          iBooked: expect.any(Boolean),
          id: expect.any(Number),
          limit: expect.any(Number),
          localId: expect.any(Number),
          updatedAt: expect.any(String)
        })
      ])
    }))
  })
});

describe("POST /activity/:activityId", () => {
  it("should respond with status 200 when activity available", async () => {
    const user = await createUser();
    const token = await generateValidToken(user);
    await createEnrollmentWithAddress(user);
    const local = await createLocalPrisma()
    const activity = await createActivityPrisma(local.id, "2021-07-08", 20)

    const response = await server.post(`/activity/${activity.id}`).set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
  });

  it("should respond with status 409 when activity is empty", async () => {
    const user = await createUser();
    const token = await generateValidToken(user);
    await createEnrollmentWithAddress(user);
    const local = await createLocalPrisma()
    const activity = await createActivityPrisma(local.id, "2021-07-08", 0)

    const response = await server.post(`/activity/${activity.id}`).set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(409);
  });

  it("should respond with status 409 when activity has incompatibility of time", async () => {
    const user = await createUser();
    const token = await generateValidToken(user);
    await createEnrollmentWithAddress(user);
    const local = await createLocalPrisma()
    const activity = await createActivityPrismaSpecific(local.id, "2021-07-08", 20, "2021-07-08 09:00", "2021-07-08 10:00")
    const activity2 = await createActivityPrismaSpecific(local.id, "2021-07-08", 20, "2021-07-08 09:00", "2021-07-08 10:00")

    const response = await server.post(`/activity/${activity.id}`).set("Authorization", `Bearer ${token}`);
    const response2 = await server.post(`/activity/${activity2.id}`).set("Authorization", `Bearer ${token}`);

    expect(response2.status).toBe(409);
  });


})
