require("dotenv").config();
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const { Product } = require("../../db");

const CATEGORY = ["MALE", "FEMALE", "SPORTS"];
const SUBCATEGORY = ["SHIRT", "PANT", "FOOTWEAR", "ACCESSORIES"];

//post/ product to db
const postProduct = async (req, res) => {
  let {
    title,
    price,
    description,
    category,
    subCategory,
    product_care,
    image,
  } = req.body;

  try {
    //validaciones a todos los campos
    if (price) {
      price = parseInt(price);

      if (Number.isNaN(price))
        return res.send({ msg: "price must be a number" });
      if (price < 0)
        return res.send({ msg: "price must be a positive number" });
    } else return res.send({ msg: "price is required" });

    if (!title) return res.send({ msg: "title is required" });
    title = title.trim();

    if (!description) return res.send({ msg: "description is required" });
    description = description.trim();

    if (category) {
      category = category.trim().toUpperCase();
      if (!CATEGORY.includes(category))
        return res.send({ msg: "category is invalid" });
    } else return res.send({ msg: "category is required" });

    if (subCategory) {
      subCategory = subCategory.trim().toUpperCase();
      if (!SUBCATEGORY.includes(subCategory))
        return res.send({ msg: "subCategory is invalid" });
    } else return res.send({ msg: "subCategory is required" });

    if (!product_care) return res.send({ msg: "product_care is required" });
    product_care = product_care.trim();

    if (image) {
      image = atob(image);
      await cloudinary.uploader.upload(image, async (err, result) => {
        if (err) return res.send({ msg: "image is invalid(Cloudinary)" });
        image = result.url;
      });
    }

    ///valida que el producto no exista en la base de datos
    const productExists = await Product.findOne({ where: { title: title } });
    if (productExists)
      return res.send({ msg: "product with this title already exist" });

    //crea el producto en la base de datos
    const product = await Product.create({
      title,
      price,
      description,
      category,
      subCategory,
      product_care,
      image,
    });

    return res.status(201).json({
      msg: `product ${product.title} added to the DB`,
      product: product,
    });
  } catch (e) {
    console.log(e);
    res.send({ msg: "failed to created" });
  }
};

//get product By name
const getProductByName = async (req, res, next) => {
  try {
    const { title, category, subCategory, pag } = req.query;

    let filter = await Product.findAll();

    //filtramos por contenido del titulo y omitmos mayusculas y minusculas
    if (title)
      filter = filter.filter((e) =>
        e.title.toLowerCase().includes(title.toLowerCase())
      );

    //filtramos por categoria y omitmos mayusculas y minusculas
    if (category)
      filter = filter.filter(
        (e) => e.category.toLowerCase() === category.toLowerCase()
      );

    //filtramos por subcategoria y omitmos mayusculas y minusculas
    if (subCategory)
      filter = filter.filter(
        (e) => e.subCategory.toLowerCase() === subCategory.toLowerCase()
      );

    //pagination
    if (pag) {
      let page = parseInt(pag);
      if (Number.isNaN(page)) return res.send({ msg: "page must be a number" });
      page = page - 1;
      if (page < 0) pag = 0;
      filter = filter.slice(page * 6, (page + 1) * 6);
    }

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
    //vlidacion de id
    if (!id) return res.send({ msg: "id is required" });
    if (Number.isNaN(parseInt(id)))
      return res.send({ msg: "id must be a number" });

    //validamos que el producto exista
    const product = await Product.findOne({ where: { id: id } });
    if (!product) return res.status(500).send({ msg: "Product not found" });

    return res.status(200).json(product);
  } catch (error) {
    res.status(500).send({ err: error });
  }
};

///put to Products_dataBase
const putProduct = async (req, res) => {
  let {
    id,
    title,
    price,
    description,
    category,
    subCategory,
    product_care,
    image,
  } = req.body;

  try {
    //validaciones a todos los campos

    if (!id) return res.send({ msg: "id is required" });
    if (Number.isNaN(parseInt(id)))
      return res.send({ msg: "id must be a number" });

    const producto = await Product.findOne({ where: { id: id } });
    if (!producto) return res.send({ msg: "product not found" });

    if (title) {
      title = title.trim();
      const productExists = await Product.findOne({ where: { title: title } });

      if (productExists)
        return res.send({ mdg: "product with this title already exist" });

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
    if (category) {
      category = category.trim();
      producto.category = category;
    }
    if (subCategory) {
      subCategory = subCategory.trim();
      producto.subCategory = subCategory;
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

    res.send({ msg: "failed to modified" });
  }
};

//delete product from db by product_id (by params)
const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    //validacion de id
    if (!id) return res.send({ msg: "id is required" });
    if (Number.isNaN(parseInt(id)))
      return res.send({ msg: "id must be a number" });

    //validamos que el producto exista
    const product = await Product.findOne({ where: { id: id } });
    if (!product) return res.status(500).send({ msg: "Product not found" });

    //eliminamos el producto de la base de datos
    await product.destroy();
    return res.status(200).send({ msg: `product ${product.id} deleted` });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  postProduct,
  getProductByName,
  getProductById,
  deleteProduct,
  putProduct,
};
