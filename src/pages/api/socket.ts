import { Server } from "socket.io";
import { Events } from "../../types/project_type";

export default function SocketHandler(req, res) {
  // It means that socket server was already initialised
  if (res.socket.server.io) {
    console.log("Already set up");
    res.end();
    return;
  }

  const io = new Server(res.socket.server);
  res.socket.server.io = io;

  // Define actions inside
  io.on(Events.connection, (socket) => {
    socket.on(Events.confirmed, (v) => {
      io.emit(Events.reciveConfirmed, v);
    });
  });

  console.log("Setting up socket");
  res.end();
}
