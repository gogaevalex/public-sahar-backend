import TelegramBot from 'node-telegram-bot-api';
import { UserModel } from '../models/user-model';
import { randomPromo } from '../utils/randomPromo';


const token = "5736341277:AAGeBwYCLWa8TAfcu_dSvj9otJZtoKBBzkM";
const bot = new TelegramBot(token, { polling: true });
// const webAppUrl = 'http://85.172.205.198:8081';
const webAppUrl = 'https://main--astounding-gaufre-825ca5.netlify.app';

const getStartMessage = (name?: string) => {
    return `Привет ${name}! Я SAHAR BOT`;
};

const events = {
    start: '/start'
}


bot.onText(RegExp(events.start), async (msg, match) => {
    const chatId = msg.chat.id;
    try {

        const userCurrent = await UserModel.findOne({ chatId });
        console.log(msg)
        if (!userCurrent) {
            console.log('user current', userCurrent)
            const user = new UserModel({
                chatId: chatId,
                username: msg.from?.username,
            });
            const promo = randomPromo(10);
            const checkPromo = await UserModel.findOne({ promo });
            if (!checkPromo) {
                user.promo = promo;
                await user.save();
            } else {
                await bot.sendMessage(chatId, 'Перезапустите бота!')
            }
        }
    } catch (err) {
        console.log('bot /start', err);
    }

    await bot.sendMessage(chatId, 'Заходи в наш SAHAR по кнопке ниже', {
        reply_markup: {
            inline_keyboard: [
                [{ text: 'Открыть приложуху', web_app: { url: webAppUrl } }]
            ]
        }
    })

});

bot.on("polling_error", (msg) => console.log(msg));

bot.on('error', (msg: any) => console.log(msg));

export default bot;
