const { User } = require("../../db");
const { Op } = require("sequelize");
const {compare}= require('../../helpers/handleBcrypt');
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

function postUser(name, email, password) {
  console.log(name, email, password);
  let p = new Promise(async (resolve, reject) => {
    try {
      //console.log(person)
      if (!name || !email || !password) {
        return reject("all information is required");
      }
      let userexist = await User.findOne({ where: { email: email } });
      if (userexist) {
        return reject("email already exist");
      }
      let user = await User.create({ name, email, password }); /** */
      if (!user) {
        return reject("User not created");
      }
      await user.createShopping_list({product_list: []});
      return resolve(user);
    } /* catch (error) {
      console.log(error);
      reject(error);
    } */
    catch (err) {
      console.log(err);
       if (err.name === 'SequelizeValidationError') {
        return res.status(400).json({
          success: false,
          msg: err.errors.map(e => e.message)
        })
      } else {
        res.send({ msg: "failed to created" });
      } 
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

function putUser(id, name, email, password) {
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

      if (email && email != user.email) {
        email = email.trim();
        userExists = await User.findOne({ where: { email: email } });
        if (userExists) {
          return reject("email already exist");
        }
        user.email = email;
      }

      if (password) {
        password = password.trim();
        user.password = password;
      }
      await user.save();
      return resolve({ msg: `user ${id} modicated`, user: user });
    } /* catch (error) {
      console.log(error);
      reject(error);
    } */
    catch (err) {
      console.log(err);
       if (err.name === 'SequelizeValidationError') {
        return res.status(400).json({
          success: false,
          msg: err.errors.map(e => e.message)
        })
      } else {
        res.send({ msg: "failed to created" });
      } 
    }
  });

  return p;
}

function loginUser(email, password) {
  let p = new Promise(async (resolve, reject) => {
    try {
      if (!email || !password) {
        return resolve({
          msg: "all information(email,password) is required",
          access: false,
        });
      }
      let user = await User.findOne({
        where: { email: email},
      });
      const acertijo = compare(user.name, user.email, user.password);
      if (acertijo===false) {
        return resolve({
          msg: "the email incorret or the password is incorrect or the user does not exist",
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
