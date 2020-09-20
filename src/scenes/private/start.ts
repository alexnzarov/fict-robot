import { IContextMessage } from "../../core/context";
import { Middleware } from "telegraf";

const welcomeText = [
  '<b>Привет.</b>\n',
  'Это бот обратной связи студсовета ФИВТ. Если у вас возникли какие-то проблемы или вопросы, напишите нам про это сюда, чтобы мы смогли вам помочь.\n',
  '<b>Наши ресурсы:</b>\n',
  'Канал: <a href="https://t.me/fict_time">@fict_time</a>',
  'Чат: <a href="https://t.me/fict_talk">@fict_talk</a>'
].join('\n');

export default (): Middleware<IContextMessage> => async (ctx) => {
  ctx.replyWithHTML(welcomeText, { reply_markup: { remove_keyboard: true } });
};
