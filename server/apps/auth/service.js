import connection from "../../core/database/connection.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export async function findByEmail(email) {
  const [user] = await connection.query("SELECT * FROM users WHERE email = ?", [email]);
  return user;
}

export async function createUser(name, email, hashedPassword) {
  await connection.query(
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
    [name, email, hashedPassword]
  );

}

export function generateToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
}
