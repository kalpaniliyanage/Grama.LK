import mongoose from "mongoose";

const welfareMemberSchema = new mongoose.Schema(
  {
    houseNumber: {
      type: String,
      required: true,
      trim: true,
    },
    householdHeadNIC: {
      type: String,
      required: true,
      trim: true,
    },
    fullName: {
      type: String,
      default: "N/A",
    },
    phone: {
      type: String,
      default: "N/A",
    },
    welfareStatus: {
      type: String,
      default: "Registered in Welfare",
    },
  },
  {
    timestamps: true,
  }
);

const WelfareMember =
  mongoose.models.WelfareMember ||
  mongoose.model("WelfareMember", welfareMemberSchema);

export default WelfareMember;