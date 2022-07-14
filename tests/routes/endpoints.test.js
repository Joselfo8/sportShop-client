const supertest = require("supertest");
const app = require("../../src/app.js");

require("dotenv").config();
const server = require("../../src/app.js");
const { conn, User, Product, Shopping_list } = require("../../src/db.js");
const { PORT, NODE_ENV } = process.env;

const api = supertest(app);

//seteamos los datosque vamos a usar
let userData = {
  id: 0,
  name: "test",
  lastname: "test",
  email: "testtesttesttest@test.com",
  password: "test",
  genre: "test",
  dateOfBirth: "01-01-01",
  direction: "test",
};
let productData = {
  id: 0,
  title: "testtesttesttest",
  description: "test",
  price: 100,
  category: "MALE",
  subCategory: "PANT",
  product_care: "care 1",
};

let productData2 = {
  id: 0,
  title: "testtesttesttest2",
  description: "test",
  price: 100,
  category: "MALE",
  subCategory: "PANT",
  product_care: "care 1",
};

// Syncing all the models at once.
jest.setTimeout(20000);
//delete the data using in test
beforeAll(async () => {
  await conn.sync({ alter: true });
  if (NODE_ENV === "development") {
    console.log("LOCAL database synced");
  } else if (NODE_ENV === "production") {
    console.log("REMOTE database synced");
  }
  const serverUp = server.listen(PORT, () => {
    console.log("server up on : http://localhost:" + PORT);
  });
  //delete the data using in test
  await User.destroy({ where: { email: userData.email } });
  await Product.destroy({ where: { title: productData.title } });
  await Product.destroy({ where: { title: productData2.title } });
  await Shopping_list.destroy({ where: {} });
});

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

describe("create source", () => {
  it("should create user", async () => {
    const response = await api.post("/users").send(userData);
    expect(response.body.user).not.toBeNull();
    console.log(response.body);
    userData.id = response.body.user.id;
  });

  it("should create product", async () => {
    const response = await api.post("/products").send(productData);
    expect(response.body.product).not.toBeNull();
    productData.id = response.body.product.id;
  });

  it("should create product 2", async () => {
    const response = await api.post("/products").send(productData2);
    expect(response.body.product).not.toBeNull();
    productData2.id = response.body.product.id;
  });
});

describe("get source", () => {
  it("should get user", async () => {
    const response = await api.get("/users/" + userData.id);
    expect(response.status).toBe(200);
    expect(response.body.user).not.toBeNull();
  });

  it("should get product", async () => {
    const response = await api.get("/products/" + productData.id);
    console.log(response.body);
    expect(response.status).toBe(200);
    expect(response.body.product).not.toBeNull();
  });

  it("should get product 2", async () => {
    const response = await api.get("/products/" + productData2.id);
    console.log(response.body);
    expect(response.status).toBe(200);
    expect(response.body.product).not.toBeNull();
  });

  it("should get all users", async () => {
    const response = await api.get("/users");
    expect(response.status).toBe(200);
    expect(response.body.users.length).toBeGreaterThan(0);
  });

  it("should get all products", async () => {
    const response = await api.get("/products");
    expect(response.status).toBe(200);
    expect(response.body.products.length).toBeGreaterThan(0);
  });

  it("should get shopping list", async () => {
    const response = await api.get("/shopping_list/" + userData.id);
    expect(response.status).toBe(200);
    expect(response.body.list.length).toBe(0);
  });
});

describe("should update source", () => {
  it("should update user", async () => {
    const response = await api
      .put("/users")
      .send({ id: userData.id, name: "test2" });
    expect(response.status).toBe(200);
    expect(response.body.user).not.toBeNull();
    expect(response.body.user.name).toBe("test2");
  });
  it("should update product", async () => {
    const response = await api
      .put("/products")
      .send({ id: productData.id, title: "test2" });
    expect(response.status).toBe(201);
    expect(response.body.product).not.toBeNull();
    expect(response.body.product.title).toBe("test2");
  });
});

describe("should get, add  and delete shopping list", () => {
  it("should get the shopping list", async () => {
    const response = await api.get("/shopping_list/" + userData.id);
    expect(response.status).toBe(200);
    expect(response.body.list.length).toBe(0);
  });
  it("should add product to shopping_list", async () => {
    const response = await api
      .post("/shopping_list")
      .send({ product: productData.id, user: userData.id });
    expect(response.status).toBe(200);
    expect(response.body.list.length).toBe(1);
  });

  it("should add product to shopping_list 2", async () => {
    const response = await api
      .post("/shopping_list")
      .send({ product: productData2.id, user: userData.id });
    expect(response.status).toBe(200);
    expect(response.body.list.length).toBe(2);
  });

  it("should delete product to shopping_list", async () => {
    const response = await api
      .delete("/shopping_list")
      .send({ product: productData.id, user: userData.id });
    expect(response.status).toBe(201);
    expect(response.body.list.length).toBe(1);
  });

  it("should delete product to shopping_list", async () => {
    const response = await api
      .delete("/shopping_list")
      .send({ product: productData2.id, user: userData.id });
    expect(response.status).toBe(201);
    expect(response.body.list.length).toBe(0);
  });
});

afterAll(async () => {
  //await conn.close();
  //await serverUp.close();
  // await api.connect.close();
});
