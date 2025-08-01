import mongoose, { type Document, Schema } from "mongoose";

export interface IUser extends Document {
  _id: string;
  email: string;
  name: string;
  password?: string;
  picture?: string;
  role: "user" | "admin";
  provider: "email" | "google";
  googleId?: string;
  isEmailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true, // This already creates an index
      lowercase: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: function () {
        return this.provider === "email";
      },
    },
    picture: {
      type: String,
      default: null,
    },
    googleId: {
      type: String,
      unique: true, // This already creates an index
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    provider: {
      type: String,
      enum: ["email", "google"],
      required: true,
    },
    lastLoginAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Export the model, ensuring we don't recompile if it already exists
export default (mongoose.models?.User as mongoose.Model<IUser>) ||
  mongoose.model<IUser>("User", UserSchema);
