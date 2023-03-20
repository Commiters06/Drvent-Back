import activityService from "@/services/activity-service";
import { jest } from "@jest/globals";
import { createUser } from "../factories";
import { createActivitiesUserConflict, createActivity, createConflitedActivity, createLocal } from "../factories/activity-factory";
import activityRepository from "@/repositories/activity-repository";
import { init } from "@/app";
import { cleanDb } from "../helpers";
import { conflictError, notFoundError } from "@/errors";

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await cleanDb();
});

describe("activityService test suite", () => {
  it("should not allow entry in activity when not exists", async () => {
    const local = createLocal();
    const user = await createUser();

    jest.spyOn(activityRepository, "getActivityById").mockImplementationOnce((): any => undefined);

    try {
      await activityService.registerUserInActivity(user.id, 0);
    } catch (error) {
      expect(error).toEqual(notFoundError());
    }
  });

  it("should deny user entry in activity when it is full", async () => {
    const local = createLocal();
    const user = await createUser();
    const activity = createActivity(local.id);

    jest.spyOn(activityRepository, "getActivityById").mockImplementationOnce((): any => activity);
    jest.spyOn(activityRepository, "getUsersCountInActivity").mockImplementationOnce((): any => activity.limit);

    try {
      await activityService.registerUserInActivity(user.id, activity.id);
    } catch (error) {
      expect(error).toEqual(conflictError("Limite de pessoas alcançado"));
    }
  });

  it("should deny user entry in activity when have conflict date", async () => {
    const local = createLocal();
    const user = await createUser();
    const activityJoined = createActivity(local.id);
    const usersActivity = createActivitiesUserConflict(user.id, activityJoined);
    const activityConflict = createConflitedActivity();

    jest.spyOn(activityRepository, "getActivityById").mockImplementationOnce((): any => activityConflict);
    jest.spyOn(activityRepository, "getUsersCountInActivity").mockImplementationOnce((): any => activityConflict.limit - 1);
    jest.spyOn(activityRepository, "getOneUserActivities").mockImplementationOnce((): any => usersActivity);

    try {
      await activityService.registerUserInActivity(user.id, activityConflict.id);
    } catch (error) {
      expect(error).toEqual(conflictError("Incompatibilidade de horário"));
    }
  });
});
