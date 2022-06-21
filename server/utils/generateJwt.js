const config = require("config");
const jwt = require("jsonwebtoken");

function jwtGenerator(user_id) {
  const payload = {
    user: {
      id: user_id,
    },
  };

  return jwt.sign(payload, config.get("jwtSecret"), {
    expiresIn: "1h",
  });
}

module.exports = jwtGenerator;
