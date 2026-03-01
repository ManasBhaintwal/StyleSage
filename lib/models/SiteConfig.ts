import mongoose, { Schema, Document } from "mongoose";

export interface ISiteConfig extends Document {
    type: string; // e.g., 'navbar', 'homepage', 'footer'
    content: any; // Flexible JSON structure
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const SiteConfigSchema = new Schema<ISiteConfig>(
    {
        type: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        content: {
            type: Schema.Types.Mixed,
            required: true,
            default: {},
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

export default (mongoose.models.SiteConfig as mongoose.Model<ISiteConfig>) ||
    mongoose.model<ISiteConfig>("SiteConfig", SiteConfigSchema);
