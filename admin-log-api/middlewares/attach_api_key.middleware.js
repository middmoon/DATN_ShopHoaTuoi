require("dotenv").config();

const attachApiKey = (req, res, next) => {
  const apiKey = process.env.X_API_KEY;
  if (apiKey) {
    req.headers["x-api-key"] = apiKey;
  }
  next();
};

module.exports = attachApiKey;
