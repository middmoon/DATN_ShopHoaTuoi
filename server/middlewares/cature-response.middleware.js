// get response data and attach to req.resData
const getResData = (req, res, next) => {
  const oldSend = res.send;
  res.send = function (body) {
    req.resData = body;
    return oldSend.call(res, body);
  };

  next();
};

// use event.on("finish") to log response data
const loggerResData = (req, res, next) => {
  res.on("finish", () => {
    // do some logic here
    console.log(req.resData);
  });
  next();
};

module.exports = {
  getResData,
  loggerResData,
};
