import mongoose from "mongoose";

const welfareFundSchema = new mongoose.Schema(
  {
    houseNo: { type: String, required: true },
    month: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: String, required: true },
  },
  { timestamps: true }
);

const WelfareFund =
  mongoose.models.WelfareFund || mongoose.model("WelfareFund", welfareFundSchema);

export default WelfareFund;