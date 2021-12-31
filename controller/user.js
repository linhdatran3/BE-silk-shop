const User = require("../model/user");
const bcrypt = require("bcrypt");

//check: true
module.exports.getAllUser = (req, res) => {
  User.find()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => console.log(err));
};

//check:true
module.exports.getUser = (req, res) => {
  console.log(req.params.id);
  User.findById(req.params.id)
    .then((user) => {
      res.json(user);
    })
    .catch((err) => console.log(err));
};

//check:true
module.exports.addUser = async (req, res) => {
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
      role: "user",
    });
    await user.save();
    res.status(200).json({ success: true, message: "Insert Successfully" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

//check:true
module.exports.editUser = async (req, res) => {
  try {
    User.findByIdAndUpdate(
      { _id: req.params.id },
      {
        email: req.body.email,
        username: req.body.username,
        password: await bcrypt.hash(req.body.password, 10),
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
      }
    ).then(() =>
      res.status(200).json({ success: true, message: "Update Successfully" })
    );
  } catch (e) {
    console.log(e);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

//check:true
module.exports.deleteUser = (req, res) => {
  if (req.params.id == null) {
    res.json({
      status: "error",
      message: "cart id should be provided",
    });
  } else {
    User.findByIdAndDelete({ _id: req.params.id })
      .then(() => {
        res.status(200).json({
          status: 200,
          message: "Delete successful",
          success: true,
        });
      })
      .catch((err) => console.log(err));
  }
};
