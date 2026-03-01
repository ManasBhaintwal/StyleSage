import mongoose, { Schema, Document } from "mongoose";

export interface ICollectionSection {
    id: string;
    title: string;
    tags: string[]; // Tags used to filter products for this section
    order: number;
}

export interface ICollectionConfig extends Document {
    slug: string; // e.g., 'anime', 'meme'
    title: string;
    description: string;
    heroImage?: string;
    sections: ICollectionSection[];
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const SectionSchema = new Schema({
    id: { type: String, required: true },
    title: { type: String, required: true },
    tags: [{ type: String }],
    order: { type: Number, default: 0 },
}, { _id: false });

const CollectionConfigSchema = new Schema<ICollectionConfig>(
    {
        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        heroImage: {
            type: String,
        },
        sections: [SectionSchema],
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

export default (mongoose.models.CollectionConfig as mongoose.Model<ICollectionConfig>) ||
    mongoose.model<ICollectionConfig>("CollectionConfig", CollectionConfigSchema);
