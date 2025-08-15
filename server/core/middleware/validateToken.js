import jwt from "jsonwebtoken";
import envData from "../../core/config/envData.js";

const secret = envData.jwt.secret;

const validateToken = (req, res, next) => {

  const token = req.cookies?.token;

  if (!token || typeof token !== "string") {
    return res.status(401).json({ message: "Token not found" });
  }

  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  }
  catch (error) {
    return res.status(401).json({ message: "Token invalid or expired" });
  }

};

export default validateToken;
