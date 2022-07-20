const { Op } = require("sequelize");
const { Buy, User } = require("../../db");

async function getBuys(req, res) {
  const buys = await Buy.findAll({});
  res.send(buys);
}

async function postBuy(req, res) {
  const { id_user, method, receiver, direction, city, state, country } =
    req.body;
  const user = await User.findOne({ where: { id: id_user } });
  const list = await user.getShopping_list();
  let products = await list.getProducts();
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
  res.send(buy);
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
};
