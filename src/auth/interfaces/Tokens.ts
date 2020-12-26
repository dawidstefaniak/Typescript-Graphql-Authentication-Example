import { CreateSessionInput } from '../../typeorm/inputs/CreateSessionInput'

export interface EncodeResult {
  token: string
}

export interface DecodeResult {
  type: string
  session?: CreateSessionInput
}
