const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");

// Function to get user and todos

// Function to get user and todos
const getUserAndTodos = async (userId) => {
  const query = `
    SELECT u.user_name, t.todo_id, t.description 
    FROM users AS u 
    LEFT JOIN todos AS t ON u.user_id = t.user_id 
    WHERE u.user_id = $1
  `;
  const { rows } = await pool.query(query, [userId]);
  return rows;
};

// Route handler
router.get("/", authorization, async (req, res) => {   
  try {
    const userId = req.user; // Directly use req.user
    console.log("User ID from authorization middleware:", userId);

    const userTodos = await getUserAndTodos(userId);
    console.log("Query result:", userTodos);

    if (userTodos.length === 0) {
      console.log("No data found for user ID:", userId);
    }

    res.json(userTodos);
  } catch (err) {
    console.error("Error executing query:", err.message);
    res.status(500).send("Server error");
  }
});
    
    // //create a todo
    
    router.post("/todos", authorization, async (req, res) => {
      try {
        console.log(req.body);
        const { description } = req.body;
        const newTodo = await pool.query(
          "INSERT INTO todos (user_id, description) VALUES ($1, $2) RETURNING *",
          [req.user, description] // Use req.user directly as it contains the user ID
        );
    
        res.json(newTodo.rows[0]);
      } catch (err) {
        console.error("Error executing query:", err.message);
        res.status(500).send("Server error");
      }
    });
    
    //update a todo
    
    router.put("/todos/:id", authorization, async (req, res) => {
      try {
        const { id } = req.params;
        const { description } = req.body;
        const updateTodo = await pool.query(
          "UPDATE todos SET description = $1 WHERE todo_id = $2 AND user_id = $3 RETURNING *",
          [description, id, req.user]
        );
    
        if (updateTodo.rows.length === 0) {
          return res.json("This todo is not yours");
        }
    
        res.json("Todo was updated");
      } catch (err) {
        console.error(err.message);
      }
    });
    
    //delete a todo
    
    router.delete("/todos/:id", authorization, async (req, res) => {
      try {
        const { id } = req.params;
        const deleteTodo = await pool.query(
          "DELETE FROM todos WHERE todo_id = $1 AND user_id = $2 RETURNING *",
          [id, req.user]
        );
    
        if (deleteTodo.rows.length === 0) {
          return res.json("This Todo is not yours");
        }
    
        res.json("Todo was deleted");
      } catch (err) {
        console.error(err.message);
      }
    });
module.exports = router;