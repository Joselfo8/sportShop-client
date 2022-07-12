const { User, Shopping_list, Product } = require("../../db");

const get_item = async (req, res) => {
  try {
    const { id } = req.params;

    //validaciones
    if (!id) return res.send({ msg: "user is required" });
    if (Number.isNaN(id)) return res.send({ msg: "user must be a number" });

    //existencia de usuario
    const user = await User.findOne({ where: { id } });
    if (!user) return res.send({ msg: "user not found" });

    const list = await user.getShopping_list();
    const products = await list.getProducts();
    const productos = products.map((e) => {
      return {
        productId: e.id,
        title: e.title,
        price: e.price,
        image: e.image,
        shoppingListId: e.user_shopping.shoppingListId,
      };
    });
    res.send({ msg: "lista de productos", list: productos });
  } catch (e) {
    res.send({ msg: "failed to get items" });
    console.log(e);
  }
};

// resivo id del item a borrar
const delete_item = async (req, res) => {
  try {
    const { product } = req.query;
    const { user } = req.query;

    //validaciones de user
    if (!user) return res.send({ msg: "user is required" });
    if (Number.isNaN(user)) return res.send({ msg: "user must be a number" });

    //validaciones de product
    if (!product) return res.send({ msg: "product is required" });
    if (Number.isNaN(product))
      return res.send({ msg: "product must be a number" });

    //existencia de usuario
    let userObj = await User.findOne({ where: { id: user } });
    if (!userObj) return res.send({ msg: "user not found" });

    //existencia de producto
    let productObj = await Product.findOne({ where: { id: product } });
    if (!productObj) return res.send({ msg: "product not found" });

    const list = await userObj.getShopping_list();

    const new_list = await list.removeProduct(product_to_delete);
    res.status(201).send({ msg: "item deleted", list: new_list });
  } catch (e) {
    res.send({ msg: "failed to delete item", error: e });
  }
};

const destroy_trolly = async (req, res) => {
  try {
    const { user } = req.query;

    //validaciones de user
    if (!user) return res.send({ msg: "user is required" });
    if (Number.isNaN(user)) return res.send({ msg: "user must be a number" });

    const userObj = await User.findOne({ where: { id: user } });
    const trolly = await userObj.getShopping_list();
    await trolly.setProducts([]);
    res.status(201).send({ msg: "the trolly has ben descarted", list: [] });
  } catch (e) {
    res.send(e);
  }
};

const add_item = async (req, res) => {
  try {
    const { user } = req.query;
    const { product } = req.query;

    //validaciones de user
    if (!user) return res.send({ msg: "user is required" });
    if (Number.isNaN(user)) return res.send({ msg: "user must be a number" });

    //validaciones de product
    if (!product) return res.send({ msg: "product is required" });
    if (Number.isNaN(product))
      return res.send({ msg: "product must be a number" });

    //existencia de usuario
    const userObj = await User.findOne({ where: { id: user_id } });
    if (!userObj) return res.send({ msg: "user not found" });

    //existencia de producto
    const item_to_add = await Product.findOne({ where: { id: product_id } });
    if (!item_to_add) return res.send({ msg: "product not found" });

    const list = await userObj.getShopping_list();
    await list.addProduct(item_to_add);
    const new_list = await list.getProducts();
    new_list = new_list.map((e) => {
      return {
        productId: e.id,
        title: e.title,
        price: e.price,
        image: e.image,
        shoppingListId: e.user_shopping.shoppingListId,
      };
    });
    res.send({ msg: "item added", list: new_list });
  } catch (err) {
    res.send({ msg: "failed to add item", error: err });
    console.log(err);
  }
};

module.exports = { get_item, delete_item, destroy_trolly, add_item };
