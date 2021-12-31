const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const ACCESS_TOKEN_SECRET = "abcdefghiklmn";
const User = require("../model/user");
module.exports.adminLogin = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Missing Username or Password" });
  }

  await User.findOne({ username: username })
    .then((user) => {
      if (user.role === "admin") {
        if (!bcrypt.compareSync(password, user.password)) {
          return res.status(400).json({
            success: false,
            message: "Incorrect Username or Password 3",
          });
        } else {
          const accessToken = jwt.sign(
            { _id: user._id, username: user.username },
            ACCESS_TOKEN_SECRET,
            { algorithm: "HS256" }
          );
          res.status(200).json({
            success: true,
            message: "Login Successfully",
            accessToken,
            user,
          });
        }
      } else {
        res
          .status(400)
          .json({ success: false, message: "Incorrect Username or Password" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ success: false, message: "Incorrect username" });
    });
};
module.exports.addAdminAccount = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Missing Username or Passwod" });
  }
  try {
    const userCheck = await User.findOne({ username: username });
    if (userCheck) {
      return res
        .status(400)
        .json({ success: false, message: "Username already taken" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      password: hashedPassword,
      email: req.body.email,

      name: {
        firstname: req.body.name.firstname,
        lastname: req.body.name.lastname,
      },
      address: {
        city: req.body.address.city,
        street: req.body.address.street,
        number: req.body.address.number,
      },
      phone: req.body.phone,
      role: "admin",
    });
    await user.save();
    res.status(200).json({ success: true, message: "Insert Successfully" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
