const router = require("express").Router();
const {
  postProduct,
  getProductByName,
  getProductById,
  getDBproducts,
  Product_fix_carry,
  deleteProduct,
  putProduct,
} = require("./function");

//get/products?name&category&subCategory
router.get("", getProductByName);

//get/products (All products)
router.get("/all", getDBproducts);

//get/products/:id
router.get("/:id", getProductById);

//put/products body:id,name,price,description,product_category,product_subCategory
router.put("/", putProduct);

//post/products body:name,price,description,product_category,product_subCategory
router.post("", postProduct);

//delete/products/:id
router.delete("/:id", deleteProduct);

module.exports = { products: router };
