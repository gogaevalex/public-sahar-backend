import { Request, Response } from 'express';
import { UserModel, IUser } from '../models/user-model';
import { ContactModel, IContact } from '../models/contact-model';
import { FutureModel, IFuture } from '../models/future-model';
import mongoose from 'mongoose';
const { Schema } = mongoose;
const authUserId = '63f4e8d0c50da0a58bc33718'
const NumberOfQuestions = 12 //сколько берем вопросов из каждой базы
const NumberOfStudents = 8
export class QuestionController {

    static async nQuestions(req: Request, res: Response) {

        const questionSchema = new Schema({

            text: { type: String, require: true },
            institution: { type: String },
            imageLink: { type: String },
            toWhomGender: { type: String },
            fromWhomGender: { type: String },
            date_of_creation: { type: String },

        });
        try {



            const conn = await mongoose.createConnection('mongodb+srv://cto:MIJTxipBrMeEdG8q@cluster0.54i7kiq.mongodb.net/ALL_QUESTIONS?retryWrites=true&w=majority');
            const user = await UserModel.findOne({ _id: authUserId });
            console.log(user)


            const contactList = await ContactModel.find({ userId: authUserId }).lean();
            //const futureList = await FutureModel.find({ userId: authUserId }).lean();
            const femaleContactList = contactList.filter(obj => obj.gender === "female");
            const maleContactList = contactList.filter(obj => obj.gender === "male");

            if (user) {
                if (user.startTimeGame > new Date(Date.now())) {
                    return res.send("wait");
                }
                else {
                    const QuestionModel = await user.gender === "male" ? conn.model('from_boy_school_questions', questionSchema) : conn.model('from_girl_school_questions', questionSchema);
                    const bottomLimit = (user.nonce - 1) * NumberOfQuestions;
                    const topLimit = NumberOfQuestions;
                    const questions = await QuestionModel.find().sort({ _id: 1 }).skip(bottomLimit).limit(topLimit).lean();
                    const maleCount = questions.reduce((count, question) => {
                        return count + (question.toWhomGender === 'male' ? 1 : 0);
                    }, 0);
                    console.log("count", maleCount)
                    const futuresMale = await FutureModel.find({ contactUserId: authUserId, gender: "male" }).sort({ createdAt: 1 }).limit(maleCount).lean();
                    const futuresFemale = await FutureModel.find({ contactUserId: authUserId, gender: "female" }).sort({ createdAt: 1 }).limit(NumberOfQuestions - maleCount).lean();

                    console.log("gender", user.gender)
                    const result = questions.map((item, index) => {
                        if (item.toWhomGender === "male") {
                            const shuffledContacts = maleContactList.sort(() => Math.random() - 0.5);

                            return (
                                {
                                    ...item, students: [
                                        shuffledContacts[0] !== futuresMale[index] ? shuffledContacts[0] : shuffledContacts[2],
                                        futuresMale[index] ? futuresMale[index] : shuffledContacts[1],
                                        shuffledContacts[Math.floor(shuffledContacts.length / 2) - 1] !== futuresMale[index] ? shuffledContacts[Math.floor(shuffledContacts.length / 2) - 1] : shuffledContacts[Math.floor(shuffledContacts.length / 2) + 1],
                                        shuffledContacts[shuffledContacts.length - 2] !== futuresMale[index] ? shuffledContacts[shuffledContacts.length - 2] : shuffledContacts[shuffledContacts.length - 1],
                                        shuffledContacts[2],
                                        shuffledContacts[Math.floor(shuffledContacts.length / 2)],
                                        shuffledContacts[Math.floor(shuffledContacts.length / 2) + 1],
                                        shuffledContacts[shuffledContacts.length - 1],
                                    ]
                                }
                            )
                        } else {
                            const shuffledContacts = femaleContactList.sort(() => Math.random() - 0.5);
                            return (
                                {
                                    ...item, students: [
                                        shuffledContacts[0] !== futuresFemale[index] ? shuffledContacts[0] : shuffledContacts[2],
                                        futuresFemale[index] ? futuresFemale[index] : shuffledContacts[1],
                                        shuffledContacts[Math.floor(shuffledContacts.length / 2) - 1] !== futuresFemale[index] ? shuffledContacts[Math.floor(shuffledContacts.length / 2) - 1] : shuffledContacts[Math.floor(shuffledContacts.length / 2) + 1],
                                        shuffledContacts[shuffledContacts.length - 2] !== futuresFemale[index] ? shuffledContacts[shuffledContacts.length - 2] : shuffledContacts[shuffledContacts.length - 1],
                                        shuffledContacts[2],
                                        shuffledContacts[Math.floor(shuffledContacts.length / 2)],
                                        shuffledContacts[Math.floor(shuffledContacts.length / 2) + 1],
                                        shuffledContacts[shuffledContacts.length - 1],
                                    ]
                                }
                            )
                        }



                    })
                    // console.log(result)
                    res.send({ result });
                    [...futuresFemale, ...futuresMale].forEach(async (future) => {
                        await FutureModel.deleteOne({ _id: future._id });
                    });
                }


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
