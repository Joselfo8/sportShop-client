//const { where } = require("sequelize/types")
const { Product } = require("../../db");

//post/ product to db
const postProduct = async (req, res) => {
  let {
    title,
    price,
    description,
    product_category,
    product_subCategory,
    product_care,
    image,
  } = req.body;

  try {
    if (
      !title ||
      !price ||


      !description ||
      !product_care ||
      !product_category ||
      !product_subCategory
    )

      return res.send({ msg: "all fields ( image not ) are required" });


    title = title.trim();
    description = description.trim();
    product_category = product_category.trim();
    product_subCategory = product_subCategory.trim();
    product_care = product_care.trim();


    const productExists = await Product.findOne({ where: { title: title } });
    if (productExists)
      return res.send({ msg: "product with this title already exist" });

    const product = await Product.create({

      title,
      price,
      description,
      product_category,
      product_subCategory,
      product_care,
      image,
    });


    return res.status(201).send({

      msg: `product ${product.title} added to the DB`,
      product: product,
    });
  } catch (e) {

    res.send({ msg: "failed to created" });

  }
};

//get product By name
const getProductByName = async (req, res, next) => {
  try {
    const { title, product_category, product_subCategory } = req.query;
    const Productx = await Product.findAll();
    const product = Productx.map((e) => e);


    let filter = "undefined";

    if (title) filter = product.filter((e) => e.title.includes(title));


    if (product_category)
      filter = product.filter((e) =>
        e.product_category.includes(product_category)
      );
    if (product_subCategory)
      filter = product.filter((e) =>
        e.product_subCategory.includes(product_subCategory)
      );

    return res.status(200).json(filter);
  } catch (e) {
    console.log(e);

    res.status(500).send({ err: e });

  }
};

//get product By id
const getProductById = async (req, res, next) => {

  try {
    const { id } = req.params;

    if (!id) return res.send({ msg: "id is required" });

    const product = await Product.findOne({ where: { id: id } });

    if (!product) return res.status(500).send({ msg: "Product not found" });

    return res.status(200).json(product);
  } catch (error) {
    res.status(500).send({ err: error });
  }

};

//get all from Product db
const getDBproducts = async (req, res, next) => {
  const dbProduct = await Product.findAll();


  // console.log(from_db)
  return res.status(200).json(dbProduct);
};


///put to fix Porducts_dataBase
const putProduct = async (req, res) => {
  let {
    id,
    title,
    price,
    description,
    product_category,
    product_subCategory,
    product_care,
    image,
  } = req.body;

  try {
    if (!id) return res.send("id is required");

    const producto = await Product.findOne({ where: { id: id } });
    if (!producto) return res.send("product not found");


    if (title) {
      title = title.trim();
      const productExists = await Product.findOne({ where: { title: title } });

      if (productExists)
        return res.send("product with this title already exist");
      producto.title = title;
    }
    if (price && parseInt(price) > 0) {
      price = parseInt(price);
      producto.price = price;
    }
    if (description) {
      description = description.trim();
      producto.description = description;
    }
    if (product_category) {
      product_category = product_category.trim();
      producto.product_category = product_category;
    }
    if (product_subCategory) {
      product_subCategory = product_subCategory.trim();
      producto.product_subCategory = product_subCategory;
    }

    if (product_care) {
      product_care = product_care.trim();
      producto.product_care = product_care;
    }
    if (image) {

      producto.image = image;
    }
    producto.save();


    return res.status(201).send({
      msg: `product ${producto.id} modified to the DB`,
      product: producto,
    });
  } catch (e) {
    console.log(e);

    res.send("failed to created");

  }
};

//delete product from db by product_id (by params)
const deleteProduct = async (req, res, next) => {
  try {
    //res.send("<h1>Dog Deleted</h1>");
    const { id } = req.params;
    if (id.length > 0) {
      await Product.destroy({
        where: { id: id },
      });
      return res.status(200).send(`Product of id: ${id} has been deleted`);
    }
    return res.status(400).send("there is no Product with that id");
  } catch (err) {
    next(err);
  }
};

module.exports = {
  postProduct,
  getProductByName,
  getProductById,
  getDBproducts,
  deleteProduct,
  putProduct,
};
