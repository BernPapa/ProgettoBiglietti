require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Importiamo le route
const authRoutes = require("./routes/auth");
const eventRoutes = require("./routes/events");
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});