import { randomBytes } from 'crypto'
import config from '../config'
import InMemoryAuthBackend from './memory'
import RedisAuthBackend from './redis'

export const createAuthBackend = (): AuthBackend => {
  // if (config.mythicAuth) {
  //   if (!config.redisUrl) {
  //     throw new Error('MythicMC authentication backend requires a Redis URL in config!')
  //   }
  //   return new MythicAuthBackend(config.redisUrl)
  if (config.redisUrl) {
    return new RedisAuthBackend(config.redisUrl)
  } else {
    return new InMemoryAuthBackend()
  }
}

export const createToken = (username: string, time: number): string => {
  const randomBytesEncoded = randomBytes(16).toString('hex') // 32 characters
  const timeEncoded = time.toString(16).padStart(16, '0')
  const userEncoded = Buffer.from(username).toString('base64').padEnd(24, '=')
  return `${randomBytesEncoded}.${timeEncoded}.${userEncoded}`
}

export default interface AuthBackend {
  connect: () => Promise<void>

  login: (username: string, password: string) => Promise<string | null>
  logout: (token: string) => Promise<boolean>
  validate: (token: string) => Promise<boolean | null>
}
