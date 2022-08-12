const express = require("express");
const register = express.Router();
const Joi = require("joi");
const bcrypt = require("bcrypt");
const User = require("../models/userdb");
const Cart = require("../models/cartdb");

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const userSchema = Joi.object({
  firstname: Joi.string()
    .min(3)
    .messages({
      "string.min": "Please provide your first name",
    })
    .required(),
  lastname: Joi.string()
    .min(1)
    .messages({
      "string.min": "Please provide your last name",
    })
    .required(),
  email: Joi.string()
    .email()
    .messages({
      "string.min": "Please provide your email",
    })
    .required(),
  password: Joi.string()
    .min(8)
    .messages({
      "string.min": "Password must have at least 8 characters",
    })
    .required(),
  confirm_password: Joi.string()
    .min(8)
    .messages({
      "string.min": "Please re-enter your password",
    })
    .required(),
});

register.get("/", (req, res) => {
  res.render("register.ejs", {
    errorMsg: {},
  });
});

register.post("/", async (req, res) => {
  const validation = userSchema.validate(req.body, { abortEarly: false });

  if (validation.error) {
    let errorObject = {
      firstname: null,
      lastname: null,
      email: null,
      password: null,
      confirm_password: null,
    };

    validation.error.details.forEach((detail) => {
      errorObject[detail.context.key] = detail.message;
    });

    res.render("register.ejs", {
      errorMsg: errorObject,
    });
    return;
  }

  const validatedResults = validation.value;

  if (validatedResults.password !== validatedResults.confirm_password) {
    res.send("Passwords do not match");
    return;
  }

  // Hash password
  const hash = bcrypt.hashSync(
    validatedResults.password,
    bcrypt.genSaltSync(10)
  );

  // Store the new user in DB and add a cart property

  // First create a cart document to declare cart property in user DB as cart document ._id

  const cartDoc = await Cart.create({}); // this will return cartDocument
  const cartId = cartDoc._id;

  try {
    await User.create({
      firstname: validatedResults.firstname,
      lastname: validatedResults.lastname,
      email: validatedResults.email,
      password: hash,
      cart: cartId,
    });
  } catch (error) {
    res.send("Error: Unable to create user");
  }

  //Send a welcome email to user
  const msg = {
    to: validatedResults.email,
    from: "wenxi.cart@gmail.com",
    subject: "Hello from Solar",
    text: "Some random text",
    html: "<strong>Visit us today</strong>",
  };
  sgMail
    .send(msg)
    .then((response) => {
      console.log(response[0].statusCode);
      console.log(response[0].headers);
    })
    .catch((error) => {
      console.error(error);
    });

  res.redirect("/");
});

module.exports = register;
