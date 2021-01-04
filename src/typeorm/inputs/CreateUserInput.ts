import { InputType, Field } from 'type-graphql'
import { UserRoles } from '../entity/auth/UserRoles'

@InputType()
export class CreateUserInput {
  @Field()
  username: string

  @Field()
  password: string
}
