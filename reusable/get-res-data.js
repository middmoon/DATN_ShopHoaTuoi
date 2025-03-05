// get response data by assign it in req
const responseLogger = (req, res, next) => {
  const oldSend = res.send;
  res.send = function (body) {
    req.resData = body;
    return oldSend.call(res, body);
  };

  next();
};

const getResData = (req, res, next) => {
  res.on("finish", () => {
    console.log(req.resData);
  });
  next();
};
