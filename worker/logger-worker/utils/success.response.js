"use strict";

const { ReasonPhrases, StatusCodes, getReasonPhrase, getStatusCode } = require("http-status-codes");

class SuccessResponse {
  constructor({ message, data }) {
    this.status = null;
    this.message = message || getReasonPhrase(this.status);
    this.data = data || null;
  }

  send(res) {
    return res.status(this.status).json(this);
  }
}

class OK extends SuccessResponse {
  constructor({ message, data }) {
    super({ message, data });
    this.status = StatusCodes.OK;
  }
}

class CREATED extends SuccessResponse {
  constructor({ message, data }) {
    super({ message, data });
    this.status = StatusCodes.CREATED;
  }
}

module.exports = { CREATED, OK };
