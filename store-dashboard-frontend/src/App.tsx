import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import axios from "axios";

// Define types
interface LiveData {
  store_id: number;
  customers_in: number;
  customers_out: number;
  time_stamp: string;
}

interface HistoryData {
  hour: number;
  customers_in: number;
  customers_out: number;
}

const socket = io("http://localhost:5000");

const App: React.FC = () => {
  const [liveData, setLiveData] = useState<LiveData[]>([]);
  const [historyData, setHistoryData] = useState<HistoryData[]>([]);

  useEffect(() => {
    socket.on("live-data", (data: LiveData) => {
      setLiveData((prev) => [data, ...prev.slice(0, 9)]);
    });

    axios
      .get<HistoryData[]>("http://localhost:5000/api/history/10")
      .then((res) => {
        setHistoryData(res.data);
      });

    // Clean up socket connection
    return () => {
      socket.off("live-data");
    };
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Store Dashboard</h1>

      <h2>Live Table</h2>
      <table border={1} cellPadding={10}>
        <thead>
          <tr>
            <th>Store ID</th>
            <th>Customers In</th>
            <th>Customers Out</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {liveData.map((item, index) => (
            <tr key={index}>
              <td>{item.store_id}</td>
              <td>{item.customers_in}</td>
              <td>{item.customers_out}</td>
              <td>{item.time_stamp}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 style={{ marginTop: 40 }}>History Table (Last 24 Hours)</h2>
      <table border={1} cellPadding={10}>
        <thead>
          <tr>
            <th>Hour</th>
            <th>Customers In</th>
            <th>Customers Out</th>
          </tr>
        </thead>
        <tbody>
          {historyData.map((row, index) => (
            <tr key={index}>
              <td>{row.hour}</td>
              <td>{row.customers_in}</td>
              <td>{row.customers_out}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;