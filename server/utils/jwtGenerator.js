const jw = require("jsonwebtoken");
require("dotenv").config();

function jwtGenerator(user_id) {
  const payload = {
    user: user_id
  };

  return jw.sign(payload, process.env.jwtSecret, { expiresIn: "1hr" });
}
module.exports = jwtGenerator;