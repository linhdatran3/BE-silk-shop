module.exports.indexPage = (req, res) => {
  res.json("Welcome to silk shop!");
  if (err) {
    res.json("Welcome to silk shop!");
  }
};

module.exports.docsPage = (req, res) => {
  res.render("home/docs");
};
