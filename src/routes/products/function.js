require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const { Op } = require("sequelize");
const { Product } = require("../../db");
const { getAllSize } = require("../stock/function");

const pagination = require("../../helpers/pagination");

const CATEGORY = ["MAN", "WOMAN", "SPORTS", "KID"];
const SUBCATEGORY = [
  "CLOTHES",
  /* "SHIRT", "PANT",*/ "FOOTWEAR",
  "ACCESSORIES",
];
const ORDERS = ["EXPENSIVE", "CHEAP"];

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

//post with bulkCreate
// const products =[{title:"nike polera"},{title:"lacoste polera"}]
const bulk = async (req, res) => {
  //return res.send("<h1>Bulk</h1>");
  try {
    const products = req.body; //array de producto
    //return res.send(products);
    const productdb = products.forEach(async (e) => {
      const newProduct = {
        title: e.title,
        price: e.price,
        description: e.description,
        category: e.category,
        subCategory: e.subCategory,
        product_care: e.product_care,
        image: e.image,
        rating: e.rating,
        rating_count: e.rating_count,
      };
      //console.log(productdb);
      console.log(newProduct);
      await Product.create(newProduct);
      console.log("newProduct Created");
      return newProduct;
    });
    return res.send(productdb);
  } catch (err) {
    console.log(err);
  }
};

// get all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    return res.status(200).json({ products });
  } catch (err) {
    console.log(err);
  }
};

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
    product_care = product_care.toString().trim();

    if (image && image.slice(0, 4) !== "http") {
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
  } catch (err) {
    console.log(err);
    if (err.name === "SequelizeValidationError") {
      return res.status(400).json({
        success: false,
        msg: err.errors.map((e) => e.message),
      });
    } else {
      return res.send({ msg: "failed to created" });
    }
  }
};

//get product By name
const getProductByName = async (req, res, next) => {
  try {
    let { title, category, subCategory, pag = 1, limit = 5, order } = req.query;
    let where = { where: {} };

    //filtramos por contenido del titulo y omitmos mayusculas y minusculas
    if (title) {
      title = title.toUpperCase().trim();
      where.where.title = { [Op.iLike]: `%${title}%` };
    }

    //filtramos por categoria y omitmos mayusculas y minusculas
    if (category) {
      category = category.toUpperCase().trim();
      where.where.category = { [Op.eq]: `${category}` };
    }

    //filtramos por subcategoria y omitmos mayusculas y minusculas
    if (subCategory) {
      subCategory = subCategory.toUpperCase().trim();
      where.where.subCategory = { [Op.eq]: `${subCategory}` };
    }

    //solicitud de resultados
    console.log(where);
    let filter = await Product.findAll(where);

    //ordernacion por precio
    if (order) {
      if (!ORDERS.includes(order.toUpperCase()))
        return res.send({ msg: `order ${order} is invalid` });
      switch (order.toUpperCase()) {
        case "EXPENSIVE":
          filter = filter.sort((a, b) => b.price - a.price);
          break;
        case "CHEAP":
          filter = filter.sort((a, b) => a.price - b.price);
          break;
        default:
          filter = filter;
          break;
      }
    }
    //pagination
    // const maxPag = Math.ceil(filter.length / 6);

    // if (pag) {
    //   if (Number.isNaN(parseInt(pag))) {
    //     return res.send({ msg: "pag must be a number" });
    //   }
    //   pag = parseInt(pag);
    //   if (pag < 0) {
    //     return res.send({ msg: "pag must be a positive number" });
    //   }
    //   pag = pag - 1;
    //   if (pag < 0) pag = 0;
    //   filter = filter.slice(pag * 6, (pag + 1) * 6);
    //   pag = pag + 1;
    // }

    // return res.status(200).json({
    //   msg: "search success",
    //   products: filter,
    //   pag,
    //   maxPag,
    // });

    const paginated = pagination(filter, limit, pag);

    return res.status(200).json({
      msg: "search success",
      ...paginated,
    });
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
    const sizes = await getAllSize(id);
    if (!id) return res.send({ msg: "id is required" });
    if (Number.isNaN(parseInt(id)))
      return res.send({ msg: "id must be a number" });

    //validamos que el producto exista
    const product = await Product.findOne({ where: { id: id } });
    if (!product) return res.status(500).send({ msg: "Product not found" });

    return res.status(200).json({ msg: "product found", product, sizes });
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
  } catch (err) {
    /* catch (e) {
    console.log(e);

    res.send({ msg: "failed to modified" });
  } */
    if (err.name === "SequelizeValidationError") {
      return res.status(400).json({
        success: false,
        msg: err.errors.map((e) => e.message),
      });
    } else {
      next(new ErrorResponse(`Sorry, could not save ${req.body.name}`, 404));
    }
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
  getProducts,
  //postAllatOnce,
  bulk,
};
