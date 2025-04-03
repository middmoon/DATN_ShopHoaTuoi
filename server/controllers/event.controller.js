"use strict";

const { OK, CREATED } = require("../utils/success.response");

const EventService = require("../services/event.service");

class EventController {
  static createEvent = async (req, res) => {
    const { selected_products, ...newOrder } = JSON.parse(req.body.data);

    console.log("selected_products:", selected_products);
    console.log("newOrder:", newOrder);

    console.log(req.file);

    res.status(200).json({ message: "Test post OK", data: req.body });

    // new CREATED({
    //   message: "Event created successfully",
    //   data: await EventService.createEvent(req.body, req.file),
    // }).send(res);
  };

  static getEvents = async (req, res) => {
    new OK({
      message: "Events retrieved successfully",
      data: await EventService.getEvents(),
    }).send(res);
  };
}

module.exports = EventController;
