var express = require("express");
var router = express.Router();

router.use("/audit-logs", require("./audit-logs"));
router.use("/search-logs", require("./search-logs"));

router.get("/", function (req, res, next) {
  res.render("index", { title: "LOG API V1" });
});

module.exports = router;
