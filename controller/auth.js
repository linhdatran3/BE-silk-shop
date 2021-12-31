const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ACCESS_TOKEN_SECRET = "abcdefghiklmn";
module.exports.check = async (req, res, next) => {
  const token = req.get("Authorization").split(" ")[1];
  //console.log(req.get("Authorization"));
  // const token =
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MWMwMWM3OWJlOWU5ZDBlNjhhZjYyODQiLCJ1c2VybmFtZSI6ImN1c3RvbWVyMiIsImlhdCI6MTY0MDAwMzA0M30.OoKA7EK6y3WZyjam7B3L6l_y2ft_REqjGzdrNW0fgnE";
  console.log(token);
  const data = jwt.verify(token, ACCESS_TOKEN_SECRET);
  console.log(data);
  try {
    const user = await User.findOne({
      username: data.username,
    });
    console.log(user);
    if (!user) {
      throw new Error();
    }
    req.user = user;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).send({ error: "Not authorized to access this resource" });
  }
};
module.exports.login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Missing Username or Password" });
  }

  await User.findOne({ username: username })
    .then((user) => {
      if (user.role === "user") {
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
