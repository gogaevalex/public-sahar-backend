import mongoose, { Types } from 'mongoose';

const { Schema } = mongoose;

export type IQuestion = {
    _id: Types.ObjectId;
    photoId?: Types.ObjectId;
    text?: string;
    createdAt?: Date;
}

const schema = new Schema<IQuestion>({
    photoId: { type: String },
    text: { type: String },
    createdAt: { type: Date, default: () => new Date() },
});

/**
 * @description Question model
 */
class Question { }

schema.pre('save', async function (next: () => any) {
    return next();
});

schema.loadClass(Question);

export const QuestionModel = mongoose.model<IQuestion>('Question', schema);
