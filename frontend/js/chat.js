$(document).ready(() => {
    const socket = io();
    let currentRoom = null;
    const username = localStorage.getItem("username");

    if (!username) {
        window.location.href = "login.html";
    }

    $("#username-display").text(username);

    $("#join-room").click(() => {
        const room = $("#room-select").val();
        if (currentRoom) socket.emit("leaveRoom", currentRoom);
        currentRoom = room;
        socket.emit("joinRoom", room);
        $("#messages").html(""); // Clear old messages
        loadMessages(room);
    });

    $("#leave-room").click(() => {
        if (currentRoom) {
            socket.emit("leaveRoom", currentRoom);
            currentRoom = null;
            $("#messages").html("<p>You have left the room.</p>");
        }
    });

    $("#send-message").click(() => {
        const message = $("#message-input").val();
        if (message && currentRoom) {
            socket.emit("chatMessage", { from_user: username, room: currentRoom, message });
            $("#message-input").val("");
        }
    });

    $("#message-input").on("input", () => {
        socket.emit("typing", currentRoom);
    });

    socket.on("message", (msg) => {
        $("#messages").append(`<p><strong>${msg.from_user}:</strong> ${msg.message}</p>`);
    });

    socket.on("typing", () => {
        $("#typing-indicator").text("User is typing...");
        setTimeout(() => $("#typing-indicator").text(""), 1000);
    });

    function loadMessages(room) {
        $.get(`/api/chat/messages/${room}`, (messages) => {
            messages.forEach(msg => {
                $("#messages").append(`<p><strong>${msg.from_user}:</strong> ${msg.message}</p>`);
            });
        });
    }
});
