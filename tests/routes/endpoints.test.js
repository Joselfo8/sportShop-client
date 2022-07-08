/* eslint-disable import/no-extraneous-dependencies */
const supertest = require("supertest");
const app = require("../../src/app.js");
const api = supertest(app);
const { conn, User } = require("../../src/db");

describe("routes", () => {
  it("should get 200", () => api.get("/health").expect(200));
});

describe("database", () => {
  it("should  authenticate", async () => {
    let auth = true;
    try {
      await conn.authenticate();
    } catch (error) {
      auth = false;
    }
    expect(auth).toBe(true);
  });

  it("should create a user", async () => {
    const user = {
      name: "test",
      username: "test",
      password: "test",
    };
    const response = await api.post("/users").send(user);
    expect(response.status).not.toBe(404);
  });

  it("shoult exists a user", async () => {
    const user = await User.findOne({ where: { name: "test" } });
    expect(user).toBeTruthy();
  });

  it("should return user", async () => {
    const user = await User.findOne({ where: { name: "test" } });
    const response = await api.get("/users/" + user.id);
    expect(response.status).not.toBe(404);
  });

  it("should delete user", async () => {
    const user = await User.findOne({ where: { name: "test" } });
    const response = await api.delete("/users?id_user=" + user.id);
    expect(response.status).toBe(200);
    const userDelete = await User.findOne({ where: { name: "test" } });
    expect(userDelete).toBeFalsy();
  });
});
