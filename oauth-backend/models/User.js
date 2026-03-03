import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    googleId: { type: String, unique: true, required: true },
    displayName: String, // Changed 'name' to 'displayName' to match Passport
    email: { type: String, unique: true, required: true },
    image: String        // Added this so you can show the user's profile picture!
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);