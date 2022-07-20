 const { User, Shopping_list, Product,Stock } = require("../../db");

const get_item = async (req, res) => {
  try {
    const { id } = req.params;
    //validaciones
    if (!id) return res.send({ msg: "user is required" });
    if (Number.isNaN(id)) return res.send({ msg: "user must be a number" });
    //existencia de usuario
    const user = await User.findOne({ where: { id } });
    if (!user) return res.send({ msg: "user not found" });
    console.log(Object.keys(user.trolly));// traigo propiedades de objeto
   let itemsId = Object.keys(user.trolly);
  
    console.log(itemsId);
    let items = await Product.findAll({
      where: { id: itemsId },
    });
    items = items.map((x) => {
      return {
        trolly: user.trolly[x.id],
        title: x.title,
        id: x.id,
        price: x.price,
        image: x.image,
        description: x.description,
        category: x.category,
      }
    });
    console.log(items);
    res.send(items);
  } catch (e) {
    res.send({ msg: "failed to get items" });
    console.log(e);
  }
};

/* resivo id del item a borrar
const delete_item = async (req, res) => {
  try {
    const { product } = req.body;
    const { user } = req.body;

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

    await list.removeProduct(productObj);
    
    const new_list = await list.getProducts();
    res.status(201).send({ msg: "item deleted", list: new_list });
  } catch (e) {
    console.log(e);
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
};*/
//////////////////////////////////////////
const add_item = async (req, res) => {
  try {
    const { user } = req.body;
    const { product } = req.body;
    const{size,quantity} = req.body;
    // get talla y cantidad producto
      
    //validaciones de user
    if (!user) return res.send({ msg: "user is required" });
    if (Number.isNaN(user)) return res.send({ msg: "user must be a number" });

    //validaciones de product
    if (!product) return res.send({ msg: "product is required" });
    if (Number.isNaN(product))
      return res.send({ msg: "product must be a number" });

    //existencia de usuario
    const userObj = await User.findOne({ where: { id: user } });
    if (!userObj) return res.send({ msg: "user not found" });

    //existencia de producto
    const item_to_add = await Product.findOne({ where: { id: product } });
    if (!item_to_add) return res.send({ msg: "product not found" });
    //{ '3': 1 , "4":2}
    let propetyItem = userObj.trolly[item_to_add.id];
    propetyItem = {...propetyItem,[size]:quantity}
console.log(propetyItem)
     userObj.trolly = {...userObj.trolly,[item_to_add.id]: propetyItem }
    
    await userObj.save()
    res.send({ msg: "item added", list: userObj });
  } catch (err) {
    res.send({ msg: "failed to add item", error: err });
    console.log(err);
  }
};

module.exports = { get_item, /* delete_item, destroy_trolly*/ add_item };
