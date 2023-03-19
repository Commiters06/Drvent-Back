import activityService from "@/services/activity-service";
import { jest } from "@jest/globals";
import { createUser } from "../factories";
import { createActivity, createLocal } from "../factories/activity-factory";
import activityRepository from "@/repositories/activity-repository";
import faker from "@faker-js/faker";

describe("activityService test suite", () => {
  it("should not allow entry in activity when not exists", async () => {
    const local = createLocal();
    const user = await createUser();
    const activity = createActivity(local.id);

    jest.spyOn(activityRepository, "getActivityById").mockImplementationOnce((): any => undefined);

    const response = activityService.registerUserInActivity(user.id, 0);
    expect(response).toEqual({
      name: "NotFoundError",
      message: "No result for this search!",
    });
  });
});
