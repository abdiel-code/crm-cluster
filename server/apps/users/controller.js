import connection from "../../core/database/connection.js";

export function getProfile(req, res) {
  res.json({ user: req.user });
}

export function updateProfile(req, res) {
  const { name, email } = req.body;
  const userID = req.user.id;

  if (!name || !email) {
    return res.status(400).json({ message: "Name and email are required" });
  }

  connection.query("UPDATE users SET name = ?, email = ? WHERE id = ?", [name, email, userID],
    (err, result) => {
      if (err) return res.status(500).json({ message: "Error updating user" });
      res.json({ message: "User updated successfully" });
    }
  );

}

export function deleteProfile(req, res) {
  res.json({ user: req.user });
}
