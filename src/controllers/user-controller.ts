import { Request, Response } from 'express';
import { UserModel, IUser } from '../models/user-model';

const authUserId = '63f4e8d0c50da0a58bc33718'
const minCoins = 2;
const maxCoins = 5;
type IRequestGetByIdCert = Request<{
    orderId: string;
}>
// type IResponseGetByIdCert = Response<{
//     cert: ICert;
// } | unknown>

type IRequestCreateCertOneServer = Request<{
    ip: string;
    name: string;
    password: string;
    countCert: number;
}>

export class UserController {
    static async userInfo(req: Request, res: Response) {
        const userId = req.params.userId;
        try {
            const user = await UserModel.findOne({ _id: userId });
            return res.send({ user })
        } catch (err) {
            if (typeof err === "string") {
                return res.send('Ошибка, обратитесь в поддержку');
            } else if (err instanceof Error) {
                return res.send(err.message);
            }
        }
        return res.send('Успешно');
    }
    static async addGender(req: Request, res: Response) {
        const { gender } = req.body;

        try {
            const user = await UserModel.findOne({ _id: authUserId });
            if (user) {
                user.gender = gender
                await user.save();
                return res.send(user.gender);
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
    static async addClassNumber(req: Request, res: Response) {
        const { classNumber } = req.body;

        try {
            const user = await UserModel.findOne({ _id: authUserId });
            if (user) {
                user.classNumber = classNumber
                await user.save();
                return res.send(user.classNumber);
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
    static async addSchool(req: Request, res: Response) {

        const { schoolId } = req.body;

        try {
            console.log("schoolID", schoolId)
            const user = await UserModel.findOne({ _id: authUserId });
            if (user) {

                user.schoolId = schoolId
                await user.save();
                return res.send(user.schoolId)
                    ;
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
    static async addName(req: Request, res: Response) {
        const { firstName } = req.body;

        try {
            const user = await UserModel.findOne({ _id: authUserId });
            if (user) {
                user.firstName = firstName
                await user.save();
                return res.send(user.firstName)
                    ;
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
    static async addSurname(req: Request, res: Response) {
        const { lastName } = req.body;

        try {
            const user = await UserModel.findOne({ _id: authUserId });
            if (user) {
                user.lastName = lastName
                await user.save();
                return res.send(user.lastName)
                    ;
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
    static async updateNonce(req: Request, res: Response) {
        const { nonce } = req.body;

        try {
            const user = await UserModel.findOne({ _id: authUserId });
            if (user) {
                user.nonce = nonce + 1;
                await user.save();
                return res.send({ nonce: user.nonce })
                    ;
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
    static async updateQuestionNumber(req: Request, res: Response) {
        const { questionNumber } = req.body;

        try {
            const user = await UserModel.findOne({ _id: authUserId });
            if (user) {
                user.questionNumber = questionNumber
                await user.save();
                return res.send({ questionNumber: user.nonce })
                    ;
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
    static async addCoins(req: Request, res: Response) {


        try {
            const user = await UserModel.findOne({ _id: authUserId });
            if (user && user.coins !== undefined && user.justEarned !== undefined) {
                user.coins = user.coins + user.justEarned;
                // user.coins = user.coins + earnedCoins;
                user.justEarned = 0;
                await user.save();
                return res.send(
                    user.coins
                )
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
    static async coinsTotal(req: Request, res: Response) {

        try {
            const user = await UserModel.findOne({ _id: authUserId });
            if (user) {


                return res.send({ coins: user.coins })
                    ;
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
    //addNextQuestionOrder
    static async updateOrder(req: Request, res: Response) {
        const { order } = req.body;
        console.log("order", order)
        try {
            const user = await UserModel.findOne({ _id: authUserId });
            if (user) {
                console.log("user", user)

                if (order === -1) {
                    user.nonce = user.nonce + 1;
                    user.order = 11;
                    user.startTimeGame = new Date(Date.now() + (1 * 20 * 1000));
                    user.justEarned = Math.min(Math.round((user.questionNumber * (Math.random() * (maxCoins - minCoins + 1) + minCoins))), 70)

                    // user.coins = user.coins + earnedCoins;
                    user.questionNumber = 0;
                } else {
                    user.order = order;
                }
                // user.order = 12 - ((12-order)%12);
                await user.save();
                return res.send({ order: user.order })
                    ;
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
    static async registrationFinished(req: Request, res: Response) {
        const { registrationFinished } = req.body;

        try {
            const user = await UserModel.findOne({ _id: authUserId });
            if (user) {
                user.registrationFinished = registrationFinished;
                user.city = 'Москва';
                user.nonce = 1;
                user.coins = 0;
                await user.save();
                return res.send(user.registrationFinished)
                    ;
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
    static async allowNextGame(req: Request, res: Response) {


        try {
            const user = await UserModel.findOne({ _id: authUserId });
            if (user) {
                if (user.startTimeGame < new Date(Date.now())) {

                    return res.send(true)
                        ;
                } else {
                    return res.send(false)
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

    static async checkPromo(req: Request, res: Response) {
        const body = req.body;
        const { promo } = body;
        try {
            const friendUser = await UserModel.findOne({ promo });
            console.log('UserModel', UserModel);
            if (friendUser) {
                const timeNow = new Date();
                if ((timeNow.getTime() - friendUser?.startTimeGame.getTime()) > 30 * 60 * 1000) {
                    friendUser.startTimeGame = new Date(628021800000);
                    await friendUser.save();
                    // оповестить о том что счетчик обнулился
                }
                return res.send('Успешно');
            } else {
                return res.status(400).send({
                    message: 'Неверный промокод'
                });

            }
        } catch (err) {
            if (typeof err === "string") {
                return res.send('Ошибка, обратитесь в поддержку');
            } else if (err instanceof Error) {
                return res.send(err.message);
            }
        }
    }
    static async getUser(req: Request, res: Response) {

        try {
            const user = await UserModel.findOne({ _id: authUserId });
            return res.send({ user })
        } catch (err) {
            if (typeof err === "string") {
                return res.send('Ошибка, обратитесь в поддержку');
            } else if (err instanceof Error) {
                return res.send(err.message);
            }
        }
        return res.send('Успешно');
    }
}
