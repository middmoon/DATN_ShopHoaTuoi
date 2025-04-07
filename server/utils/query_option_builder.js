const { Op } = require("sequelize");
const { ProductCategory, ProductImage } = require("../models");
const slugify = require("slugify");

function buildQueryOptions(query) {
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
          { slug: { [Op.like]: `%${keyword_slug}%` } },
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
    ],
  };

  return queryOptions;
}

async function buildQueryOptions2(query) {
  const { search, q, is_public } = query;

  const whereProductConditions = {};
  let categoryIds = [];

  // --- Tìm kiếm sản phẩm bằng FULLTEXT ---
  const keyword = q || search;
  if (keyword) {
    const keyword_slug = slugify(keyword, { lower: true, strict: true });

    whereProductConditions[Op.and] = [
      Sequelize.literal(`
        MATCH(name, description) AGAINST ('${keyword}*' IN BOOLEAN MODE)
      `),
    ];

    if (is_public !== undefined) {
      whereProductConditions[Op.and].push({ is_public });
    }

    categoryIds = await Category.findAll({
      attributes: ["id"],
      where: {},
      raw: true,
    }).then((categories) => categories.map((c) => c.id));

    if (categoryIds.length === 0) {
      return { where: whereProductConditions };
    }
  }

  const productIds = await ProductCategory.findAll({
    attributes: ["product_id"],
    where: { category_id: { [Op.in]: categoryIds } },
    raw: true,
  }).then((products) => products.map((p) => p.product_id));

  if (productIds.length === 0) {
    return { where: whereProductConditions };
  }

  // 🔥 Truy vấn sản phẩm
  return {
    where: {
      ...whereProductConditions,
      id: { [Op.in]: productIds },
    },
    include: [
      {
        model: ProductCategory,
        attributes: ["_id", "name"],
      },
      {
        model: ProductImage,
        attributes: ["is_avatar", "img_url"],
      },
    ],
  };
}

function buildQueryOptionsForShopOrder(query) {
  const { search, q } = query;

  const whereProductConditions = {};

  const keyword = q || search;

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
          { slug: { [Op.like]: `%${keyword_slug}%` } },
        ],
      },
    ];
  }

  const queryOptions = {
    where: whereProductConditions,
    attributes: ["_id", "name", "retail_price"],
    include: [],
  };

  return queryOptions;
}

module.exports = { buildQueryOptions, buildQueryOptions2, buildQueryOptionsForShopOrder };
