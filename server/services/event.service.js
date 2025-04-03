"use strict";

const { sequelize, Event, EventProduct } = require("../models");
const { NOTFOUND, BAD_REQUEST } = require("../utils/error.response");

const cloudinary = require("../config/cloudinary.config");

class EventService {
  static async createEvent(payload, imageFile) {
    const { selected_products, ...eventInfo } = JSON.parse(payload);

    try {
      const result = await sequelize.transaction(async (t) => {
        const newEvent = await Event.create(eventInfo, { transaction: t });
        let count;

        if (!newEvent) {
          throw new BAD_REQUEST("Can not create event");
        }

        const eventProducts = selected_products.map((p) => {
          return { product_id: p._id, event_id: newEvent._id };
        });

        count = await EventProduct.bulkCreate(eventProducts, { transaction: t });

        if (!count || count.length !== selected_products.length) {
          throw new BAD_REQUEST("Can not create event products");
        }

        if (imageFile) {
          const uploadedUrl = await this.uploadImageToCloudinary(imageFile);
          count = await newEvent.update({ thumbnail: uploadedUrl }, { transaction: t });
        }

        if (!count) {
          throw new BAD_REQUEST("Can not update event");
        }

        return newEvent;
      });
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async getEvents() {
    const events = await Event.findAll({
      include: [
        {
          model: Product,
          attributes: ["_id", "name", "retail_price"],
          through: {
            attributes: [],
          },
        },
      ],
    });

    if (!events) {
      throw new NOTFOUND("Can not find events");
    }

    return events;
  }

  static async getEventBySlug(slug) {
    const event = await Event.findOne({
      where: { slug: slug },
      include: [
        {
          model: Product,
          attributes: ["_id", "name", "retail_price"],
          through: {
            attributes: [],
          },
        },
      ],
    });

    if (!event) {
      throw new NOTFOUND("Can not find event by slug");
    }

    return event;
  }

  static async updateEvent(eventId, payload) {
    try {
      const result = await sequelize.transaction(async (t) => {
        let foundEvent = await Event.findByPk(eventId, { transaction: t });

        if (!foundEvent) {
          throw new NOTFOUND("Can not find event by id");
        }

        const count = await foundEvent.update(payload, {
          transaction: t,
        });

        if (!count) {
          throw new BAD_REQUEST("Can not update event");
        }

        return foundEvent;
      });

      return result;
    } catch (error) {
      throw error;
    }
  }

  static async uploadImageToCloudinary(imageFile) {
    try {
      const result = await cloudinary.uploader.upload(imageFile.path, {
        folder: "event_images",
        use_filename: true,
        unique_filename: false,
      });
      return result.url;
    } catch (error) {
      throw new Error("Error uploading image to Cloudinary.");
    }
  }
}

module.exports = EventService;
