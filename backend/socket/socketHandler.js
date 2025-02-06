const socketHandler = (io) => {
    io.on("connection", (socket) => {
      console.log("User connected");
  
      socket.on("joinRoom", (room) => {
        socket.join(room);
        console.log(`User joined room: ${room}`);
      });
  
      socket.on("chatMessage", async ({ from_user, room, message }) => {
        const msg = { from_user, room, message, date_sent: new Date() };
        io.to(room).emit("message", msg);
        await new GroupMessage(msg).save();
      });
  
      socket.on("typing", (room) => {
        socket.to(room).emit("typing", "User is typing...");
      });
  
      socket.on("disconnect", () => {
        console.log("User disconnected");
      });
    });
  };
  
  module.exports = socketHandler;
  