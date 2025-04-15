"use strict";

const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const EventController = require("../../../controllers/event.controller");

const upload = require("../../../config/multer.config");

router
  .get("/", asyncHandler(EventController.getEvents))
  .get("/test", asyncHandler(EventController.test))
  .get("/current", asyncHandler(EventController.getCurrentEvent))
  .get("/:slug", asyncHandler(EventController.getEventBySlug))

  .post("/", upload.single("thumbnail"), asyncHandler(EventController.createEvent))
  .put("/:id", upload.single("thumbnail"), asyncHandler(EventController.updateEvent))
  .patch("/:id/status", asyncHandler(EventController.changeEventStatus));

// .get("/:slug", asyncHandler(EventController.getEventBySlug));

module.exports = router;
