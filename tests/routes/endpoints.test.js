/* eslint-disable import/no-extraneous-dependencies */
const supertest = require("supertest");
const app = require("../../src/app.js");

const api = supertest(app);

describe("routes", () => {
  it("should get 200", () => api.get("/health").expect(200));
});
