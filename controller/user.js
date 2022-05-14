const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const joi = require("@hapi/joi");
const { User } = require("../models");

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const schema = joi.object({
      name: joi.string().min(3).required(),
      email: joi.string().email().min(6).required(),
      password: joi.string().min(6).required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(500).send({
        statusCode: 500,
        error: {
          message: error.details[0].message,
        },
      });
    }

    const checkEmail = await User.findOne({
      where: {
        email,
      },
    });

    if (checkEmail) {
      return res.status(500).send({
        statusCode: 500,
        error: {
          statusCode: 500,
          message: "email already been existed",
        },
      });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      {
        id: user.id,
      },
      process.env.JWT_SCREET
    );

    res.status(200).send({
      statusCode: 200,
      message: "you have been registered",
      result: {
        id: user.id,
        name,
        email,
        token,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const schema = joi.object({
      email: joi.string().email().min(6).required(),
      password: joi.string().min(6).required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(500).send({
        statusCode: 500,
        error: {
          message: error.details[0].message,
        },
      });
    }

    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user)
      return res.status(500).send({
        statusCode: 500,
        error: {
          message: "Email or password invalid",
        },
      });

    const validPass = await bcrypt.compare(password, user.password);

    if (!validPass)
      return res.status(500).send({
        statusCode: 500,
        error: {
          message: "Email or password invalid",
        },
      });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SCREET);

    res.status(200).send({
      statusCode: 200,
      message: "login success",
      data: {
        id: user.id,
        email: user.email,
        token,
      },
    });
  } catch (err) {
    res.status(500).send({
      statusCode: 500,
      message: err.message,
    });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { email, oldPassword, newPassword, retryNewPassword } = req.body;

    const schema = joi.object({
      email: joi.string().min(6).required(),
      oldPassword: joi.string().min(6).required(),
      newPassword: joi.string().min(6).required(),
      retryNewPassword: joi.string().min(6).required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(500).send({
        statusCode: 500,
        error: {
          message: error.details[0].message,
        },
      });
    }

    if (newPassword != retryNewPassword) {
      return res.status(500).send({
        statusCode: 500,
        error: {
          message: "retryNewPassword and newPassword must same value",
        },
      });
    }

    const userValue = await User.findOne({
      where: { email },
    });
    const user = userValue?.dataValues;

    if (!user)
      return res.status(500).send({
        statusCode: 500,
        error: {
          message: "User does not exist",
        },
      });

    const validPass = await bcrypt.compare(oldPassword, user.password);

    if (!validPass)
      return res.status(500).send({
        statusCode: 500,
        error: {
          message: "Invalide password",
        },
      });

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    const userChange = await User.update(
      {
        email,
        password: hashedPassword,
      },
      { where: { id: user.id } }
    );

    const token = jwt.sign(
      {
        id: user.id,
      },
      process.env.JWT_SCREET
    );

    return res.status(200).send({
      statusCode: 200,
      message: "Password has been change",
      result: null,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.logout = async (req, res) => {
  try {
    return res.status(200).json({
      statusCode: 200,
      message: "Logout success",
      result: null,
    });
  } catch (err) {
    res.status(500).send({ statusCode: 500, message: "get data User failed" });
  }
};

exports.readUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: {
        exclude: ["password", "createdAt", "updatedAt"],
      },
    });

    res.status(200).send({
      statusCode: 200,
      message: "get data users success",
      data: users,
    });
  } catch (err) {
    res.status(500).send({ statusCode: 500, message: err.message });
  }
};

exports.readUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findOne({
      where: { id: id },
      attributes: {
        exclude: ["password", "createdAt", "updatedAt"],
      },
    });
    return res.status(200).json({
      statusCode: 200,
      message: "get profile success",
      profile: user,
    });
  } catch (err) {
    res.status(500).send({ statusCode: 500, message: "get data User failed" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const users = await User.destroy({
      where: {
        id: id,
      },
    });
    res.status(200).send({ statusCode: 200, message: "delete user success" });
  } catch (err) {
    res.status(500).send({ statusCode: 500, message: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    const { profileImage } = req.files;
    const imageProfileName = profileImage.name;
    await profileImage.mv(`./images/${imageProfileName}`);

    const user = await User.update(
      {
        profile: imageProfileName,
      },
      {
        where: { id },
      }
    );

    if (user) {
      const userResult = await User.findOne({
        where: { id },
        attributes: { exclude: ["createdAt", "updatedAt", "password"] },
      });
      return res.status(200).send({
        data: userResult,
      });
    }
  } catch (err) {
    console.log(err);
  }
};
