import mongoose, { type Document, Schema } from "mongoose";

export interface ICartItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  color: string;
  size: string;
  quantity: number;
  category?: string;
}

export interface ICart extends Document {
  _id: string;
  userId?: string; // Optional for guest users
  sessionId?: string; // For guest users
  items: ICartItem[];
  createdAt: Date;
  updatedAt: Date;
}

const CartItemSchema = new Schema<ICartItem>({
  productId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  image: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    default: 1,
  },
  category: {
    type: String,
    default: "",
  },
});

const CartSchema = new Schema<ICart>(
  {
    userId: {
      type: String,
      default: null,
    },
    sessionId: {
      type: String,
      default: null,
    },
    items: [CartItemSchema],
  },
  {
    timestamps: true,
  }
);

// Create compound index for efficient queries
CartSchema.index({ userId: 1 });
CartSchema.index({ sessionId: 1 });

const Cart = mongoose.models.Cart || mongoose.model<ICart>("Cart", CartSchema);

export default Cart;
