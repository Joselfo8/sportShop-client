const { User } = require("../../db");
const { Op } = require("sequelize");
const { compare, encrypt } = require("../../helpers/handleBcrypt");
const { tokenSign } = require("../../helpers/Token");

const rols = ["admin", "user"];

//recordar user_name
async function getAllUser(req, res) {
  try {
    const { role } = req.query;
    let where = { where: {} };
    if (role) {
      where.where.role = role;
    }
    let users = await User.findAll(where);
    return res.send({ msg: "Users found", users });
  } catch (error) {
    console.log(error);
    res.send({ msg: "error" });
  }
}
async function getUser(req, res) {
  try {
    const { id } = req.params;
    if (!id) {
      return res.send({ msg: "id_user is required" });
    }
    let user = await User.findOne({ where: { id } });
    if (!user) {
      return res.send({ msg: "User not found" });
    }
    return res.send({ msg: "User found", user });
  } catch (error) {
    console.log(error);
    return res.send({ msg: error });
  }
}

async function postUser(req, res) {
  try {
    const {
      name,
      lastname,
      password,
      email,
      genre,
      dateOfBirth,
      direction,
      country,
      state,
      city,
      numberPhone,
      role,
    } = req.body;

    console.log(name);
    if (!name || !password || !email) {
      return res
        .status(200)
        .json({ msg: "fields (name, password and email) are required" });
    }
    let userExists = await User.findOne({ where: { email: email } });
    if (userExists) {
      return res.status(200).json({ msg: "email already is  register" });
    }

    if (role && !rols.includes(role)) {
      return res.status(200).json({ msg: "role not valid" });
    }

    hashPass = await encrypt(password);

    let user = await User.create({
      name: name,
      lastname: lastname,
      password: hashPass,
      email: email,
      genre: genre,
      dateOfBirth: dateOfBirth,
      direction: direction,
      country: country,
      city: city,
      state: state,
      numberPhone: numberPhone,
      role: role,
    });
    await user.createShopping_list({ product_list: user.email });
    await user.createFavorite({ name: user.email });
    return res.status(200).json({ msg: "User created", user: user });
  } catch (error) {
    console.log("error", error);
    res.status(200).json({ msg: "Failed to create user", error });
  }
}

async function deleteUser(req, res) {
  const { id } = req.params;
  try {
    if (!id) {
      return res.send({ msg: "id is required" });
    }
    if (Number.isNaN(parseInt(id))) {
      return res.send({ msg: "id isn´t number" });
    }
    await User.destroy({ where: { id: id } });
    return res.json({ msg: "User deleted" });
  } catch (error) {
    console.log(error);
    res.json(error);
  }
}
//PUT
async function putUser(req, res) {
  const id = req.params.id;

  try {
    const { password, email, ...data } = req.body;

    // get user by id
    let user = await User.findOne({ where: { id: id } });

    if (!user) return res.status(200).json({ msg: "User not found" });

    // email can't be update
    if (email) return res.status(200).json({ msg: "Email can't be update" });

    // password can't be update
    if (password)
      return res.status(200).json({ msg: "Password can't be update" });

    user.set(data);

    await user.save();

    // send all values, less password
    const { password: _1, ...response } = user.dataValues;

    res.status(200).json({ msg: "User updated", data: response });
  } catch (error) {
    res.status(200).json({ msg: error.message });
    // res.status(200).json({ msg: "Failed to update user" });
  }
}

async function loginUser(req, res) {
  /// Post para iniciar sesion
  try {
    const { email, password } = req.body;
    console.log({ email, password });
    if (!email || !password) {
      return res.send({
        msg: "all information(email,password) is required",
        access: false,
      });
    }
    let user = await User.findOne({
      where: { email: email },
    });
    const acertijo = await compare(password, user.password);
    console.log(acertijo);
    const token = await tokenSign(user);
    if (acertijo === false) {
      //redirect to postUser
      return res.send({
        msg: `the ${user.email}is incorret or the password is incorrect or the user does not exist`,
        access: false,
        redirect: "/user", //redirect a pagina de registro
      });
    }
    return res.send({
      msg: `welcome ${user.name}`,
      access: true,
      token: token,
      user: {
        id: user.id,
        role: user.role,
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        genre: user.genre,
        dateOfBirth: user.dateOfBirth,
        direction: user.direction,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({ msg: "the password or email is incorrect", access: false });
  }
}

async function logOut(req, res) {
  try {
    const { token } = req.body;
    if (!token) {
      return res.send({ msg: "token is required" });
    }
    const decoded = await tokenVerify(token);
    if (!decoded) {
      return res.send({ msg: "token is invalid" });
    }
    return res.send({ msg: "logout success" });
  } catch (error) {
    console.log(error);
    res.send({ msg: "error" });
  }
}

module.exports = {
  getUser,
  postUser,
  deleteUser,
  putUser,
  loginUser,
  getAllUser,
  logOut,
};
