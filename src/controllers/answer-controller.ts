import { Request, Response } from 'express';
import { UserModel, IUser } from '../models/user-model';
import { ContactModel, IContact } from '../models/contact-model';
import { AnswerModel, IAnswer } from '../models/answer-model';

import mongoose, { Types } from 'mongoose';
import { emitWarning } from 'process';
const { Schema } = mongoose;
const authUserId = '63f4e8d0c50da0a58bc33718'
const NumberOfQuestions = 12 //сколько берем вопросов из каждой базы
const NumberOfStudents = 8
export class AnswerController {

    static async addAnswer(req: Request, res: Response) {
        console.log(req.body)
        const body = req.body;
        const { answerUserId, winUserId, loseUserIdArray, questionText, questionId } = body.data;

        console.log("hoq", body, answerUserId, winUserId, loseUserIdArray, questionId)
        try {
            //const rawLoser

            const answer = await new AnswerModel({
                questionId,
                questionText,
                answerUserId: new Types.ObjectId(authUserId),
                winUserId: new Types.ObjectId(winUserId),
                loseUserIdArray: loseUserIdArray.map((item: string) => new Types.ObjectId(item)),

            })
            const user = await UserModel.findOne({ _id: authUserId });
            if (user) {
                user.questionNumber = user.questionNumber + 1;
                await user.save();
            } else {
                return res.send(400);
            }
            await answer.save();
            return res.send(answer);

        }
        catch (err) {
            if (typeof err === "string") {
                return res.send('Ошибка, обратитесь в поддержку');
            } else if (err instanceof Error) {
                return res.send(err.message);
            }
        }
    }
    static async viewComplements(req: Request, res: Response) {


        try {
            //     {
            //     text: "Мы бы отлично смотрелись вместе ",
            //     fromWhomGender: "male",/*стоит обратить внимание что в отличии от dataClassStudents в Questions.jsx
            //     здесь записывается не пол того кому отправляется сахарок, а от кого*/
            //     fromClass: 11,//также дополнительно мы отправляем класс ответившего юзера
            //     imageLink: "https://i.ibb.co/Bn9p1Gv/image-78-1.png",
            //     date: 1677621840,
            //     questionId: 5,
            //     students: [
            //         {

            //             name: "Ахалайа Мохалайа ",
            //             won: false,
            //             userId: 53,
            //         },
            //         {

            //             name: "Дояна Коровкина ",
            //             won: false,
            //             userId: 54,
            //         },
            //         {

            //             name: "Сарика Хяркина ",
            //             won: true,
            //             userId: 55,
            //         },

            //         {

            //             name: "Жижка Вейперова ",
            //             won: false,
            //             userId: 58,
            //         },

            //     ]
            // },


            const user = await UserModel.findOne({ _id: authUserId });
            if (user) {
                const rawResult = await AnswerModel
                    .aggregate([
                        {
                            $match: { winUserId: authUserId }
                        },

                        {
                            $lookup: {
                                from: 'users', // достать из коллекции parents
                                localField: 'answerUserId', // где parent из коллекции children
                                foreignField: '_id', // равен _id из коллекции parents
                                as: 'answerUser' // положить результат в parentFull
                            }
                        },
                        {
                            $lookup: {
                                from: 'users', // достать из коллекции parents
                                localField: 'loseUserIdArray', // где parent из коллекции children
                                foreignField: '_id', // равен _id из коллекции parents
                                as: 'loseUserIdArray' // положить результат в parentFull
                            }
                        },

                        {
                            $unwind: '$answerUser'
                        },
                        {
                            $project: {
                                _id: 1,
                                questionText: 1,
                                //questionId
                                status: 1,
                                fromWhomGender: '$answerUser.gender',
                                fromClass: '$answerUser.numberClass',
                                date: { $toLong: { $toDate: "$createdAt" } },
                                loseUserIdArray: {
                                    $map: {
                                        input: "$loseUserIdArray",
                                        as: "loseUserIdArray",
                                        in: {
                                            firstName: "$$loseUserIdArray.firstName",
                                            lastName: "$$loseUserIdArray.lastName",
                                            userId: "$$loseUserIdArray._id",
                                            won: false
                                        }
                                    }
                                }
                            }
                        }
                    ]);
                // const result = rawResult.map()
                const result = rawResult.map((question, index) => {
                    console.log(question.loseUserIdArray[0].firstName.length % 3)
                    return {
                        ...question,
                        loseUserIdArray: [
                            ...question.loseUserIdArray.slice(0, question.loseUserIdArray[0].firstName.length % 3),
                            { firstName: user.firstName, lastName: user.lastName, userId: user._id, won: true },
                            ...question.loseUserIdArray.slice(question.loseUserIdArray[0].firstName.length % 3)
                        ]

                    };

                });
                return res.send(result)
            } else {
                return res.send(400)
            }



        }
        catch (err) {
            if (typeof err === "string") {
                return res.send('Ошибка, обратитесь в поддержку');
            } else if (err instanceof Error) {
                return res.send(err.message);
            }
        }
    }
}
