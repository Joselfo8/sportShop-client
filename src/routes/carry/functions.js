const { Carry } = require("../../db");
function GetCarry(id) {
  let p = new Promise(async (resolve, reject) => {
    try {
      let carry = await Carry.findOne({
        where: {
          id_user: id,
        },
      });
      resolve(carry);
    } catch (error) {
      reject(error);
    }
  });

  return p;
}

module.exports = {
  GetCarry,
};
