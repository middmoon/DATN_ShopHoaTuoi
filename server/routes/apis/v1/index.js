"use strict";

const express = require("express");
const router = express.Router();

router.use("/auth", require("./auth.route"));
router.use("/address", require("./address.route"));
router.use("/product", require("./product.route"));
router.use("/product-categories", require("./product_category.route"));
router.use("/inventory", require("./inventory.route"));
router.use("/order", require("./order.route"));
router.use("/payment", require("./payment"));
router.use("/business", require("./business.route"));
router.use("/evnet", require("./event.route"));

router.get("/", (req, res) => {
  res.send("TEST API V1");
});

const upload = require("../../../config/multer.config");

router.post("/test", upload.single("thumbnail"), function (req, res, next) {
  const { selected_products, ...newOrder } = JSON.parse(req.body.data);

  console.log("selected_products:", selected_products);
  console.log("newOrder:", newOrder);

  console.log(req.file);

  res.status(200).json({ message: "Test post OK", data: req.body });
});

router.post("/test2", function (req, res, next) {
  console.log("Body:", req.body);

  res.status(201).json({ message: "Test post OK", data: req.body });
});

router.patch("/test2/:id/status", function (req, res, next) {
  console.log("Body:", req.body);
  console.log("Order id:", req.params.id);

  res.status(200).json({ message: "Test post OK", data: req.body });
});

router.patch("/test", upload.any("images"), async function (req, res, next) {
  const { data } = req.body;
  const parsedData = JSON.parse(data);

  console.log("Received JSON Payload:", parsedData);
  console.log("Received Files:", req.files);

  res.status(200).json({ message: "Test patch OK", data: req.body });
});

module.exports = router;
