const { Carry } = require("../../db");
function getCarry(id_user) {
  let p = new Promise(async (resolve, reject) => {
    try {
      if (!id_user) {
        return reject("id is required");
      }
      let carry = await Carry.findOne({
        where: {
          id_user: id_user,
        },
      });
      resolve(carry);
    } catch (error) {
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
};
