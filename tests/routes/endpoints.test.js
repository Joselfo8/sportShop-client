/* eslint-disable import/no-extraneous-dependencies */
const supertest = require("supertest");
const app = require("../../src/app.js");
const api = supertest(app);
const { conn, User, Product } = require("../../src/db");

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

describe("user", () => {
  it("should create a user", async () => {
    const user = {
      name: "test",
      lastname: "test",
      email: "test@test.com",
      password: "test",
      genre: "test",
      dateOfBirth: "01-01-01",
      direction: "test",
    };
    const response = await api.post("/users").send(user);
    console.log(response.body);
    expect(response.status).not.toBe(404);
  });

  // it("shoult exists a user", async () => {
  //   const user = await User.findOne({ where: { name: "test" } });
  //   expect(user).toBeTruthy();
  // });

  // it("should return user", async () => {
  //   const user = await User.findOne({ where: { name: "test" } });
  //   const response = await api.get("/users/" + user.id);
  //   expect(response.body.user).toBeTruthy();
  // });

  // it("should modify user", async () => {
  //   const user = await User.findOne({ where: { name: "test" } });
  //   const response = await api.put("/users").send({
  //     id: user.id,
  //     lastname: "test2",
  //   });
  //   expect(response.body.user).toBeTruthy();
  //   const userModified = await User.findOne({ where: { name: "test" } });
  //   expect(userModified.lastname).toBe("test2");
  // });

  // it("should delete user", async () => {
  //   const user = await User.findOne({ where: { name: "test" } });
  //   const response = await api.delete("/users/" + user.id);
  //   expect(response.status).toBe(200);
  //   const userDelete = await User.findOne({ where: { name: "test" } });
  //   expect(userDelete).toBeFalsy();
  // });
});

// describe("products", () => {
//   it("should create a product", async () => {
//     const product = {
//       title: "test",
//       description: "test",
//       price: 1,
//       category: "MALE",
//       subCategory: "PANT",
//       product_care: "care 1",
//     };
//     const response = await api.post("/products").send(product);
//     console.log(response.body);
//     expect(response.status.product).toBeTruthy();
//   });

//   it("should exist product", async () => {
//     const product = await Product.findOne({ where: { name: "test" } });
//     expect(product).toBeTruthy();
//   });

//   it("should return product", async () => {
//     const product = await Product.findOne({ where: { name: "test" } });
//     const response = await api.get("/products/" + product.id);
//     expect(response.status.product).toBeTruthy();
//   });
// });
