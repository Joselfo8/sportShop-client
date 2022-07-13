/* eslint-disable import/no-extraneous-dependencies */
const supertest = require("supertest");
const { resource } = require("../../src/app.js");
const app = require("../../src/app.js");
const api = supertest(app);
const { conn, User, Product } = require("../../src/db");
const { serverUp } = require("../../index.js");

//seteamos los datosque vamos a usar
const userData = {
  name: "test",
  lastname: "test",
  email: "testtesttesttest@test.com",
  password: "test",
  genre: "test",
  dateOfBirth: "01-01-01",
  direction: "test",
};
const productData = {
  title: "testtesttesttest",
  description: "test",
  price: 100,
  category: "MALE",
  subCategory: "PANT",
  product_care: "care 1",
};

describe("health", () => {
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
});

describe("create sourse", () => {
  it("should create a user", async () => {
    const response = await api.post("/users").send(userData);
    console.log(response.body);
    expect(response.body.user).toBeTruthy();
  });
});

afterAll(async () => {
  //await conn.close();
  //await serverUp.close();
  // await api.connect.close();
});
