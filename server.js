const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const app = express();
// connect DB
connectDB();

// init Middleware
app.use(express.json({ extended: false }));
app.use(cors());

//Define Routes
app.use("/api/todo", require("./routes/api/todo"));

const PORT = process.env.PORT || 5000;
app.get("/", (req, res) => {
  res.send("app running");
});

// Define Routes
app.listen(PORT, () => console.log(`server connected on port ${[PORT]}`));
