"use strict";

const express = require("express");
const router = express.Router();
const { checkRole } = require("../middlewares/auth.middleware");

router.use("/api/v1", require("./apis/v1"));

router.get("/test", checkRole(["owner"]), function (req, res, next) {
  res.status(200).json({ message: "Test get OK", data: { name: "TMDT CTK45A", header: req.headers } });
});

router.post("/test", function (req, res, next) {
  console.log(req.body);

  res.status(200).json({ message: "Test post OK", data: req.body });
});

router.get("/", function (req, res, next) {
  res.render("index", { title: "TMDT CTK45A" });
});

module.exports = router;
