const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");

const SearchLogController = require("../../controller/search_log.service.controller");

router
  .get("/top-search", asyncHandler(SearchLogController.getTopSearch))
  .get("/daily-search-volume", asyncHandler(SearchLogController.getDailySearchVolume))
  .get("/search-success-distribution", asyncHandler(SearchLogController.getSearchSuccessDistribution))
  .get("/no-result-queries", asyncHandler(SearchLogController.getNoResultQueries))
  .get("/", function (req, res, next) {
    res.render("index", { title: "LOG API V1 - Search logs" });
  });

module.exports = router;
