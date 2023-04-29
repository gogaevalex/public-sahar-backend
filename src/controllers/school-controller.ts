import { Request, Response } from 'express';
import mongoose from 'mongoose';
const { Schema } = mongoose;

export class SchoolController {
    static async allSchool(req: Request, res: Response) {
        const schoolSchema = new Schema({ id: Number, title: String });
        try {
            const conn = await mongoose.createConnection('mongodb+srv://cto:MIJTxipBrMeEdG8q@cluster0.54i7kiq.mongodb.net/VK_DB?retryWrites=true&w=majority');
            const SchoolModel = await conn.model('schools', schoolSchema);

            const schools = await SchoolModel.find().sort({ id: 1 });

            return res.send({ schools });
        } catch (err) {
            if (typeof err === "string") {
                return res.send('Ошибка, обратитесь в поддержку');
            } else if (err instanceof Error) {
                return res.send(err.message);
            }
        }
    }


}
