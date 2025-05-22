import http from "http";
import { Server } from "socket.io";
import app from "./app";
import 'dotenv/config';
import { connectToDB } from "./db/connect";
import { startKafkaConsumer } from "./kafka/consumer";



const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});

const PORT = process.env.PORT || 5000;

connectToDB().then(() => {
  startKafkaConsumer(io);

  server.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});
