const express = require("express");
const env = require("dotenv");
const cors = require("cors");
const router = require("./routes/patient");
const connectDB = require("./config/db");
env.config();

const app = express();

app.use(express.json());

connectDB();
app.use(cors());

const PORT = process.env.PORT || 3000;

app.use("/", router);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});