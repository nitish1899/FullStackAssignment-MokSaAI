// Run this file manually to produce test data:
// ts-node kafkaProducer.ts
// or
// npm run ts-node kafkaProducer.ts

// node -r ts-node/esm kafkaProducer.ts

import kafka from "kafka-node";

const client = new kafka.KafkaClient({ kafkaHost: process.env.KAFKA_HOST });
const producer = new kafka.Producer(client);

producer.on("ready", async () => {
  console.log("Kafka Producer is connected and ready.");

  for (let hour = 0; hour < 24; hour++) {
    const data = {
      store_id: "store-123",
      customers_in: Math.floor(Math.random() * 10),
      customers_out: Math.floor(Math.random() * 10),
      time_stamp: new Date().toISOString(),
    };

    const payloads = [
      {
        topic: process.env.KAFKA_TOPIC || "store-traffic",
        messages: JSON.stringify(data),
      },
    ];

    producer.send(payloads, (err, result) => {
      if (err) console.error("Send error:", err);
      else console.log("Message sent:", result);
    });

    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
});

producer.on("error", (err) => {
  console.error("Producer error:", err);
});
