var express = require("express");
var router = express.Router();

router.use("/audit-logs", require("./audit_log.route"));
router.use("/search-logs", require("./search_log.route"));

router.get("/", function (req, res, next) {
  res.render("index", { title: "LOG API V1" });
});

module.exports = router;
