import { randomBytes } from 'crypto'
import config from '../config'
import InMemoryAuthBackend from './memory'
import MythicAuthBackend from './mythic'
import RedisAuthBackend from './redis'

export const createAuthBackend = (): AuthBackend => {
  if (config.mythicAuth) {
    if (!config.redisUrl) {
      throw new Error('MythicMC authentication backend requires a Redis URL in config!')
    }
    return new MythicAuthBackend(config.redisUrl)
  } else if (config.redisUrl) {
    return new RedisAuthBackend(config.redisUrl)
  } else {
    return new InMemoryAuthBackend()
  }
}

export interface AuthState {
  username: string
  timestamp: number
  privileged: boolean
}

export const encodeToken = (username: string, timestamp: number): string => {
  const randomBytesEncoded = randomBytes(16).toString('hex') // 32 characters
  const timestampEncoded = timestamp.toString(16).padStart(16, '0')
  const usernameEncoded = Buffer.from(username).toString('base64').padEnd(24, '=')
  return `${randomBytesEncoded}.${timestampEncoded}.${usernameEncoded}`
}

export const decodeToken = (token: string): { username: string, timestamp: number } | null => {
  const [randomBytesEncoded, timestampEncoded, usernameEncoded] = token.split('.')
  if (!randomBytesEncoded || !timestampEncoded || !usernameEncoded) {
    return null
  }
  const timestamp = parseInt(timestampEncoded, 16)
  if (isNaN(timestamp)) {
    return null
  }
  const username = Buffer.from(usernameEncoded, 'base64').toString()
  return { username, timestamp }
}

export default interface AuthBackend {
  connect: () => Promise<void>

  login: (username: string, password: string) => Promise<string | null>
  logout: (token: string) => Promise<boolean>
  validate: (token: string) => Promise<AuthState | null>
}
