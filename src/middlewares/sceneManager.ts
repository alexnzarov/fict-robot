import { Middleware } from "telegraf";
import { IContextMessage } from "../core/context";
import { Chat } from "../db/entities/Chat";
import logger from "../core/logger";
import { SceneType } from "../core/scenes";

export default (): Middleware<IContextMessage> => async (ctx, next) => {
  const { chat } = ctx;
  
  let scene: SceneType;
  if (chat.type === 'private') {
    scene = SceneType.PRIVATE;
  } else {
    const sceneChat = await Chat.findOne({ id: chat.id });

    if (!sceneChat) {
      logger.warn('Update from unknown source', { id: chat.id, name: chat.title, type: chat.type });
      return;
    }

    scene = sceneChat.scene;
  }

  if (ctx.scene.current?.id != scene) {
    await ctx.scene.enter(scene);
  }
  
  next();
};