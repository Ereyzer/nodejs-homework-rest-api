const request = require("supertest");
// const jwt = require("jsonwebtoken");
const fs = require("fs/promises");
const { newUserForRouteUser } = require("./data/data");
const app = require("../app");
const UserModel = require("../model/user");
const db = require("../config/db");

describe("user requests test", () => {
  let token, user;
  beforeAll(async () => {
    await db;
    await UserModel.deleteOne({ email: newUserForRouteUser.email });
  });
  afterAll(async () => {
    const mongo = await db;
    await UserModel.deleteOne({ email: newUserForRouteUser.email });
    await fs.unlink(`./public/avatars/${user.avatarURL}`);
    fs.rmdir(`./public/avatars/${user.id}`, { recursive: true });
    await mongo.disconnect();
  });
  it("register user success", async () => {
    const response = await request(app)
      .post("/api/users/signup")
      .send(newUserForRouteUser)
      .set("Accept", "application/json");

    expect(response.status).toEqual(201);
    expect(response.body).toBeDefined();
  });
  it("register user error", async () => {
    const response = await request(app)
      .post("/api/users/signup")
      .send(newUserForRouteUser)
      .set("Accept", "application/json");

    expect(response.status).toEqual(409);
  });
  it("login user", async () => {
    const response = await request(app)
      .post("/api/users/login")
      .send({
        email: newUserForRouteUser.email,
        password: newUserForRouteUser.password,
      })
      .set("Accept", "application/json");

    expect(response.status).toEqual(202);
    expect(response.body).toBeDefined();
    token = response.body.response.token;
  });
  it("update avatar success", async () => {
    const buffer = await fs.readFile("./test/data/ava.png");
    const response = await request(app)
      .patch("/api/users/avatar")
      .set("Authorization", `Bearer ${token}`)
      .attach("avatar", buffer, "ava.png");

    expect(response.status).toEqual(200);
  });
  it("get current user", async () => {
    const response = await request(app)
      .get("/api/users/current")
      .set("Authorization", `Bearer ${token}`);

    expect(response.body).toBeDefined();
    user = response.body.response;
  });
});
