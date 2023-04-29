import mongoose, { Types } from 'mongoose';

const { Schema } = mongoose;

export type ISchool = {
    _id: Types.ObjectId;
    name: string;
    numberRegistered?: number;
    city?: string;
    updatedAt?: Date;
    createdAt?: Date;
}

const schema = new Schema<ISchool>({
    name: { type: String, require: true, unique: true },
    numberRegistered: { type: Number, default: 0 },
    city: { type: String },
    updatedAt: { type: Date, default: () => new Date() },
    createdAt: { type: Date, default: () => new Date() },
});

/**
 * @description School model
 */
class School { }

schema.pre('save', async function (next: () => any) {
    return next();
});

schema.loadClass(School);

export const SchoolModel = mongoose.model<ISchool>('School', schema);
