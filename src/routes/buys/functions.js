const { Buy, User } = require("../../db");

async function getBuys(req, res) {
  let buys = await Buy.findAll({ include: [User] });
  buys = buys.map((x) => {
    return {
      id: x.id,
      status_history: x.status_history,
      sub_total: x.sub_total,
      user_id: x.user_id,
      user: x.user.name,
    };
  });
  res.send(buys);
}
async function getBuyById(req, res) {
  try {
    const { id } = req.params;

    if (!id) return res.send({ msg: "id is required" });

    const buy = await Buy.findOne({ where: { id }, include: [User] });
    if (!buy) return res.send({ msg: "buy not found" });

    res.send(buy);
  } catch (error) {
    console.log("error=>", error);
    return res.send({ msg: "failed to get buy", error });
  }
}

async function postBuy(req, res) {
  try {
    const { id_user, method, receiver, direction, city, state, country } =
      req.body;

    //validaciones
    if (!id_user) return res.send({ msg: "please, id_user is required" });
    if (!method) return res.send({ msg: "please, method is required" });
    if (!receiver) return res.send({ msg: "please, receiver is required" });
    if (!direction) return res.send({ msg: "please, direction is required" });
    if (!city) return res.send({ msg: "please, city is required" });
    if (!state) return res.send({ msg: "please, state is required" });
    if (!country) return res.send({ msg: "please, country is required" });

    const user = await User.findOne({ where: { id: id_user } });
    if (!user) return res.send({ msg: "user not found" });

    const list = await user.getShopping_list();

    let products = await list.getProducts();
    if (products.length === 0) return res.send({ msg: "list is empty" });

    products = products.map((x) => {
      return {
        id: x.id,
        title: x.title,
        price: x.price,
        image: x.image,
      };
    });

    const suma = products.reduce((acc, cur) => acc + cur.price, 0);

    const buy = await Buy.create({
      status_history: [{ status: "pending", date: new Date() }],
      products: [...products],
      sub_total: suma,
      taxes: suma * 0.026,
      method: method,
      receiver: receiver,
      direction: direction,
      city: city,
      state: state,
      country: country,
    });
    await user.addBuy(buy);
    res.send(buy);
  } catch (error) {
    console.log("error=>", error);
    return res.send({ msg: "failed to add buy", error });
  }
}

async function putBuy(req, res) {
  const { id, status } = req.body;
  const buy = await Buy.findOne({ where: { id } });
  buy.status_history = [...buy.status_history, { status, date: new Date() }];
  await buy.save();
  await buy.reload();
  res.send(buy);
}

module.exports = {
  getBuys,
  postBuy,
  putBuy,
  getBuyById,
};
