const router = require("express").Router();
const { newProduct } = require("../handleDB");
const { getProductByName, getDBproducts } = require("./function");

router.get("", (req, res) => {
  newProduct("producto1", 1, "descripcion1").then(() => {
    res.send("ya se creo el producto");
  });
});
//GET ALL PRODUCTS
const getAllProducts = async (req, res, next) => {
  //res.send('<h1>get all products</h1>')
  try {
    const products = await getDBproducts()
    res.status(200).send(products);

  }
  catch (err) {
    next(err);
  }
}

//__GET /Product/ByName/:name
const getByName = async (req, res, next) => {
  try {
    //res.send('<h1>producto by Name</h1>')
    const name = req.params.name;
    if (name.length > 0 || name.length < 25 || name.char[0] !== " ") {
      const product = await getProductByName(id);
      res.status(200).send(product);
    } else {
      res.status(400).send("there is not product with that name");
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { products: router };
