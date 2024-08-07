const router = require("express").Router();
const { Router } = require("express");
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
// Route DELETE pour supprimer un utilisateur et ses maisons associées
router.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    
    // Vérifiez que l'utilisateur existe
    const userResult = await pool.query("SELECT * FROM users WHERE user_id = $1", [id]);
    if (userResult.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    // Supprimez l'utilisateur (cela supprimera aussi les maisons associées grâce à ON DELETE CASCADE)
    await pool.query("DELETE FROM users WHERE user_id = $1", [id]);
    
    res.status(200).json({ message: "User and associated houses deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error.message);
    res.status(500).json({ message: "Failed to delete user and associated houses" });
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

// CREATE A DEVICE 

// CREATE TABLE devices(
//   device_id SERIAL,
//   maison_id Int,
//   name VARCHAR(255) NOT NULL,
//   type VARCHAR(255) NOT NULL,
//   status BOOLEAN NOT NULL,
//   values VARCHAR(255) ,
//   mode VARCHAR(255) ,
//   PRIMARY KEY (device_id),
//   FOREIGN KEY (maison_id) REFERENCES maisons(maison_id) ON DELETE CASCADE
// );
// CREATE A DEVICE 


router.post("/devices/:maison_id", authorization, async (req, res) => {
  try {
    const { maison_id } = req.params;
    const { name, type, status, values, mode } = req.body;
    const newDevice = await pool.query(
      "INSERT INTO devices (maison_id, name, type, status, values, mode) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [maison_id, name, type, status, values, mode]
    );

    res.json(newDevice.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// UPDATE A DEVICE
router.put("/devices/:id", authorization, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, type, status, values, mode } = req.body;
    const updateDevice = await pool.query(
      "UPDATE devices SET name = $1, type = $2, status = $3, values = $4, mode = $5 WHERE device_id = $6 RETURNING *",
      [name, type, status, values, mode, id]
    );

    if (updateDevice.rows.length === 0) {
      return res.json("This device does not exist");
    }

    res.json("Device was updated");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// DELETE A DEVICE
router.delete("/devices/:id", authorization, async (req, res) => {
  try {
    const { id } = req.params;
    const deleteDevice = await pool.query(
      "DELETE FROM devices WHERE device_id = $1 RETURNING *",
      [id]
    );

    if (deleteDevice.rows.length === 0) {
      return res.json("This device does not exist");
    }

    res.json("Device was deleted");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
// Get all devices for a maison
router.get("/devices/:maison_id", authorization, async (req, res) => {
  try {
    const { maison_id } = req.params;
    const allDevices = await pool.query("SELECT * FROM devices WHERE maison_id = $1", [maison_id]);
    console.log('All devices:', allDevices.rows); // Debugging log
    res.json(allDevices.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});



// Update device status
router.put('/dashboard/devices/:device_id/status', async (req, res) => {
  try {
    const deviceId = req.params.device_id;
    const newStatus = req.body.status;

    // Update the device status
    const result = await pool.query(
      'UPDATE devices SET status = $1 WHERE device_id = $2 RETURNING *',
      [newStatus, deviceId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Device not found' });
    }

    // Return the updated device
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating status:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
 
// Update device mode
router.put('/dashboard/devices/:device_id/mode', async (req, res) => {
  try {
    const deviceId = req.params.device_id;
    const newMode = req.body.mode;

    // Update the device mode
    const result = await pool.query(
      'UPDATE devices SET mode = $1 WHERE device_id = $2 RETURNING *',
      [newMode, deviceId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Device not found' });
    }

    // Return the updated device
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating mode:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



// get description of the house
router.get("/house/:maison_id", async (req, res) => {
  try {
    const { maison_id } = req.params;
    const house = await pool.query("SELECT description FROM maisons WHERE maison_id = $1", [maison_id]);
    res.json(house.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});


// Endpoint to update device values
router.put('/dashboard/devices/:device_id/values', async (req, res) => {
  const { device_id } = req.params;
  const { value } = req.body;

  if (!value) {
    return res.status(400).json({ error: 'New value is required' });
  }

  try {
    // Insert the new value into sensor_values
    const result = await pool.query(
      'INSERT INTO sensor_values (device_id, value) VALUES ($1, $2) RETURNING *',
      [device_id, value]
    );

    res.status(200).json({ message: 'Value added successfully', value: result.rows[0] });
  } catch (err) {
    console.error('Error adding device value:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});


// Endpoint to get device values
router.get('/dashboard/devices/:device_id/values', async (req, res) => {
  const { device_id } = req.params;

  try {
    // Fetch values from sensor_values
    const result = await pool.query('SELECT * FROM sensor_values WHERE device_id = $1 ORDER BY timestamp ASC', [device_id]);

    res.status(200).json({ values: result.rows });
  } catch (err) {
    console.error('Error fetching device values:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});
// Endpoint pour obtenir les valeurs du capteur
router.get('/devices/:device_id/values', async (req, res) => {
  const { device_id } = req.params;
  try {
    // Requête SQL pour obtenir les valeurs
    const result = await pool.query('SELECT * FROM sensor_values WHERE device_id = $1 ORDER BY timestamp ASC', [device_id]);
    res.status(200).json({ values: result.rows });
  } catch (err) {
    console.error('Error fetching device values:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});



router.put('/devices/:device_id/status', async (req, res) => {
  console.log('Received PUT request:', req.params, req.body); // Add this line
  const { device_id } = req.params;
  const { status } = req.body;

  try {
    const result = await pool.query('SELECT * FROM sensor_values WHERE device_id = $1 ORDER BY timestamp ASC', [device_id]);
    const values = result.rows;

    // Format data as needed
    res.json({ values });
  } catch (error) {
    console.error('Error fetching values:', error);
    res.status(500).json({ error: 'Failed to fetch values' });
  }
});


// Update device status
router.put('/dashboard/devices/:device_id/status', async (req, res) => {
  const deviceId = req.params.device_id;
  const newStatus = req.body.status;
  console.log('Updating device ID:', deviceId, 'with status:', newStatus);

  try {
    const result = await pool.query(
      'UPDATE devices SET status = $1 WHERE device_id = $2 RETURNING *',
      [newStatus, deviceId]
    );
    
    console.log('Query result:', result); // Log query result

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Device not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating status:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});













router.post("/auth/google", async (req, res) => {
  try {
      const { tokenId } = req.body;
      const ticket = await client.verifyIdToken({
          idToken: tokenId,
          audience: "YOUR_GOOGLE_CLIENT_ID"
      });
      const { email, name } = ticket.getPayload();
      
      // Check if user exists, if not create a new user, and generate a JWT token
      // This is an example, modify it according to your user model and JWT setup
      let user = await User.findOne({ email });
      if (!user) {
          user = new User({ email, name });
          await user.save();
      }
      const token = jwt.sign({ userId: user._id }, "YOUR_JWT_SECRET", { expiresIn: "1h" });

      res.json({ token });
  } catch (err) {
      console.error(err);
      res.status(500).json("Server Error");
  }
});



module.exports = router;
