import { Field, ID, ObjectType } from 'type-graphql'
import { Entity, Column, BaseEntity, PrimaryGeneratedColumn } from 'typeorm'
import { RolesEnum } from '../../enums/Roles'

@ObjectType()
@Entity()
export class UserRoles extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: string

  @Field(() => String)
  @Column({ unique: true })
  role: string
}
