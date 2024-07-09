const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");

// Get all Users sauf name="admin"
router.get("/users", async (req, res) => {
  try {
    const allUsers = await pool.query("SELECT * FROM users WHERE user_name != 'admin'");
    res.json(allUsers.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
// supprimer un utilisateur
router.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteUser = await pool.query("DELETE FROM users WHERE user_id = $1", [id]);

    res.json("User was deleted");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Fonction pour modifier un utilisateur
router.put("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updateUser = await pool.query("UPDATE users SET user_name = $1 WHERE user_id = $2", [name, id]);

    res.json("User was updated");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Function to get user and maisons
const getUserAndMaisons = async (userId) => {
  const query = `
    SELECT u.user_name, t.maison_id, t.description, t.address 
    FROM users AS u 
    LEFT JOIN maisons AS t ON u.user_id = t.user_id 
    WHERE u.user_id = $1
  `;
  const { rows } = await pool.query(query, [userId]);
  return rows;
};

// Get user's maisons
router.get("/", authorization, async (req, res) => {
  try {
    const userId = req.user; // Directly use req.user
    console.log("User ID from authorization middleware:", userId);

    const userMaison = await getUserAndMaisons(userId);
    console.log("Query result:", userMaison);

    if (userMaison.length === 0) {
      console.log("No data found for user ID:", userId);
    }

    res.json(userMaison);
  } catch (err) {
    console.error("Error executing query:", err.message);
    res.status(500).send("Server error");
  }
});

// Create a new maison
router.post("/maisons", authorization, async (req, res) => {
  try {
    const { description, address } = req.body;
    const newMaison = await pool.query(
      "INSERT INTO maisons (user_id, description, address) VALUES ($1, $2, $3) RETURNING *",
      [req.user, description, address]
    );

    res.json(newMaison.rows[0]);
  } catch (err) {
    console.error("Error executing query:", err.message);
    res.status(500).send("Server error");
  }
});

// Update a maison
router.put("/maisons/:id", authorization, async (req, res) => {
  try {
    const { id } = req.params;
    const { description, address } = req.body; // Get description and address from request body
    const updateMaison = await pool.query(
      "UPDATE maisons SET description = $1, address = $2 WHERE maison_id = $3 AND user_id = $4 RETURNING *",
      [description, address, id, req.user] // Pass description, address, id, and req.user as parameters
    );

    if (updateMaison.rows.length === 0) {
      return res.status(404).json("This maison is not yours or does not exist");
    }

    res.json("Maison was updated");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Delete a maison
router.delete("/maisons/:id", authorization, async (req, res) => {
  try {
    const { id } = req.params;
    const deleteMaison = await pool.query(
      "DELETE FROM maisons WHERE maison_id = $1 AND user_id = $2 RETURNING *",
      [id, req.user]
    );

    if (deleteMaison.rows.length === 0) {
      return res.json("This Maison is not yours");
    }

    res.json("Maison was deleted");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
