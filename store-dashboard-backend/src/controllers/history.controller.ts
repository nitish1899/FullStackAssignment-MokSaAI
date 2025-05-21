import { Request, Response } from "express";
import StoreLog from "../models/storeLog.model";

export const getStoreHistory = async (req: Request, res: Response) => {
  const { store_id } = req.params;

  const now = new Date();
  const past24 = new Date(now.getTime() - 24 * 60 * 60 * 1000);

  try {
    const history = await StoreLog.aggregate([
      { $match: { store_id, time_stamp: { $gte: past24 } } },
      {
        $project: {
          hour: { $hour: "$time_stamp" },
          customers_in: 1,
          customers_out: 1,
        },
      },
      {
        $group: {
          _id: "$hour",
          customers_in: { $sum: "$customers_in" },
          customers_out: { $sum: "$customers_out" },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // Return 0s for missing hours
    const fullDay = Array.from({ length: 24 }, (_, i) => ({
      hour: i,
      customers_in: 0,
      customers_out: 0,
    }));

    history.forEach((item) => {
      fullDay[item._id].customers_in = item.customers_in;
      fullDay[item._id].customers_out = item.customers_out;
    });

    res.json(fullDay);
  } catch (error) {
    console.error("Error fetching history:", error);
    res.status(500).json({ error: "Failed to fetch store history" });
  }
};
