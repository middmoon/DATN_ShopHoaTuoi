"use strict";

const { sequelize, SearchLog } = require("../models");
const { BAD_REQUEST, NOTFOUND } = require("../../server/utils/error.response");
const { Op } = require("sequelize");

class SearchLogService {
  static getSearchLogs = async (query) => {
    const searchLogs = await SearchLog.findAll({
      where: query,
      order: [["createdAt", "DESC"]],
    });

    if (!searchLogs) {
      throw new NOTFOUND("Can not get search logs");
    }

    return searchLogs;
  };

  static getTopSearch = async () => {
    const results = await SearchLog.findAll({
      attributes: [
        "search_query", // nếu đây là chuỗi
        [SearchLog.sequelize.fn("COUNT", SearchLog.sequelize.col("id")), "count"],
      ],
      group: ["search_query"],
      order: [[SearchLog.sequelize.literal("count"), "DESC"]],
      limit: 10,
    });
    return results;
  };

  static getDailySearchVolume = async () => {
    const results = await SearchLog.findAll({
      attributes: [
        [SearchLog.sequelize.fn("DATE", SearchLog.sequelize.col("createdAt")), "date"],
        [SearchLog.sequelize.fn("COUNT", SearchLog.sequelize.col("id")), "total"],
      ],
      group: [SearchLog.sequelize.fn("DATE", SearchLog.sequelize.col("createdAt"))],
      order: [[SearchLog.sequelize.fn("DATE", SearchLog.sequelize.col("createdAt")), "ASC"]],
    });
    return results;
  };

  static getSearchSuccessDistribution = async () => {
    // Đếm các bản ghi có product_results là mảng có độ dài lớn hơn 0 (tìm kiếm thành công)
    const totalSuccess = await SearchLog.count({
      where: SearchLog.sequelize.literal("JSON_LENGTH(product_results) > 0"),
    });

    // Đếm các bản ghi có product_results là mảng rỗng (không có kết quả)
    const totalNoResult = await SearchLog.count({
      where: SearchLog.sequelize.literal("JSON_LENGTH(product_results) = 0"),
    });

    return [
      { label: "Success", total: totalSuccess },
      { label: "No Results", total: totalNoResult },
    ];
  };

  static getNoResultQueries = async () => {
    const results = await SearchLog.findAll({
      attributes: ["search_query", [SearchLog.sequelize.fn("COUNT", SearchLog.sequelize.col("id")), "total"]],
      where: SearchLog.sequelize.literal("JSON_LENGTH(product_results) = 0"),
      group: ["search_query"],
      order: [[SearchLog.sequelize.literal("total"), "DESC"]],
    });

    return results.map((r) => ({
      label: r.get().search_query,
      total: parseInt(r.get().total, 10),
    }));
  };
}

module.exports = SearchLogService;
