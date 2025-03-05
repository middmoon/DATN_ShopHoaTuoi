var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  res.render("index", { title: "LOG API V1 - Audit logs" });
});

module.exports = router;
