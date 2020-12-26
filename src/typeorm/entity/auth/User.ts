import { Field, ID, ObjectType } from 'type-graphql'
import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  PrimaryGeneratedColumn,
} from 'typeorm'

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
