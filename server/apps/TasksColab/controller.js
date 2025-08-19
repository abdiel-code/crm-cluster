import connection from "../../core/database/connection.js";

// Get group by ID
export const getGroupById = async (req, res) => {
  const { id } = req.params;

  try {
    const [team] = await connection.query(
      "SELECT * FROM teams WHERE id = ?",
      [id]
    );

    if (team.length === 0) {
      return res.status(404).json({ error: "Team not found" });
    }

    return res.status(200).json(team[0]);
  } catch (error) {
    console.error("Error in getGroupById:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
