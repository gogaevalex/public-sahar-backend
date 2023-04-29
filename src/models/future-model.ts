import mongoose, { Types } from 'mongoose';

const { Schema } = mongoose;

export type IFuture = {
    userId?: Types.ObjectId;
    contactUserId?: Types.ObjectId;
    createdAt?: Date;
    gender?: "male" | "female";
    firstName?: string;
    lastName?: string;
}

const schema = new Schema<IFuture>({
    userId: { type: String, require: true },
    contactUserId: { type: String, require: true },
    createdAt: { type: Date, default: () => new Date() },
    gender: { type: String },
    firstName: { type: String },
    lastName: { type: String, require: true },
});
/**
 * @description Future model
 */
class Future { }

schema.pre('save', async function (next: () => any) {
    return next();
});

schema.loadClass(Future);

export const FutureModel = mongoose.model<IFuture>('Futures', schema);
