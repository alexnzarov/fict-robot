import { IContextMessage } from "../../core/context";
import { Middleware } from "telegraf";
import { Chat } from "../../db/entities/Chat";
import { SceneType } from "../../core/scenes";
import { ForwardedMessage } from "../../db/entities/ForwardedMessage";

export default (): Middleware<IContextMessage> => async (ctx, next) => {
  const { message } = ctx;

  if (!message) { return next(); }

  const chat = await Chat.findOne({ scene: SceneType.FEEDBACK });
  const { message_id } = await ctx.telegram.forwardMessage(chat.id, message.chat.id, message.message_id);

  await ForwardedMessage.create({ id: `${chat.id}:${message_id}`, userId: message.from.id }).save();
};
