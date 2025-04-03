"use strict";

const slugify = require("slugify");

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Event.belongsToMany(models.Product, {
        through: models.EventProduct,
        foreignKey: "event_id",
        otherKey: "product_id",
      });
    }
  }

  Event.init(
    {
      _id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      slug: {
        type: DataTypes.STRING,
        unique: true,
      },
      discription: {
        type: DataTypes.TEXT,
      },
      start_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      end_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      discount_type: {
        type: DataTypes.ENUM("fixed", "percentage"),
        defaultValue: "fixed",
        allowNull: false,
      },
      discount_value: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      thumbnail: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Event",
      tableName: "events",
      timestamps: true,
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );

  Event.afterCreate(async (event, options) => {
    event.slug = slugify(event.name + " " + event._id, {
      replacement: "-",
      remove: undefined,
      lower: true,
      strict: false,
      locale: "vi",
      trim: true,
    });

    await Event.update(
      { slug: event.slug },
      {
        where: {
          _id: event._id,
        },
        transaction: options.transaction,
      }
    );
  });

  Event.afterUpdate(async (event, options) => {
    if (event.changed("name")) {
      const newSlug = slugify(event.name + " " + event._id, {
        replacement: "-",
        remove: undefined,
        lower: true,
        strict: false,
        locale: "vi",
        trim: true,
      });

      await Event.update(
        { slug: newSlug },
        {
          where: {
            _id: event._id,
          },
          transaction: options.transaction,
        }
      );
    }
  });

  return Event;
};
