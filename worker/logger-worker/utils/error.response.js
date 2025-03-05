"use strict";

const { ReasonPhrases, StatusCodes, getReasonPhrase, getStatusCode } = require("http-status-codes");

class ErrorResponse extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

class BAD_REQUEST extends ErrorResponse {
  constructor(message = ReasonPhrases.BAD_REQUEST) {
    super(message);
    this.status = StatusCodes.BAD_REQUEST;
  }
}

class UNAUTHORIZED extends ErrorResponse {
  constructor(message = ReasonPhrases.UNAUTHORIZED) {
    super(message);
    this.status = StatusCodes.UNAUTHORIZED;
  }
}

class FORBIDDEN extends ErrorResponse {
  constructor(message = ReasonPhrases.FORBIDDEN) {
    super(message);
    this.status = StatusCodes.FORBIDDEN;
  }
}

class NOTFOUND extends ErrorResponse {
  constructor(message = ReasonPhrases.NOT_FOUND) {
    super(message);
    this.status = StatusCodes.NOT_FOUND;
  }
}

module.exports = { BAD_REQUEST, UNAUTHORIZED, FORBIDDEN, NOTFOUND };
