const supertest = require("supertest");
const server = require("../../src/app");
const api = supertest(server);
describe("Endpoints", () => {
  it("should return OK", async () => {
    const response = await api.get("/");
    expect(response.status).toBe(200);
  });
});
