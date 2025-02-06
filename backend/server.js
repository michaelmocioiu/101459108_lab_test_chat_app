const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const chatRoutes = require("./routes/chatRoutes");
const socketHandler = require("./socket/socketHandler");

const path = require("path");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.json());
app.use(cors());

connectDB();
app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);
app.use(express.static(path.join(__dirname, "../frontend/view")));

socketHandler(io);

server.listen(5000, () => console.log("Server running on port 5000"));
