import { Entity, Column, PrimaryColumn, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn, OneToMany, BaseEntity } from "typeorm";
import { User as TelegramUser } from 'telegram-typings';

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin'
};

@Entity("users")
class User extends BaseEntity {
  @PrimaryColumn({ type: 'bigint' })
  public id: number;

  @Column({ nullable: true })
  public username: string;

  @Column({ name: 'first_name', nullable: false })
  public firstName: string;

  @Column({ name: 'last_name', nullable: true })
  public lastName: string;

  @Column({ name: 'role', default: UserRole.USER })
  public role: UserRole;

  @CreateDateColumn({ name: 'created_at' })
  public createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  public updatedAt: Date;

  public hasAccess(role: UserRole) {
    return this.role === role;
  }

  public static default(user: TelegramUser) {
    return User.create({
      id: user.id, 
      username: user.username, 
      firstName: user.first_name, 
      lastName: user.last_name,
    }).save();
  }
}

export { User };