import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const validateToken = (req, res, next) => {

  const token = req.cookies?.token;

  if (!token || typeof token !== "string") {
    return res.status(401).json({ message: "Token not found" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  }
  catch (error) {
    return res.status(401).json({ message: "Token invalid or expired" });
  }

};

export default validateToken;
