import mongoose from "mongoose";

const youthMemberSchema = new mongoose.Schema(
  {
    memberName: {
      type: String,
      required: true,
      trim: true,
    },
    memberAge: {
      type: Number,
      required: true,
    },
    sportInterest: {
      type: String,
      default: "Cricket",
    },
    contactNo: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const YouthMember =
  mongoose.models.YouthMember ||
  mongoose.model("YouthMember", youthMemberSchema);

export default YouthMember;