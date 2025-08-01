import mongoose, { type Document, Schema } from "mongoose";

export interface ICategory extends Document {
  _id: string;
  name: string;
  slug: string;
  description: string;
  isActive: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Add indexes to schema
CategorySchema.index({ isActive: 1, order: 1 });

// Export the model, ensuring we don't recompile if it already exists
export default (mongoose.models?.Category as mongoose.Model<ICategory>) ||
  mongoose.model<ICategory>("Category", CategorySchema);
