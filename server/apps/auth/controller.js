import bcrypt from "bcrypt";
import { findByEmail, createUser, generateToken } from "./service.js";

export const registerController = async (req, res) => {
  const { name, email, password } = req.body;

  try {

    if (!email || !password || !name) {
      return res.status(400).json({
        message: "Name, email and password are required",
      });
    }

    const user = await findByEmail(email);

    if (user.length > 0) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await createUser(name, email, hashedPassword);

    return res.status(201).json({
      message: "User created successfully",
    });


  } catch (error) {
    console.log("Register error:", error);
    return res.status(500).json({
      message: "Internal server error. Please try again later",

    });
  }

};

export const loginController = async (req, res) => {
  const { email, password } = req.body;

  try {

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const user = await findByEmail(email);

    if (user.length === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user[0].password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid password",
      });
    }

    const token = generateToken({ id: user[0].id, email: user[0].email, name: user[0].name, role: user[0].role });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "Lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "Login successful",
      user: {
        id: user[0].id,
        name: user[0].name,
        email: user[0].email,
      },
    }
    );

  } catch (error) {

    console.log("Login error:", error);
    return res.status(500).json({
      message: "Internal server error. Please try again later",
    });
  }
}
