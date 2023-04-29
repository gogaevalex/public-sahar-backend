import { Request, Response } from 'express';
import { ContactModel, IContact } from '../models/contact-model';
import { FutureModel, IFuture } from '../models/future-model';
import { UserModel, IUser } from '../models/user-model';
import mongoose, { Types } from 'mongoose';
import { CityController } from './city-controller';
const { Schema } = mongoose;
const authUserId = '63f4e8d0c50da0a58bc33718'
const priceOfCertain = 300
const priceOfRandom = 100
type IRequestGetByIdCert = Request<{
    orderId: string;
}>

type IRequestCreateCertOneServer = Request<{
    ip: string;
    name: string;
    password: string;
    countCert: number;
}>

export class FutureController {


    static async buyRandom(req: Request, res: Response) {

        const user = await UserModel.findOne({ _id: authUserId });
        if (user && user.coins !== undefined && user.coins >= priceOfRandom) {
            console.log("check")
            try {
                const randomContacts = await ContactModel.aggregate([
                    { $match: { userId: authUserId } },
                    { $sample: { size: 3 } }
                ]);
                console.log("randomContacts", randomContacts)
                for (const contact of randomContacts) {
                    console.log("contact", contact)
                    // Create a new User document using the User model
                    const newFuture = await new FutureModel({

                        userId: authUserId,
                        contactUserId: contact.contactUserId,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        gender: user.gender,
                    })

                    // Save the new User document to a new collection (e.g. "randomUsers")
                    await newFuture.save();
                }
                console.log("saving start", user)
                user.coins = user.coins - priceOfRandom;
                console.log("coins finished", user.coins)
                console.log("user?", user)
                await user.save();
                return res.send({ coins: user.coins });

            } catch (err) {
                if (typeof err === "string") {
                    return res.send('Ошибка, обратитесь в поддержку');
                } else if (err instanceof Error) {
                    return res.send(err.message);
                }
            }
        } else {
            return res.send(400)
        }


    }
    static async buyCertain(req: Request, res: Response) {

        const { contactUserId } = req.body.data;
        console.log("bod", req.body.data)

        console.log("contaId", contactUserId)
        try {
            const targetUser = await UserModel.findOne({
                _id: contactUserId
            });
            const user = await UserModel.findOne({ _id: authUserId });
            console.log("targetUser", targetUser)
            if (targetUser && user && user.coins !== undefined && user.coins >= priceOfCertain) {

                const future = await new FutureModel({
                    userId: authUserId,
                    contactUserId: contactUserId,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    gender: user.gender
                })
                console.log('future', future)
                await future.save();
                user.coins = user.coins - priceOfCertain;
                await user.save();
                return res.send(user);
            } else {
                return res.send(400)
            }
        } catch (err) {
            if (typeof err === "string") {
                return res.send('Ошибка, обратитесь в поддержку');
            } else if (err instanceof Error) {
                return res.send(err.message);
            }
        }
    }
}
