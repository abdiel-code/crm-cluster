import connection from "../../core/database/connection.js";
import jwt from "jsonwebtoken";
import envData from "../../core/config/envData.js";

const JWT_SECRET = envData.jwt.secret;

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
