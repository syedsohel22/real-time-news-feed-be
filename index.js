const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const setupSwagger = require("./swaggerConfig");

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());

setupSwagger(app);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.json({ message: "welcome to server" });
});

io.on("connection", (socket) => {
  console.log("New WebSocket connection");
  socket.on("disconnect", () => console.log("Client disconnected"));
});

app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/user", require("./routes/userRoutes"));
app.use("/api/v1/news", require("./routes/newsRoutes"));

server.listen(5000, () => console.log("Server running on port 5000"));
