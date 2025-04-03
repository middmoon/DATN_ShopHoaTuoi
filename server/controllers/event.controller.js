"use strict";

const { OK, CREATED } = require("../utils/success.response");

const EventService = require("../services/event.service");

class EventController {
  static createEvent = async (req, res) => {
    // const { selected_products, ...eventInfo } = JSON.parse(req.body.data);

    // console.log("selected_products:", selected_products);
    // console.log("newOrder:", eventInfo);

    // console.log(req.file);

    // res.status(200).json({ message: "Test post OK", data: req.body });

    new CREATED({
      message: "Event created successfully",
      data: await EventService.createEvent(req.body.data, req.file),
    }).send(res);
  };

  static getEvents = async (req, res) => {
    new OK({
      message: "Events retrieved successfully",
      data: await EventService.getEvents(),
    }).send(res);
  };

  static getEventBySlug = async (req, res) => {
    new OK({
      message: "Event retrieved successfully",
      data: await EventService.getEventBySlug(req.params.slug),
    }).send(res);
  };
}

module.exports = EventController;
