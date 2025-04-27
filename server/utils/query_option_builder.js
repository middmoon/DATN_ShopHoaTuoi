const { Op, Sequelize } = require("sequelize");
const { ProductCategory, ProductImage, Event, ProductCategoryMapping } = require("../models");
const slugify = require("slugify");

async function buildQueryOptions(query) {
  const { search, q, is_public } = query;

  const whereProductConditions = {};
  const whereCategoryConditions = {};

  const keyword = q || search;

  if (!is_public) {
    whereProductConditions[Op.and] = whereProductConditions[Op.and] || [];
    whereProductConditions[Op.and].push({ is_public: true });
  }

  if (keyword) {
    const keyword_slug = slugify(keyword, {
      replacement: "-",
      remove: undefined,
      lower: true,
      strict: false,
      locale: "vi",
      trim: true,
    });

    whereProductConditions[Op.and] = [
      {
        [Op.or]: [
          { name: { [Op.like]: `%${keyword}%` } },
          { description: { [Op.like]: `%${keyword}%` } },
          // { slug: { [Op.like]: `%${keyword_slug}%` } },
        ],
      },
    ];

    whereCategoryConditions[Op.or] = [{ name: { [Op.like]: `%${keyword}%` } }];
  }

  const queryOptions = {
    where: whereProductConditions,
    include: [
      {
        model: ProductCategory,
        attributes: ["_id", "name"],
        through: {
          attributes: [],
        },
        where: whereCategoryConditions,
      },
      {
        model: ProductImage,
        attributes: ["is_avatar", "img_url"],
      },
      {
        model: Event,
        attributes: ["_id", "discount_type", "discount_value"],
        where: { is_active: true },
        through: {
          attributes: [],
        },
        required: false,
      },
    ],
  };

  return queryOptions;
}

async function buildQueryOptions2(query) {
  const { search, q, is_public } = query;

  const whereProductConditions = {};
  const whereCategoryConditions = {};
  const replacements = {};

  const keyword = q || search;

  if (keyword) {
    whereProductConditions[Op.and] = [Sequelize.literal(`MATCH(Product.name, Product.description) AGAINST (:keyword IN BOOLEAN MODE)`)];
    replacements.keyword = keyword;

    if (is_public !== undefined) {
      whereProductConditions[Op.and].push({ is_public });
    }

    whereCategoryConditions[Op.or] = [{ name: { [Op.like]: `%${keyword}%` } }];
  } else {
    if (is_public !== undefined) {
      whereProductConditions.is_public = is_public;
    }
  }

  const queryOptions = {
    where: whereProductConditions,
    include: [
      {
        model: ProductCategory,
        attributes: ["_id", "name"],
        through: {
          attributes: [],
        },
        where: whereCategoryConditions,
        required: false,
      },
      {
        model: ProductImage,
        attributes: ["is_avatar", "img_url"],
      },
      {
        model: Event,
        attributes: ["_id", "discount_type", "discount_value"],
        where: { is_active: true },
        through: {
          attributes: [],
        },
        required: false,
      },
    ],
    replacements,
  };

  return queryOptions;
}

async function buildQueryOptionsForShopOrder(query) {
  const { search, q, is_public } = query;

  const whereProductConditions = {};
  const whereCategoryConditions = {};
  const replacements = {};

  const keyword = q || search;

  if (keyword) {
    whereProductConditions[Op.and] = [Sequelize.literal(`MATCH(Product.name, Product.description) AGAINST (:keyword IN BOOLEAN MODE)`)];
    replacements.keyword = keyword;

    if (is_public !== undefined) {
      whereProductConditions[Op.and].push({ is_public });
    }

    whereCategoryConditions[Op.or] = [{ name: { [Op.like]: `%${keyword}%` } }];
  } else {
    if (is_public !== undefined) {
      whereProductConditions.is_public = is_public;
    }
  }

  const queryOptions = {
    where: whereProductConditions,
    include: [
      {
        model: Event,
        attributes: ["_id", "discount_type", "discount_value"],
        where: { is_active: true },
        through: {
          attributes: [],
        },
        required: false,
      },
    ],
    replacements,
  };

  return queryOptions;
}

module.exports = { buildQueryOptions, buildQueryOptions2, buildQueryOptionsForShopOrder };
