const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const dbConnect = require("./dbConnect");

// Load environment variables
dotenv.config();

// Connect to MongoDB
dbConnect();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("🚀 Joshspot Backend is running with MongoDB");
});

app.use("/api/", require("./routes/chat"));
app.use("/api/", require("./routes/comments"));
app.use("/api/", require("./routes/reactions"));
app.use("/api/", require("./routes/stories"));
app.use("/api/", require("./routes/submit"));
app.use("/api/", require("./routes/toggleFeature"));
app.use("/api/", require("./routes/trendingStories"));

// 404 Handler (optional)
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Backend server running at http://localhost:${PORT}`);
});
