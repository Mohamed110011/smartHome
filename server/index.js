const express = require('express');
const cors = require('cors'); 
const app = express();

//middleware 
app.use(express.json()); //req.body
app.use(cors());

//ROUTES//

//register and login routes
app.use("/auth", require("./routes/jwtAuth"));


//dashborde route
app.use("/dashboard", require("./routes/dashboard"));

app.listen(5000, () => {
console.log('server started');
});