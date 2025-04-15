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

  static getTopSearch = async (req, res) => {
    new OK({
      message: "get search logs successfully",
      data: await SearchLogService.getTopSearch(),
    }).send(res);
  };

  static getDailySearchVolume = async (req, res) => {
    new OK({
      message: "get search logs successfully",
      data: await SearchLogService.getDailySearchVolume(),
    }).send(res);
  };

  static getSearchSuccessDistribution = async (req, res) => {
    new OK({
      message: "get search logs successfully",
      data: await SearchLogService.getSearchSuccessDistribution(),
    }).send(res);
  };

  static getNoResultQueries = async (req, res) => {
    new OK({
      message: "get search logs successfully",
      data: await SearchLogService.getNoResultQueries(),
    }).send(res);
  };
}

module.exports = SearchLogServiceController;
