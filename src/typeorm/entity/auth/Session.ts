import { Field, ID, ObjectType } from 'type-graphql'
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  PrimaryGeneratedColumn,
} from 'typeorm'

@ObjectType()
@Entity()
export class Session extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: string

  @Field(() => String)
  @Column()
  username: string

  @Field(() => Date)
  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date

  @Field(() => Date)
  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: Date
}
