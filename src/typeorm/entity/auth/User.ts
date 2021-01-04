import { Authorized, Field, ID, ObjectType } from 'type-graphql'
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm'
import { UserRoles } from './UserRoles'

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: string

  @Field(() => String)
  @Column()
  password: string

  @Field(() => String)
  @Column({ unique: true })
  username: string

  @ManyToMany(() => UserRoles, { cascade: true })
  @JoinTable()
  roles: UserRoles[]

  // Does not have Column, so it will not be saved to DB (in theory)
  // But I think it will be better leater to make it as Output model
  @Field(() => String)
  JWT: string

  @Field(() => Date)
  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date

  @Field(() => Date)
  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: Date
}
