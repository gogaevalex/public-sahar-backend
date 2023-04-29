import mongoose, { Types } from 'mongoose';

const { Schema } = mongoose;

export type IUser = {
    _id: Types.ObjectId;
    chatId: string; // Индентификатор пользователя в ТГ
    username?: string;
    firstName?: string;
    lastName?: string;
    registrationFinished?: Boolean;
    classNumber?: number;
    school?: string;
    schoolId?: Types.ObjectId;
    promo?: string;
    coins?: number;
    justEarned?: number;
    premium?: boolean;
    gender?: "male" | "female";
    startTimeGame: Date;
    city?: string,
    nonce: number;
    order: number;
    questionNumber: number;
    updatedAt?: Date;
    createdAt?: Date;

}

const schema = new Schema<IUser>({
    chatId: { type: String, require: true, unique: true },
    username: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    registrationFinished: { type: Boolean },
    classNumber: { type: Number },
    school: { type: String },
    schoolId: { type: String },
    promo: { type: String, unique: true },
    coins: { type: Number, default: 0 },
    justEarned: { type: Number, default: 0 },
    gender: { type: String },
    startTimeGame: { type: Date, default: () => new Date(628021800000) },
    city: { type: String },
    nonce: { type: Number, require: true, default: 1 },
    order: { type: Number, require: true, default: 11 },
    questionNumber: { type: Number, require: true, default: 1 },
    updatedAt: { type: Date, default: () => new Date() },
    createdAt: { type: Date, default: () => new Date() },
});

/**
 * @description user model
 */
class User { }

schema.pre('save', async function (next: () => any) {
    return next();
});

schema.loadClass(User);

export const UserModel = mongoose.model<IUser>('User', schema);
