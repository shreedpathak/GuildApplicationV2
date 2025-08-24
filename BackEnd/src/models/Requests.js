import mongoose from "mongoose";

const requestSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    requester: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the user who created the request
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category", // Reference to the category
      required: true,
    },
    status: {
      type: String,
      enum: ["open", "in-progress", "completed", "cancelled"],
      default: "open",
    },
    location: {
      type: String, // optional, if you want location info
    },
    deadline: {
      type: Date, // optional, if requests can have deadlines
    },
    assignedHelper: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // helper assigned to the request
    },
    requester: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Needer 
    },
  },
  { timestamps: true } // createdAt, updatedAt
);

export default mongoose.model("Request", requestSchema);
