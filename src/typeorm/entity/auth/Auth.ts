import { Field, ObjectType } from 'type-graphql'
import { DecodeResult } from '../../../auth/interfaces/Tokens'

@ObjectType()
export class Auth {
  @Field(() => String)
  decodeResult: string
}
