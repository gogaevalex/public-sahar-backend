import express, { Router, Express, Request, Response } from 'express';
// import basicAuth from 'express-basic-auth';
import dotenv from 'dotenv';
// import morgan from 'morgan';
import cookieParser from 'cookie-parser';

dotenv.config({
  path: process.env.NODE_ENV === 'production' ? '.env' : '.env.development'
});

import './src/db/connect';
import bot from './src/bot';
// import { cron } from './src/cron';
import { routesList } from './src/routes';
import cors from 'cors';


// if (process.env.NODE_ENV === 'production') {
//   bot.sendMessage(process.env.TG_ADMIN_GROUP_ID, `[${process.env.STAGE}] deploy successfully`)
// }

export const routes = Router();

const app: Express = express();
const port = process.env.PORT;

app.use(cors({
  origin: ['http://172.29.35.6:3000', 'https://astounding-gaufre-825ca5.netlify.app'],
  credentials: true,
}));
// if (process.env.NODE_ENV === 'production') {
//   app.use(morgan('combined'));
// }

app.use(express.json());
app.use(cookieParser());

// app.use('/cert/add/das1fda124da', basicAuth({
//   users: { '2fimasdfqf': '1298dnasd8fnasd' }
// }));

app.get('/', (req: Request, res: Response) => {
  res.send('VPN');
});

// routes.use(function (req: Request, res, next) {
//     req.bot = bot;
//     next();
// });
bot;

routesList(routes)
app.use('/api', routes);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
