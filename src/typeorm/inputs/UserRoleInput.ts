import { InputType, Field } from 'type-graphql'

@InputType()
export class UserRoleInput {
  @Field()
  role: string
}
