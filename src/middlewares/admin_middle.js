const express = require("express");
const { admins} = require("../db/mndb");
const jwt = require("jsonwebtoken");
const verifyjwtpass = process.env.JWT_SECREAT;

function verifytoken(req, res, next) {
  try {
    const { token } = req.headers;

    console.log(token);
    vfytoken = token.split(" ")[1];
    console.log(vfytoken);
    jwt.verify(vfytoken, verifyjwtpass, (err, decoded) => {
      if (err) {
        console.log(err);
        return res.send("error at jwt token verification");
      }
      // req.user = decoded;
      // console.log(decoded);
      next();
    });
  } catch (error) {
    console.log(error);
    res.status(505).send("error at adminacess through token");
  }
}

async function exitadmin(req, res, next) {
  try {
    const { id, password } = req.body;
    const ans = await admins.findOne({ id: id, password: password });

    if (ans == null) {
      res.status(404).send("invalied credentials ");
    } else {
      return next();
    }
  } catch (error) {
    console.log(error);

    res.status(505).send("internal server error");
  }
}
module.exports = { exitadmin, verifytoken };
