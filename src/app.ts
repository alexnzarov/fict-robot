import Telegraf, { Stage, session } from 'telegraf';
import { IContextMessage } from './core/context';

import authentication from './middlewares/authentication';
import sceneManager from './middlewares/sceneManager';

import privateScene from './scenes/private';
import feedbackScene from './scenes/feedback';

const stage = new Stage<IContextMessage>([]);
const bot = new Telegraf(process.env.BOT_TOKEN);

bot.use(session());
bot.use(authentication());
bot.use(stage.middleware());
bot.use(sceneManager())

stage.register(privateScene);
stage.register(feedbackScene);

export default bot;