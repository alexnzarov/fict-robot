import { IContextMessage } from '../../core/context';
import { BaseScene } from 'telegraf';
import { SceneType } from '../../core/scenes';

import start from './start';
import middleware from './middleware';

const scene = new BaseScene<IContextMessage>(SceneType.PRIVATE);

const startFn = start() as any;
const middlewareFn = middleware() as any;

scene.enter((ctx) => {
  const command = ctx.message?.text?.split(' ')[0];

  if (command === '/start') {
    startFn(ctx);
  } else {
    middlewareFn(ctx);
  }
});

scene.start(startFn);
scene.use(middlewareFn);

export default scene;