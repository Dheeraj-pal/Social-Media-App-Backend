const express = require("express");
const { UserModel } = require("../models/user.model");

const userRouter = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

userRouter.post("/register", async (req, res) => {
  const { name, email, gender, password } = req.body;
  try {
    bcrypt.hash(password, 5, async (err, secure_pass) => {
      if (err) {
        console.log(err);
      } else {
        const user = new UserModel({
          name,
          email,
          gender,
          password: secure_pass,
        });
        await user.save();
        res.send("New User Registered");
      }
    });
  } catch (error) {
    res.send("Error while creating new user");
    console.log(error);
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.find({ email });
    if (user.length > 0) {
      bcrypt.compare(password, user[0].password, (error, result) => {
        if (result) {
          const token = jwt.sign(
            {
              exp: Math.floor(Date.now() / 1000) + 60 * 60,
              userID: user[0]._id,
            },
            "masai"
          );
          res.send({ msg: "login successful", token: token });
        } else {
          res.send("Wrong Credentials");
        }
      });
    } else {
      res.send("Wrong Credentials");
    }
  } catch (error) {
    res.send("error while logging in");
    console.log(error);
  }
});

module.exports = {
  userRouter,
};
