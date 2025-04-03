"use strict";

const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const EventController = require("../../../controllers/event.controller");

const upload = require("../../../config/multer.config");

router
  .get("/", asyncHandler(EventController.getEvents))
  .post("/", upload.single("thumbnail"), asyncHandler(EventController.createEvent))
  .get("/:slug", asyncHandler(EventController.getEventBySlug));

module.exports = router;
