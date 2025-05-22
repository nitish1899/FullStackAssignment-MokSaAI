import kafka from "kafka-node";
import { Server } from "socket.io";
import StoreLog from "../models/storeLog.model";

export const startKafkaConsumer = (io: Server) => {
  const client = new kafka.KafkaClient({ kafkaHost: process.env.KAFKA_HOST });
  const consumer = new kafka.Consumer(
    client,
    [{ topic: process.env.KAFKA_TOPIC || "store-traffic" }],
    {
      autoCommit: true,
    }
  );

  consumer.on("message", async (message) => {
    try {
      const data = JSON.parse(message.value as string);
      const { store_id, customers_in, customers_out, time_stamp } = data;

      // Save to MongoDB
      await StoreLog.create({
        store_id,
        customers_in,
        customers_out,
        time_stamp: new Date(time_stamp),
      });

      // Emit to frontend
      io.emit("live-data", data);
    } catch (err) {
      console.error("Kafka message error:", err);
    }
  });
};