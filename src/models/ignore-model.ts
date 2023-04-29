import mongoose, { Types } from 'mongoose';

const { Schema } = mongoose;

export type IBlock = {
    userId?: Types.ObjectId;
    blockUserId?: Types.ObjectId;
    createdAt?: Date;
}

const schema = new Schema<IBlock>({
    userId: { type: String, require: true, unique: true },
    blockUserId: { type: String },
	createdAt: {type: Date, default: () => new Date()},
});

/**
 * @description Block model
 */
class Block {}

schema.pre('save', async function(next: () => any) {
	return next();
});

schema.loadClass(Block);

export const BlockModel = mongoose.model<IBlock>('Block', schema);
