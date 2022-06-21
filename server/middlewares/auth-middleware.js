const config = require("config");
const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("jwt_token");

  if (!token) {
    return res.status(403).json({ message: "Неавторизован" });
  }

  try {
    const verify = jwt.verify(
      token,
      process.env.jwtSecret || config.get("jwtSecret")
    );
    req.user = verify.user;
    next();
  } catch (err) {
    res.status(401).json({ message: "Некорректный токен авторизации" });
  }
};
