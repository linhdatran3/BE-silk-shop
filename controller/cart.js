const Cart = require("../model/cart");
const { check } = require("./auth");

//check:true
module.exports.getAllCarts = async (req, res, next) => {
  // check(req, res, next);
  try {
    await Cart.find().then((carts) =>
      res.status(200).json({ success: true, carts })
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "error" });
  }
};

//check:true
module.exports.getCartsbyUserid = async (req, res, next) => {
  // check(req, res, next);
  try {
    Cart.findOne({ userId: req.params.userid }).then((cart) =>
      res.status(200).json({ success: true, cart })
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "error" });
  }
};

//check:true
module.exports.getSingleCart = async (req, res, next) => {
  // check(req, res, next);
  try {
    Cart.findById({ _id: req.params.id }).then((cart) =>
      res.status(200).json({ success: true, cart })
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "error" });
  }
};

//check: true
module.exports.addCart = (req, res, next) => {
  // check(req, res, next);
  //check();

  // {
  //   "userId":"61c01c79be9e9d0e68af6284",
  //   "products":[{
  //       "productId":"61bf35b82420b2172ce1200a",
  //       "quantity":"6"

  //   },
  //   {
  //       "productId":"61bf325aafd3e10cd0059810",
  //       "quantity":"9"

  //   }]

  // }
  if (typeof req.body == undefined) {
    res.json({
      status: 400,
      message: "data is undefined",
    });
  } else {
    const cart = new Cart({
      userId: req.body.userId,
      products: req.body.products,
    });
    cart
      .save()
      .then((cart) => res.json(cart))
      .catch((err) => console.log(err));
  }
};

//check:true
module.exports.editCart = (req, res, next) => {
  // check(req, res, next);
  if (typeof req.body == undefined || req.params.id == null) {
    res.json({
      status: 400,
      message: "something went wrong! check your sent data",
    });
  } else {
    Cart.findByIdAndUpdate(
      { _id: req.params.id },
      {
        userId: req.body.userId,
        products: req.body.products,
      }
    ).then(() => res.status(200).json({ message: "edit successful" }));
  }
};

//check:true
module.exports.deleteCart = (req, res, next) => {
  // check(req, res, next);
  if (req.params.id == null) {
    res.json({
      status: "error",
      message: "cart id should be provided",
    });
  } else {
    Cart.findByIdAndDelete({ _id: req.params.id })
      .then(() => {
        res.status(200).json({ message: "delete completed" });
      })
      .catch((err) => res.status(200).json({ message: "Not found" }));
  }
};
