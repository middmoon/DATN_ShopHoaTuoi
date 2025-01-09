"use strict";

const express = require("express");
const router = express.Router();

router.use("/api/v1", require("./apis/v1"));

router.get("/", function (req, res, next) {
  res.render("index", { title: "TMDT CTK45A" });
});

router.post("/testPost", function (req, res, next) {
  res.send(req.body);
});

module.exports = router;
