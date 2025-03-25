const { Op } = require("sequelize");
const { ProductCategory, ProductImage } = require("../models");
const slugify = require("slugify");

function buildQueryOptions(query) {
  const {
    search,
    q,
    is_public,

    ///////////////

    // categories,
    // "price-range": priceRange,
    // // brand,
    // availability,
    // attributes,
    // // location,
    // // rating,
    // discount,
    // // seller,
    // // shipping,
    // sortBy,
    // page,
    // limit,
  } = query;

  // Điều kiện where cho bảng Product
  const whereProductConditions = {};
  const whereCategoryConditions = {};

  // --- Tìm kiếm cơ bản ---
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

    if (is_public !== undefined) {
      whereProductConditions[Op.and] = whereProductConditions[Op.and] || [];
      whereProductConditions[Op.and].push({ is_public });
    }

    whereCategoryConditions[Op.or] = [{ name: { [Op.like]: `%${keyword}%` } }];
  }

  // if (categories) {
  //   const categoryList = Array.isArray(categories)
  //     ? categories
  //     : categories.includes(",")
  //     ? categories.split(",").map((c) => c.trim())
  //     : [categories];

  //   // Nếu đã có điều kiện từ `keyword`, kết hợp `Op.and`
  //   if (whereCategoryConditions[Op.or]) {
  //     whereCategoryConditions[Op.and] = [
  //       whereCategoryConditions, // Giữ điều kiện tìm theo `keyword`
  //       { name: { [Op.in]: categoryList } }, // Thêm điều kiện danh mục
  //     ];
  //   } else {
  //     whereCategoryConditions.name = { [Op.in]: categoryList };
  //   }
  // }

  // //#region Chức năng lọc
  // // --- Lọc theo khoảng giá ---
  // if (priceRange) {
  //   const [minPrice, maxPrice] = priceRange.split("-").map(Number);
  //   if (!isNaN(minPrice) && !isNaN(maxPrice)) {
  //     whereConditions.price = { [Op.between]: [minPrice, maxPrice] };
  //   }
  // }

  // // // --- Lọc theo thương hiệu ---
  // // if (brand) {
  // //   whereConditions.brand = brand;
  // // }

  // // --- Lọc theo tình trạng hàng ---
  // if (availability) {
  //   whereConditions.availability = availability;
  // }

  // // // --- Lọc theo đánh giá ---
  // // if (rating) {
  // //   whereConditions.rating = { [Op.gte]: Number(rating) };
  // // }

  // // --- Lọc theo discount ---
  // if (discount) {
  //   if (discount === "true") {
  //     whereConditions.discount = { [Op.gt]: 0 };
  //   } else if (discount.startsWith("min-discount=")) {
  //     const minDiscount = parseFloat(discount.split("=")[1]);
  //     if (!isNaN(minDiscount)) {
  //       whereConditions.discount = { [Op.gte]: minDiscount };
  //     }
  //   }
  // }

  // // // --- Lọc theo seller ---
  // // if (seller) {
  // //   if (seller.startsWith("seller-id=")) {
  // //     const sellerId = seller.split("=")[1];
  // //     whereConditions.sellerId = sellerId;
  // //   } else {
  // //     whereConditions.sellerType = seller;
  // //   }
  // // }

  // // // --- Lọc theo shipping ---
  // // if (shipping) {
  // //   whereConditions.shipping = shipping;
  // // }

  // // // --- Lọc theo location ---
  // // if (location) {
  // //   whereConditions.location = location;
  // // }

  // // --- Lọc theo attributes (nâng cao) ---
  // let attributeConditions = null;
  // if (attributes) {
  //   // Giả sử attributes gửi vào dạng chuỗi "color=red,size=M"
  //   attributeConditions = attributes.split(",").map((pair) => {
  //     const [key, value] = pair.split("=");
  //     return { attributeName: key.trim(), attributeValue: value.trim() };
  //   });
  // }

  //#endregion

  //
  ///
  //
  //
  //
  //
  // --- Sắp xếp ---

  // let orderCondition = [];
  // if (sortBy) {
  //   switch (sortBy) {
  //     case "priceAsc":
  //       orderCondition.push(["price", "ASC"]);
  //       break;
  //     case "priceDesc":
  //       orderCondition.push(["price", "DESC"]);
  //       break;
  //     case "newest":
  //       orderCondition.push(["createdAt", "DESC"]);
  //       break;
  //     // case "popularity":
  //     //   orderCondition.push(["popularity", "DESC"]);
  //     //   break;
  //     // case "rating":
  //     //   orderCondition.push(["rating", "DESC"]);
  //     //   break;
  //     default:
  //       orderCondition.push(["createdAt", "DESC"]);
  //   }
  // } else {
  //   orderCondition.push(["createdAt", "DESC"]);
  // }

  // // --- Phân trang ---
  // const currentPage = page ? parseInt(page) : 1;
  // const perPage = limit ? parseInt(limit) : 15;
  // const offset = (currentPage - 1) * perPage;

  // --- Xây dựng queryOptions ---
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
      // // Include ProductAttribute nếu có lọc theo attributes
      // ...(attributeConditions
      //   ? [
      //       {
      //         model: ProductAttribute, // Giả sử bạn có model này
      //         attributes: ["attributeName", "attributeValue"],
      //         where: { [Op.and]: attributeConditions },
      //       },
      //     ]
      //   : []),
    ],
    // order: orderCondition,
    // offset: offset,
    // limit: perPage,
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

    // 🔹 Truy vấn danh mục trước để tận dụng INDEX trên categories.name
    categoryIds = await Category.findAll({
      attributes: ["id"],
      where: {
        name: { [Op.in]: keyword.split(" ") }, // Tách từ khóa để tìm danh mục liên quan
      },
      raw: true,
    }).then((categories) => categories.map((c) => c.id));

    if (categoryIds.length === 0) {
      return { where: whereProductConditions }; // Không có category thì không cần lọc
    }
  }

  // 🔹 Truy vấn product_id trước để tối ưu INDEX trên product_categories.category_id
  const productIds = await ProductCategory.findAll({
    attributes: ["product_id"],
    where: { category_id: { [Op.in]: categoryIds } },
    raw: true,
  }).then((products) => products.map((p) => p.product_id));

  if (productIds.length === 0) {
    return { where: whereProductConditions }; // Không có sản phẩm phù hợp category
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
        attributes: ["_id", "name"], // 🔹 Giữ lại thông tin category
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
