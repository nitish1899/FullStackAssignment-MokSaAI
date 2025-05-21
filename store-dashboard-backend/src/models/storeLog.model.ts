import mongoose, { Document, Schema } from "mongoose";

export interface StoreLog extends Document {
  store_id: string;
  customers_in: number;
  customers_out: number;
  time_stamp: Date;
}

const StoreLogSchema = new Schema<StoreLog>({
  store_id: { type: String, required: true },
  customers_in: { type: Number, required: true },
  customers_out: { type: Number, required: true },
  time_stamp: { type: Date, required: true },
});

export default mongoose.model<StoreLog>("StoreLog", StoreLogSchema);
