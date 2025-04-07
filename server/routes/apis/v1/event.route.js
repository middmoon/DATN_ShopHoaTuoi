"use strict";

const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const EventController = require("../../../controllers/event.controller");

const upload = require("../../../config/multer.config");

router
  .get("/", asyncHandler(EventController.getEvents))
  .get("/current", asyncHandler(EventController.getCurrentEvent))
  .post("/", upload.single("thumbnail"), asyncHandler(EventController.createEvent))
  .patch("/:id/status", asyncHandler(EventController.changeEventStatus))
  .put("/:id", upload.single("thumbnail"), asyncHandler(EventController.updateEvent))
  .get("/:slug", asyncHandler(EventController.getEventBySlug));
// .get("/:slug", asyncHandler(EventController.getEventBySlug));

module.exports = router;
