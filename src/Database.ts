import { Connection, createConnection } from 'typeorm'
import { UserRoles } from './typeorm/entity/auth/UserRoles'
import { RolesEnum } from './typeorm/enums/Roles'
import { UserRoleInput } from './typeorm/inputs/UserRoleInput'

export let db: Connection

export async function initializeDatabase(): Promise<Connection> {
  db = await createConnection().catch(err => {
    throw new Error(err)
  })
  await populateDatabase()
  return db
}

async function populateDatabase(): Promise<void> {
  const roles: UserRoleInput[] = []
  for (const role in RolesEnum) {
    if (isNaN(Number(role))) {
      let roleInput = new UserRoleInput()
      roleInput = { role }
      roles.push(roleInput)
    }
  }

  await db
    .createQueryBuilder()
    .insert()
    .into(UserRoles)
    .values(roles)
    .onConflict('("role") DO NOTHING')
    .execute()
}
