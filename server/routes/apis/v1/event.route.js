"use strict";

const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const EventController = require("../../../controllers/event.controller");

router.get("/", asyncHandler(EventController.getEvents)).post("/", asyncHandler(EventController.createEvent));

module.exports = router;
