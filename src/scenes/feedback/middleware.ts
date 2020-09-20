import { IContextMessage } from "../../core/context";
import { Middleware } from "telegraf";
import { ForwardedMessage } from "../../db/entities/ForwardedMessage";

export default (): Middleware<IContextMessage> => async (ctx, next) => {
  const reply = ctx.message?.reply_to_message;

  if (!reply || !reply.from.is_bot || reply.from.username !== ctx.me) { return next(); }

  const forwardedMessage = await ForwardedMessage.findOne({ id: `${ctx.chat.id}:${reply.message_id}` });

  if (!forwardedMessage) {
    await ctx.reply('Я не смог найти источник этого сообщения.', { reply_to_message_id: ctx.message.message_id });
    return;
  }

  await ctx.telegram.sendCopy(forwardedMessage.userId, ctx.message)
    .catch((e) => ctx.reply(`Я не смог отправить сообщение этому пользователю: ${e}`, { reply_to_message_id: ctx.message.message_id }));
};
