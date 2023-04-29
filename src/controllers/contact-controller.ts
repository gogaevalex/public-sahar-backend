import { Request, Response } from 'express';
import { ContactModel, IContact } from '../models/contact-model';
import { UserModel, IUser } from '../models/user-model';
import mongoose from 'mongoose';
const { Schema } = mongoose;
const authUserId = '63f4e8d0c50da0a58bc33718'
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

export class ContactController {
    static async userContactList(req: Request, res: Response) {

        try {
            const contactList = await ContactModel.find({ userId: authUserId }).sort({ createdAt: -1 });
            return res.send({ contactList })
        } catch (err) {
            if (typeof err === "string") {
                return res.send('Ошибка, обратитесь в поддержку');
            } else if (err instanceof Error) {
                return res.send(err.message);
            }
        }
        return res.send('Успешно');
    }
    static async allPeopleInSchool(req: Request, res: Response) {

        const studentsSchema = new Schema({ id: Number, first_name: String, last_name: String, school_id: Number });

        try {

            const conn = await mongoose.createConnection('mongodb+srv://cto:MIJTxipBrMeEdG8q@cluster0.54i7kiq.mongodb.net/VK_DB?retryWrites=true&w=majority');
            const StudentModel = await conn.model('Student', studentsSchema);
            console.log('StudentModel', StudentModel);
            const schoolId = 11
            const students = await StudentModel.find({ school_id: schoolId });
            console.log('Student', students);

            return res.send({ students });
        } catch (err) {
            if (typeof err === "string") {
                return res.send('Ошибка, обратитесь в поддержку');
            } else if (err instanceof Error) {
                return res.send(err.message);
            }
        }
    }

    static async addContact(req: Request, res: Response) {
        console.log(req.body)
        const { contactUserId, source } = req.body;

        if (source === 'users') {
            try {
                const user = await UserModel.findOne({ _id: contactUserId });
                console.log("user", user)
                if (user) {

                    const contact = await new ContactModel({
                        //gender: user.gender ? user.gender : "male",
                        //gender: item.last_name[item.last_name.length]=='а'||'я'?'female':'male'
                        userId: authUserId,
                        contactUserId: contactUserId,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        gender: user.gender
                    })
                    console.log('contact', contact)
                    await contact.save();
                    return res.send(contact);
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
        } else if (source === 'students') {
            const studentsSchema = new Schema({ id: Number, first_name: String, last_name: String, school_id: Number });

            try {


                const conn = await mongoose.createConnection('mongodb+srv://cto:MIJTxipBrMeEdG8q@cluster0.54i7kiq.mongodb.net/VK_DB?retryWrites=true&w=majority');
                const StudentModel = await conn.model('Student', studentsSchema);
                const user = await StudentModel.findOne({ _id: contactUserId });
                if (user) {

                    const contact = await new ContactModel({

                        userId: authUserId,
                        contactUserId: contactUserId,
                        firstName: user.first_name,
                        lastName: user.last_name,
                        gender: "male",
                        //gender: user.last_name[user.last_name.length - 1] == 'а' || 'я' ? "female" : "male"

                    })
                    console.log(contact)
                    await contact.save();
                    return res.send(contact);
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
    static async deleteContact(req: Request, res: Response) {
        console.log(req.body)
        const { _id } = req.body;

        try {
            const user = await ContactModel.findOneAndDelete({ _id });

            return res.send(user);
        } catch (err) {

            return res.send(err);

        }
    }
    static async allRelevantList(req: Request, res: Response) {

        const studentsSchema = new Schema({ id: Number, first_name: String, last_name: String, school_id: Number });
        const schoolSchema = new Schema({});
        try {
            const conn = await mongoose.createConnection('mongodb+srv://cto:MIJTxipBrMeEdG8q@cluster0.54i7kiq.mongodb.net/VK_DB?retryWrites=true&w=majority');

            const schoolId = 11
            const SchoolModel = await conn.model('schools', schoolSchema);

            const school = await SchoolModel.findOne({ id: schoolId }).lean();
            const contactList = await ContactModel.find({ userId: authUserId }).lean();
            if (school && contactList) {
                const rawUsersInTheSchool = await UserModel.find({ schoolId: '6408c1b52f22e38abadf2459' }).lean();

                console.log("school", school)

                const usersIds = rawUsersInTheSchool.map(obj => obj._id.toString());
                console.log('usersIds', usersIds, usersIds.length)
                const contactIdsRaw = contactList.map(obj => {
                    return (obj.contactUserId ? obj.contactUserId.toString() : null)

                });
                const contactIds = [...contactIdsRaw, authUserId]
                const filteredUserIds = usersIds.filter(obj => !contactIds.includes(obj));

                const filteredContactIds = contactIds ? contactIds.filter(obj => obj ? !usersIds.includes(obj) : null) : contactIds;
                // console.log('filteredContactIds', filteredContactIds, filteredContactIds)
                const users = rawUsersInTheSchool.map(item => {
                    if (filteredUserIds.includes(item._id.toString())) {
                        console.log("works")
                        return {
                            _id: item._id,
                            lastName: item.lastName,
                            firstName: item.firstName,
                            source: "users"
                        }
                    }
                })

                const StudentModel = await conn.model('Student', studentsSchema);

                const rawStudents = await StudentModel.find({ school_id: schoolId }).lean();
                const rawStudentIds = rawStudents.map(obj => obj._id.toString());

                const filteredStudentIds = rawStudentIds.filter(obj => !filteredContactIds.includes(obj));
                // console.log(filteredStudentIds.length, rawStudentIds.length)

                const students = rawStudents.map(item => {
                    if (item.last_name && filteredStudentIds.includes(item._id.toString())) {
                        return {
                            _id: item._id,
                            lastName: item.last_name,
                            firstName: item.first_name,
                            source: "students"
                        };
                    }

                });

                const result = [...users, ...students]
                // const results = rawResult.filter(elem1 => !contactList.some(elem2 => elem1._id === elem2.contactUserId));

                return res.send({ result });
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
