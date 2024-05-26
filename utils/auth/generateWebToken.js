/**
 * This function generate JWT
 * @param {Object} payload To generate token, you must provide value in OBJECT format.
 * @param {String} secret You can provide a secret all though it has some default secret provided.
 * @param {Number} expires You can provide a expires timeout in MILLISECONDS all though it has some default expires timeout provided.
 * @returns {String} Return a JWT token
 *
 */

import environment from "@utils/environment";
import jwt from "jsonwebtoken";

const generateWebToken = (
  payload,
  {
    secret = environment.NEXTAUTH_SECRET,
    expires = environment.JWT_EXPIRES_IN,
  } = {}
) => {
  const token = jwt.sign({ ...payload, expire: Date.now() + expires }, secret, {
    expiresIn: expires,
  });

  return token;
};

export default generateWebToken;
