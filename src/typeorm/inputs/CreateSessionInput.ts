import { InputType, Field } from 'type-graphql'

@InputType()
export class CreateSessionInput {
  @Field()
  username: string
}
