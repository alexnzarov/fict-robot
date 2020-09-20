import { SceneContextMessageUpdate } from 'telegraf/typings/stage';
import { User } from '../db/entities/User';

export interface IContextMessage extends SceneContextMessageUpdate {
  user: User;
};
