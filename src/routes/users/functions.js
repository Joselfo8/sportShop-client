const { User } = require("../../db");

function getUser(id_user) {
  let p = new Promise(async (resolve, reject) => {
    try {
      if (!id_user) {
        return reject("id_user is required");
      }
      let user = await User.findOne({ where: { id: id_user } });
      if (!user) {
        return reject("User not found");
      }
      return resolve(user);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });

  return p;
}

function postUser(name) {
  let p = new Promise(async (resolve, reject) => {
    try {
      if (!name) {
        return reject("name is required");
      }
      let user = await User.create({ name: name });
      if (!user) {
        return reject("User not created");
      }
      return resolve(user);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });

  return p;
}

function deleteUser(id) {
  let p = new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        return reject("id_user is required");
      }
      await User.destroy({ where: { id: id } });
      return resolve({ msg: "User deleted" });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });

  return p;
}

module.exports = {
  getUser,
  postUser,
  deleteUser,
};
