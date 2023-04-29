import { Request, Response } from 'express';
import mongoose from 'mongoose';
const { Schema } = mongoose;

export class CityController {
    static async allCity(req: Request, res: Response) {
        console.log('allCityallCityallCityallCity')
        const citySchema = new Schema({ id: Number, title: String});
        try {
            const conn = await mongoose.createConnection('mongodb+srv://cto:MIJTxipBrMeEdG8q@cluster0.54i7kiq.mongodb.net/VK_DB?retryWrites=true&w=majority');
            const CityModel = await conn.model('Popular_cities', citySchema);

            const cities = await CityModel.find().sort({id: 1});

            return res.send({cities});
        } catch (err) {
            if (typeof err === "string") {
                return res.send('Ошибка, обратитесь в поддержку');
            } else if (err instanceof Error) {
                return res.send(err.message);
            }
        }
    }

    
}
