import mongoose from "mongoose";

const sportsEventSchema = new mongoose.Schema(
  {
    eventName: { type: String, required: true },
    eventType: { type: String, required: true },
    eventDate: { type: String, required: true },
    budget: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.SportsEvent || mongoose.model("SportsEvent", sportsEventSchema);