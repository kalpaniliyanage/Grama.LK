const mongoose = require("mongoose");

const memberFeeSchema = new mongoose.Schema(
  {
    youthMemberId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "YouthMember",
      required: true,
    },
    month: {
      type: String, // e.g. "January", "February"
      required: true,
    },
    year: {
      type: Number,
      default: new Date().getFullYear(),
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["Paid", "Pending"],
      default: "Paid",
    },
    paidDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("MemberFee", memberFeeSchema);