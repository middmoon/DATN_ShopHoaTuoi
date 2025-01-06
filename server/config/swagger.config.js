"use strict";

const YAML = require("yamljs");

const swaggerDocument = YAML.load("./docs/swagger.yaml");

module.exports = swaggerDocument;
