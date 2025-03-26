"use strict";

const SearchLogService = require("../services/search_log.service");
const { OK, CREATED } = require("../utils/success.response");

class SearchLogServiceController {
  //   static getSearchLogs = async (req, res) => {
  //     new OK({
  //       message: "get search logs successfully",
  //       data: await SearchLogService.getSearchLogs(req.query),
  //     }).send(res);
  //   };
}

module.exports = SearchLogServiceController;
