var express = require("express");
var router = express.Router();

router.use("/api/v1", require("./v1"));

router.get("/", function (req, res, next) {
  res.render("index", { title: "LOG API" });
});

module.exports = router;
