import { Router, Request, Response } from 'express';
import { UserController } from './controllers/user-controller';
import { ContactController } from './controllers/contact-controller';
import { CityController } from './controllers/city-controller';
import { SchoolController } from './controllers/school-controller';
import { QuestionController } from './controllers/question-controller';
import { AnswerController } from './controllers/answer-controller';
import { FutureController } from './controllers/future-controller';

export const routesList = (router: Router) => {
    //      router.post('/user/changeInfo', UserController.changeInfo);
    router.post('/user/checkPromo', UserController.checkPromo);
    router.get('/contact/school', ContactController.allPeopleInSchool);
    router.get('/contact/relevant', ContactController.allRelevantList);
    router.get('/contact/user', ContactController.userContactList);
    router.post('/contact/add', ContactController.addContact);
    router.get('/city/all', CityController.allCity);
    router.get('/schools', SchoolController.allSchool);
    router.get('/questions', QuestionController.nQuestions);//тестовый запрос, астоящий запрос ниже
    // router.get('/question/pack', QuestionController.getQuestionPack)// 
    router.get('/userInfo/:userId', UserController.userInfo);
    // registration
    router.post('/user/classNumber', UserController.addClassNumber);//сохраняем номер класса
    router.post('/user/school', UserController.addSchool);//сохраняем школу юзера
    router.post('/user/name', UserController.addName);//сохраняем имя юзера
    router.post('/user/surname', UserController.addSurname);//сохраняем фамилию юзера
    router.post('/user/registrationFinished', UserController.registrationFinished)
    //     //contact user есть далее
    router.post('/user/gender', UserController.addGender);
    router.post('/user/nonce', UserController.updateNonce);
    router.post('/user/order', UserController.updateOrder);//сохраняем пол юзера
    router.post('/user/questionNumber', UserController.updateQuestionNumber);//сохраняем пол юзера
    router.get('/user/data', UserController.getUser);//получаем данные себя
    router.get('/user/allow', UserController.allowNextGame);//проверка доступности сыграть следующую игру
    router.get('/user/coins', UserController.coinsTotal);//монеты всего
    router.get('/user/addCoins', UserController.addCoins);//монеты новые добавить после игры
    router.get('/complements', AnswerController.viewComplements);//монеты новые добавить после игры
    // router.post('/relevant/block', AnswerController.blockRelevant);//монеты новые добавить после игры
    //  router.post('/contact/block', AnswerController.blockRelevant);//монеты новые добавить после игры
    router.delete('/contact/delete', ContactController.deleteContact);
    router.get('/buy/random', FutureController.buyRandom);
    router.post('/buy/certain', FutureController.buyCertain);


    //router.post('/user/surname', UserController.addSurname);//сохраняем фамилию юзера
    // //check promo наверху
    router.post('/user/answer', AnswerController.addAnswer);//сохраняем один из ответов на вопрос юзера
    //     router.post('/finished/package', UserController.finishedPackage);//сохраняем номер пакета с вопросами юзера, чтобы в след раз отправить другой
    //     router.post('/shop/particular/:contacUserId', ShopController.addNextInPackage);//добавляет юзера в список тех кто следующий на попадание в чей-то список вопросов
    //     router.post('/shop/random', ShopController.addNextInPackage);//добавляет юзера в список тех кто следующий на попадание в чей-то список вопросов
    //     router.post('/buing/random', UserController.addSurname);//сохраняем фамилию юзера
    //     router.get('/contactList/:userId', ContactController.userContactList);
    //     router.get('/ignoreList/:userId', UserController.userBlockList);//get list of ignored users//заметки:

    //     router.post('/ignoreUser/:contactUserId', UserController.ignoreUser);//ignore a user//заметки:

    //     router.delete('/unignoreUser/:ignoreUserId', UserController.unignoreUser);//unignore a users//заметки:


    //     router.get('/contactUser/:userId/userId', UserController.contactUser);//allow contact with a user//заметки:
    //     router.delete('/uncontactUser/:userId/:contactUserId', UserController.uncontactUser);//uncontact a users//заметки:
    //     router.
}

