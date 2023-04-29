import mongoose, { Types } from 'mongoose';

const { Schema } = mongoose;

export type IAnswer = {
    _id: Types.ObjectId;
    questionId?: Types.ObjectId;
    questionText?: string,
    answerUserId?: Types.ObjectId;
    winUserId?: Types.ObjectId;
    loseUserIdArray?: [Types.ObjectId];
    status: "hide" | "open";
    createdAt?: Date;
}

const schema = new Schema<IAnswer>({
    questionId: { type: String, require: true },
    questionText: { type: String, default: "???" },
    answerUserId: { type: String, require: true, },
    winUserId: { type: String, require: true, },
    loseUserIdArray: { type: Array },
    status: { type: String, default: "hide" },
    createdAt: { type: Date, default: () => new Date() },
});

/**
 * @description Answer model
 */
class Answer { }

schema.pre('save', async function (next: () => any) {
    return next();
});

schema.loadClass(Answer);

export const AnswerModel = mongoose.model<IAnswer>('Answer', schema);