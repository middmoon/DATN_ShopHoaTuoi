"use strict";

const { sequelize, SearchLog } = require("../models");
const { BAD_REQUEST, NOTFOUND } = require("../../server/utils/error.response");

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
}

module.exports = SearchLogService;
