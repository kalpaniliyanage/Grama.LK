import mongoose from "mongoose";

const sportsInventorySchema = new mongoose.Schema(
  {
    itemName: { type: String, required: true },
    quantity: { type: Number, required: true },
    condition: { type: String, default: "Good" },
  },
  { timestamps: true }
);

export default mongoose.models.SportsInventory || mongoose.model("SportsInventory", sportsInventorySchema);