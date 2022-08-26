const pagination = require("../src/helpers/pagination");

// generate an array of products
const getProducts = (total = 10) => {
  let products = [];

  for (let i = 0; i < total; i++) {
    products.push({ title: `product-${i}` });
  }

  return products;
};

describe("pagination helper", () => {
  it("paginate 5 products", () => {
    const products = getProducts(5);
    const paginate = (page = 1) => pagination(products, 10, page);

    expect(paginate().next.page).toBe(1);
    expect(paginate().previous.page).toBe(1);
    expect(paginate().products.length).toBe(5);

    // click next page
    expect(paginate(2).next.page).toBe(1);
    expect(paginate(2).previous.page).toBe(1);
    expect(paginate(2).products.length).toBe(5);
  });

  it("paginate 11 products", () => {
    const products = getProducts(11);
    const paginate = (page = 1) => pagination(products, 10, page);

    expect(paginate(1).next.page).toBe(2);
    expect(paginate(1).previous.page).toBe(1);

    // click next page
    expect(paginate(2).next.page).toBe(2);
    expect(paginate(2).previous.page).toBe(1);
    expect(paginate(2).products.length).toBe(1);
  });

  it("paginate 64 products", () => {
    const products = getProducts(64);
    const paginate = (page = 1) => pagination(products, 6, page);

    expect(paginate(5).next.page).toBe(6);
    expect(paginate(5).previous.page).toBe(4);

    // click next page
    expect(paginate(8).next.page).toBe(9);
    expect(paginate(8).previous.page).toBe(7);
    expect(paginate(8).products.length).toBe(6);
  });

  it("paginate 94 products", () => {
    const products = getProducts(94);
    const paginate = (page = 1) => pagination(products, 6, page);

    expect(paginate(1).maxPage).toBe(16);
    expect(paginate(8).next.page).toBe(9);
    expect(paginate(8).previous.page).toBe(7);
    expect(paginate(8).products.length).toBe(6);

    // click next page
    expect(paginate(16).next.page).toBe(16);
    expect(paginate(16).previous.page).toBe(15);
    expect(paginate(16).products.length).toBe(4);

    // click next page
    expect(paginate(17).next.page).toBe(16);
    expect(paginate(17).previous.page).toBe(15);
    expect(paginate(17).products.length).toBe(4);

    // click next page
    expect(paginate(26).next.page).toBe(16);
    expect(paginate(30).previous.page).toBe(15);
    expect(paginate(64).products.length).toBe(4);
  });
});
