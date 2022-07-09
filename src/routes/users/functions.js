const { User } = require("../../db");
const { Op } = require("sequelize");
//recordar user_name
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

function postUser(name, username, password) {
  let p = new Promise(async (resolve, reject) => {
    try {
      if (!name || !username || !password) {
        return reject("all information is required");
      }
      let userexist = await User.findOne({ where: { username: username } });
      if (userexist) {
        return reject("username already exist");
      }
      let user = await User.create({ name, username, password });
      if (!user) {
        return reject("User not created");
      }
      await user.createShopping_list({product_list: []});
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

function putUser(id, name, username, password) {
  let p = new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        return reject("id_user is required");
      }
      if (Number.isNaN(id)) {
        return reject("id_user must be a number");
      }
      if (parseInt(id) < 0) {
        return reject("id_user must be a positive number");
      }

      let user = await User.findOne({ where: { id: id } });

      if (name) {
        name = name.trim();
        user.name = name;
      }

      if (username && username != user.username) {
        username = username.trim();
        userExists = await User.findOne({ where: { username: username } });
        if (userExists) {
          return reject("username already exist");
        }
        user.username = username;
      }

      if (password) {
        password = password.trim();
        user.password = password;
      }
      await user.save();
      return resolve({ msg: `user ${id} modicated`, user: user });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });

  return p;
}

function loginUser(username, password) {
  let p = new Promise(async (resolve, reject) => {
    try {
      if (!username || !password) {
        return resolve({
          msg: "all information(username,password) is required",
          access: false,
        });
      }
      let user = await User.findOne({
        where: { username: username, password: password },
      });
      if (!user) {
        return resolve({
          msg: "the username or password are incorrets",
          access: false,
        });
      }
      return resolve({ msg: `welcome ${user.name}`, access: true, user: user });
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
  putUser,
  loginUser,
};
