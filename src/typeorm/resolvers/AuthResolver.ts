import { Arg, Authorized, Mutation, Query, Resolver } from 'type-graphql'
import {
  comparePasswordWithHash,
  decodeSession,
  encodeSession,
  hashPassword,
} from '../../auth/AuthFunctions'
import { Auth } from '../entity/auth/Auth'
import { User } from '../entity/auth/User'
import { UserRoles } from '../entity/auth/UserRoles'
import { RolesEnum } from '../enums/Roles'
import { CreateUserInput } from '../inputs/CreateUserInput'
import { LoginInput } from '../inputs/LoginInput'

@Resolver(Auth)
export class AuthResolver {
  @Query(() => Auth)
  decrypt(@Arg('JWT') JWT: string): Auth {
    return { decodeResult: JSON.stringify(decodeSession(JWT)) }
  }

  @Mutation(() => User)
  async register(@Arg('data') data: CreateUserInput): Promise<User> {
    // let userInput = new CreateUserInput()
    const hashedPassword = await hashPassword(data.password)

    const role = await UserRoles.findOne({ role: RolesEnum[0] })
    if (role) {
      const userInput = {
        username: data.username,
        password: hashedPassword,
        roles: [role],
      }

      return await User.create(userInput).save()
    } else throw new Error('Wrong role')
  }

  @Authorized(RolesEnum.ADMIN)
  @Query(() => User)
  async login(@Arg('data') data: LoginInput): Promise<User> {
    const userFound = await User.findOne({ username: data.username })
    if (userFound) {
      const authenticated = await comparePasswordWithHash(
        data.password,
        userFound.password
      )
      if (authenticated) {
        const newSession = new CreateUserInput()

        userFound.JWT = encodeSession(
          Object.assign(newSession, userFound)
        ).token
        return userFound
      } else throw new Error('Wrong password')
    } else throw new Error(`User ${data.username} not found`)
  }
}
