const { Carry, User, Product } = require("../../db");

function newUser(name) {
  let p = new Promise(async (resolve, reject) => {
    try {
      if (!name) {
        return reject("name is required");
      }
      let user = await User.create({
        name,
      });
      resolve(user);
    } catch (error) {
      reject(error);
    }
  });

  return p;
}

function getCarry(id_user) {
  let p = new Promise(async (resolve, reject) => {
    try {
      if (!id_user) {
        return reject("id is required");
      }
      let user = await User.findOne({
        where: {
          id: id_user,
        },
        include: [Carry],
      });
      resolve(user);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });

  return p;
}

function postCarry(id_user, id_product, quantity) {
  let p = new Promise(async (resolve, reject) => {
    try {
      if (!id_user || !id_product || !quantity) {
        return reject("the information is required");
      }

      let user = await User.findOne({
        where: {
          id: id_user,
        },
      });
      if (!user) {
        return reject("user not found");
      }

      let product = await Product.findOne({
        where: {
          id: id_product,
        },
      });
      if (!product) {
        return reject("product not found");
      }

      let carry = await Carry.create({
        id_user: id_user,
        id_product: id_product,
        quantity: quantity,
      });

      user.addCarry(carry);
      Product.addCarry(carry);

      let result = await Carry.findOne({
        where: { id: carry.id },
        include: [Product, User],
      });
      resolve(result);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });

  return p;
}

function deleteCarry(id_product) {
  let p = new Promise(async (resolve, reject) => {
    try {
      if (!id_user || !id_product || !quantity) {
        return reject("the information is required");
      }
      let carry = await Carry.create({
        id_user: id_user,
        id_product: id_product,
        quantity: quantity,
      });
      resolve(carry);
    } catch (error) {
      reject(error);
    }
  });

  return p;
}

module.exports = {
  getCarry,
  postCarry,
  deleteCarry,
  newUser,
};
