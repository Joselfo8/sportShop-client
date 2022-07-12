const { User } = require("../../db");
const { Op } = require("sequelize");
const { compare, encrypt } = require("../../helpers/handleBcrypt");

const rols = ["admin", "user"];

//recordar user_name
async function getAllUser(req, res) {
  try {
    const { rol } = req.query;
    let where = { where: {} };
    if (rol) {
      where.where.rol = rol;
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
    res.send({ msg: error });
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
      rol,
    } = req.body;
    if (
      !name ||
      !lastname ||
      !password ||
      !email ||
      !genre ||
      !dateOfBirth ||
      !direction
    ) {
      return res.status(200).json({ msg: "All fields are required" });
    }
    let userExists = await User.findOne({ where: { email: email } });
    if (userExists) {
      return res.status(200).json({ msg: "Username already exists" });
    }
<<<<<<< HEAD
    if (rol && !rols.includes(rol)) {
      return res.status(200).json({ msg: "rol not valid" });
    }

=======
    hashPass = await encrypt(password)
>>>>>>> 48ea8771b3397bb8836f6449c1f95ba02fc1ace5
    let user = await User.create({
      name: name,
      lastname: lastname,
      password: hashPass,
      email: email,
      genre: genre,
      dateOfBirth: dateOfBirth,
      direction: direction,
      rol: rol,
    });
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
  try {
    const { id, name, lastname, password, email, dateOfBirth, direction, rol } =
      req.body;
    if (!id) {
      return res.status(200).json({ msg: "id_user is required" });
    }
    if (Number.isNaN(parseInt(id))) {
      return res.status(200).json({ msg: "id isn´t number" });
    }
    let user = await User.findOne({ where: { id: id } });
    if (!user) {
      return res.status(200).json({ msg: "User not found" });
    }

    if (name) {
      user.name = name;
    }
    if (lastname) {
      user.lastname = lastname;
    }
    if (email && email !== user.email) {
      let usuarioExiste = await User.findOne({ where: { email: email } });
      if (usuarioExiste) {
        return res.status(200).json({ msg: "Email already register" });
      }
    }
    const hashPass = await encrypt(password);
    if (password) {
      user.password = hashPass;
    }
    if (dateOfBirth) {
      user.dateOfBirth = dateOfBirth;
    }
    if (direction) {
      user.direction = direction;
    }
    if (rol) {
      user.rol = rol;
    }
    await user.save();
    res.status(200).json({ msg: "User updated", user: user });
  } catch (error) {
    console.log("error", error);
    res.status(200).json({ msg: "Failed to update user" });
  }
}

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.send({
        msg: "all information(email,password) is required",
        access: false,
      });
    }
    let user = await User.findOne({
      where: { email: email },
    });
    const acertijo = compare(user.name, user.email, user.password);
    if (acertijo === false) {
      return res.send({
        msg: "the email incorret or the password is incorrect or the user does not exist",
        access: false,
      });
    }
    return res.send({ msg: `welcome ${user.name}`, access: true, user: user });
  } catch (error) {
    console.log(error);
    res.send({ msg: "error", access: false });
  }
}

module.exports = {
  getUser,
  postUser,
  deleteUser,
  putUser,
  loginUser,
  getAllUser,
};
