const { User, Product } = require("../../db");

const getFavoritesById = async (req, res) => {
  try {
    const { id } = req.params.id;

    //validar id
    if (!id) res.send({ msg: "user is required" });
    if (Number.isNaN(id)) res.send({ msg: "user must be a number" });

    //existencia del usuario
    const user = await User.findOne({ where: { id: userId } });
    if (!user) res.send({ msg: "user not exist" });

    const list = await user.getFavorite();
    const products = await list.getProducts();

    res.send({ msg: "list of favorites", list: products });
  } catch (error) {
    console.log("error", error);
    res.send({ msg: "failed to get favorites", error: error });
  }
};

const addToFavorites = async (req, res) => {
  try {
    const { user, product } = req.query;

    //validar user
    if (!user) res.send({ msg: "user is required" });
    if (Number.isNaN(user)) res.send({ msg: "user must be a number" });

    //validar product
    if (!product) res.send({ msg: "user is required" });
    if (Number.isNaN(product)) res.send({ msg: "product must be a number" });

    //existencia del usuario
    const userObj = await User.findOne({ where: { id: user } });
    if (!userObj) res.send({ msg: "user not exist" });

    //existencia del producto
    const productoObj = await User.findOne({ where: { id: product } });
    if (!productoObj) res.send({ msg: "product not exist" });

    //agregar producto a favoritos
    const list = await user.getFavorite();
    await list.addProduct(product);
    const products = await list.getProducts();

    res.send({ msg: "product added to favorites", list: products });
  } catch (error) {
    console.log("error", error);
    res.send({ msg: "failed to add to favorites", error: error });
  }
};

const deleteById = async (req, res) => {
  try {
    const { user, product } = req.query;

    //validar user
    if (!user) res.send({ msg: "user is required" });
    if (Number.isNaN(user)) res.send({ msg: "user must be a number" });

    //validar product
    if (!product) res.send({ msg: "user is required" });
    if (Number.isNaN(product)) res.send({ msg: "product must be a number" });

    //existencia del usuario
    const userObj = await User.findOne({ where: { id: user } });
    if (!userObj) res.send({ msg: "user not exist" });

    //existencia del producto
    const productoObj = await User.findOne({ where: { id: product } });
    if (!productoObj) res.send({ msg: "product not exist" });

    //eliminar producto de favoritos
    const list = await user.getFavorite();
    await list.removeProduct(product);
    const products = await list.getProducts();

    res.send({ msg: "product deleted from favorites", list: products });
  } catch (error) {
    console.log("error", error);
    res.send({ msg: "failed to delete from favorites", error: error });
  }
};

module.exports = {
  getFavoritesById,
  addToFavorites,
  deleteById,
};
