"use strict";

const { sequelize, Event, EventProduct, Product } = require("../models");
const { NOTFOUND, BAD_REQUEST, CONFLICT } = require("../utils/error.response");
const cloudinary = require("../config/cloudinary.config");
const { compressImage } = require("../utils/compress_iamge");
const fs = require("fs");

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
    const events = await Event.findAll({});

    if (!events || events.length === 0) {
      throw new NOTFOUND("Can not find events");
    }

    // events.forEach((event) => {
    //   event.Products.forEach((product) => {
    //     product.dataValues.sale_price = this.calculateDiscount(event.discount_type, event.discount_value, product.retail_price);
    //   });
    // });

    return events;
  }

  static async getCurrentEvent() {
    const currentEvent = await Event.findOne({
      attributes: ["_id", "slug", "thumbnail"],
      where: { is_active: true },
    });

    if (!currentEvent && currentEvent !== null) {
      throw new NOTFOUND("Can not find current event");
    }

    return currentEvent;
  }

  static calculateDiscount(discount_type, discount_value, product_retail_price) {
    switch (discount_type) {
      case "fixed":
        return product_retail_price - discount_value;
      case "percentage":
        return product_retail_price * (1 - discount_value / 100);
      default:
        return product_price;
    }
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

    event.Products.forEach((product) => {
      product.dataValues.sale_price = this.calculateDiscount(event.discount_type, event.discount_value, product.retail_price);
    });

    if (!event) {
      throw new NOTFOUND("Can not find event by slug");
    }

    return event;
  }

  static async updateEventStatus(eventId, is_active, force = false) {
    if (is_active == true && !force) {
      const currentEvent = await Event.findOne({
        attributes: ["_id", "name"],
        where: { is_active: true },
      });

      if (currentEvent && currentEvent._id === eventId) {
      } else if (currentEvent) {
        throw new CONFLICT("There is an active event, please deactivate first.");
      }
    }

    try {
      const result = await sequelize.transaction(async (t) => {
        let foundEvent = await Event.findByPk(eventId, { transaction: t });

        if (!foundEvent) {
          throw new NOTFOUND("Can not find event");
        }

        if (is_active && force) {
          const currentEvent = await Event.findOne({
            attributes: ["_id", "name"],
            where: { is_active: true },
            transaction: t,
          });

          if (currentEvent && currentEvent._id !== eventId) {
            const deactivated = await currentEvent.update({ is_active: false }, { transaction: t });

            if (!deactivated) {
              throw new BAD_REQUEST("Can not deactivate event");
            }
          }
        }

        const updatedEvent = await foundEvent.update({ is_active: is_active }, { transaction: t });

        if (!updatedEvent) {
          throw new BAD_REQUEST("Can not update event");
        }

        return updatedEvent;
      });

      return result;
    } catch (error) {
      throw error;
    }
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
      const fileBuffer = fs.readFileSync(imageFile.path);

      const compressedBuffer = await compressImage(fileBuffer);

      const result = await this.streamUpload(compressedBuffer);
      return result.url;
    } catch (error) {
      console.error("Cloudinary Upload Error:", error);
      throw new Error("Error uploading image to Cloudinary.");
    }
  }

  static async streamUpload(buffer) {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "event_images",
          use_filename: true,
          unique_filename: true,
        },
        (error, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        }
      );
      stream.end(buffer);
    });
  }
}

module.exports = EventService;
