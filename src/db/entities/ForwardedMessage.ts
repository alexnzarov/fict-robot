import { Entity, Column, PrimaryColumn, BaseEntity } from "typeorm";

@Entity("forwarded_messages")
class ForwardedMessage extends BaseEntity {
  @PrimaryColumn()
  public id: string;

  @Column({ name: 'user_id', type: 'bigint' })
  public userId: number;
}

export { ForwardedMessage };