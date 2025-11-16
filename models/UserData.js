import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    contact: { type: String, required: true },
    age: { type: Number, required: true }
  },
  { timestamps: true }
);

export default mongoose.model("UserData", userSchema);
