import { Arg, Mutation, Query, Resolver } from 'type-graphql'
import { encodeSession } from '../../auth/AuthFunctions'
import { User } from '../entity/auth/User'
import { CreateUserInput } from '../inputs/CreateUserInput'
import { UpdateUserInput } from '../inputs/UpdateUserInput'

@Resolver(User)
export class UserResolver {
  // dependency injection
  // constructor(private recipeService: RecipeService) {}

  @Query(() => [User])
  users(): Promise<User[]> {
    return User.find() // this.recipeService.findAll()
  }

  @Query(() => User)
  async user(@Arg('id') id: string): Promise<User> {
    const user = await User.findOne(id) // this.recipeService.findAll()

    if (user) {
      const newSession = new CreateUserInput()

      user.JWT = encodeSession(Object.assign(newSession, user)).token
      return user
    } else throw new Error('User not Found')
  }

  @Mutation(() => User)
  async createUser(@Arg('data') data: CreateUserInput): Promise<User> {
    const user = User.create(data)
    await user.save()
    return user
  }

  @Mutation(() => User)
  async updatedUser(
    @Arg('id') id: string,
    @Arg('data') data: UpdateUserInput
  ): Promise<User> {
    const user = await User.findOne({ id })
    if (!user) throw new Error('User not found!')
    Object.assign(user, data)
    await user.save()
    return user
  }

  @Mutation(() => String)
  async deleteUser(@Arg('id') id: string): Promise<string> {
    const user = await User.findOne(id)
    if (!user) throw new Error('User not found!')
    await user.remove()
    return 'OK'
  }
}
