// Welfare Model කේතය
import mongoose from "mongoose";

const welfareSchema = new mongoose.Schema(
  {
    houseNumber: { type: String, required: true },
    claimType: { type: String, required: true },
    amount: { type: Number, default: 0 },
    itemsBorrowed: { type: Array, default: [] },
    status: { type: String, default: "Approved" },
  },
  { timestamps: true }
);

const Welfare =
  mongoose.models.Welfare || mongoose.model("Welfare", welfareSchema);

// අනිවාර්යයෙන්ම export default තිබිය යුතුය
export default Welfare;