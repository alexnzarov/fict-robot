import { Entity, Column, PrimaryColumn, BaseEntity } from "typeorm";
import { SceneType } from "../../core/scenes";

@Entity("chats")
class Chat extends BaseEntity {
  @PrimaryColumn({ type: 'bigint' })
  public id: number;

  @Column({ name: 'scene' })
  public scene: SceneType;
}

export { Chat };