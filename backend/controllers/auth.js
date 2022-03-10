const AuthSchema = require("../models/Auth");
const bcrypt = require("bcryptjs");
const { JWT_COOKIE_EXPIRE } = require("../config/index");

/* logic description
@HTTP request => post
@access public 
@url=> api/auth/signup */

exports.SignUp = async (req, res) => {
  let { username, email, role, password, Phone } = req.body;
  try {
    let payload = {
      username,
      email,
      role,
      password,
      // changing part1
      Phone,
    };
    // save into database
    // create metrhod creating new document in mongodb
    let user = await AuthSchema.create(payload);
    // let TOKEN = await user.getJWTtoken();
    // // after JWT is payload is encoded token
    // res.status(201).json({ message: "successfully user created", TOKEN });
    sendTokenResponse(user, 201, res);
  } catch (err) {
    console.log(err);
    res.status(501).json("server error");
  }
};

/* logic description
@HTTP request => post
@access public 
@url=> api/auth/signin */

exports.SignIn = async (req, res) => {
  try {
    let { email, password, Phone } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "email and password required" });
    }
    // changing part2
    if (!Phone) {
      return res.status(400).json({ message: "phone is required" });
    }
    // check user email exist or not
    // fetching from database
    let user = await AuthSchema.findOne({ email }).select("+password");
    // changing part3
    let data = await AuthSchema.findOne({ Phone });
    if (!user) {
      return res
        .status(401)
        .json({ message: "email not exist in our database" });
    }
    // changing part3
    if (!data) {
      return res
        .status(401)
        .json({ message: "email not exist in our database"});
    }

    // check password
    let isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Password is not match " });
    }
    // let TOKEN = await user.getJWTtoken();
    // return res.status(201).json({ message: "successfully logged in ", TOKEN });
    sendTokenResponse(user, 201, res);
  } catch (err) {
    return res.status(501).json({ message: "server error" });
  }
};

function sendTokenResponse(user, statusCode, res) {
  let TOKEN = user.getJWTtoken();
  const options = {
    expires: new Date(Date.now() + JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };
  res
    .status(statusCode)
    .cookie("TOKEN", TOKEN, options)
    .json({ message: "successfully stored", TOKEN });
}
// this logic or block only for authenticated user once login after token
exports.getMe = async (req, res, next) => {
  try {
    let user = await AuthSchema.findById(req.user.id);
    res.status(200).json({ message: "successfully fetched", user });
    next();
  } catch (err) {
    res.status(501).json({ message: "server error" });
  }
};
