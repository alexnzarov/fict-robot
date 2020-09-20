import { IContextMessage } from '../../core/context';
import { BaseScene } from 'telegraf';
import { SceneType } from '../../core/scenes';

import middleware from './middleware';

const scene = new BaseScene<IContextMessage>(SceneType.FEEDBACK);
const middlewareFn = middleware();

scene.enter(middlewareFn);
scene.use(middlewareFn);

export default scene;