import { decode, encode, TAlgorithm } from 'jwt-simple'
import { Session } from '../typeorm/entity/auth/Session'
import { CreateSessionInput } from '../typeorm/inputs/CreateSessionInput'
import { DecodeResult, EncodeResult } from './interfaces/Tokens'
import bcrypt from 'bcrypt'

// Always use HS512 to sign the token
const algorithm: TAlgorithm = 'HS512'
const secretKey: string = process.env.JWT_SECRET || ''

export function encodeSession(
  CreateSessionInput: CreateSessionInput
): EncodeResult {
  return {
    token: encode(CreateSessionInput, secretKey, algorithm),
  }
}

export function decodeSession(sessionToken: string): DecodeResult {
  let result: CreateSessionInput

  try {
    result = decode(sessionToken, secretKey, false, algorithm)
  } catch (_e) {
    const e: Error = _e

    // These error strings can be found here:
    // https://github.com/hokaccha/node-jwt-simple/blob/c58bfe5e5bb049015fcd55be5fc1b2d5c652dbcd/lib/jwt.js
    if (
      e.message === 'No token supplied' ||
      e.message === 'Not enough or too many segments'
    ) {
      return {
        type: 'invalid-token',
      }
    }

    if (
      e.message === 'Signature verification failed' ||
      e.message === 'Algorithm not supported'
    ) {
      return {
        type: 'integrity-error',
      }
    }

    // Handle json parse errors, thrown when the payload is nonsense
    if (e.message.indexOf('Unexpected token') === 0) {
      return {
        type: 'invalid-token',
      }
    }

    throw e
  }

  return {
    type: 'valid',
    session: result,
  }
}

export async function hashPassword(plainPassword: string): Promise<string> {
  return bcrypt.hash(plainPassword, 10).then(hash => hash)
}

export async function comparePasswordWithHash(
  plainPassword: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(plainPassword, hash).then(result => result)
}
