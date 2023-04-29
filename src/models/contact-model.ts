import mongoose, { Types } from 'mongoose';

const { Schema } = mongoose;

export type IContact = {
    userId?: Types.ObjectId;
    contactUserId?: Types.ObjectId;
    createdAt?: Date;
    gender?: "male" | "female";
    firstName?: string;
    lastName?: string;
}

const schema = new Schema<IContact>({
    userId: { type: String, require: true },
    contactUserId: { type: String, require: true },
    createdAt: { type: Date, default: () => new Date() },
    gender: { type: String },
    firstName: { type: String },
    lastName: { type: String, require: true },
});

/**
 * @description Contact model
 */
class Contact { }

schema.pre('save', async function (next: () => any) {
    return next();
});

schema.loadClass(Contact);

export const ContactModel = mongoose.model<IContact>('Сontacts', schema);
