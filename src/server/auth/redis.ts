import type AuthBackend from '.'
import { createHash } from 'crypto'
import { readFile } from 'fs/promises'
import { Redis } from 'ioredis'
import { type AuthState, decodeToken, encodeToken } from '.'

const hash = (str: string): string => createHash('sha256').update(str).digest().toString('hex')

export default class RedisAuthBackend implements AuthBackend {
  tokenStoreKey = 'bug-tracker:tokens'
  redis: Redis
  constructor (redisUrl: string) {
    this.redis = new Redis(redisUrl)
  }

  async connect (): Promise<void> { /* NOOP */ }

  async login (username: string, password: string): Promise<string | null> {
    const users = JSON.parse(await readFile('users.json', { encoding: 'utf8' }))
    if (users[username] !== hash(password)) {
      return null
    }
    const token = encodeToken(username, Date.now())
    await this.redis.sadd(this.tokenStoreKey, token)
    return token
  }

  async logout (token: string): Promise<boolean> {
    return await this.redis.srem(this.tokenStoreKey, token) >= 1
  }

  async validate (token: string): Promise<AuthState | null> {
    const tokenData = decodeToken(token)
    return tokenData && await this.redis.sismember(this.tokenStoreKey, token)
      ? { ...tokenData, privileged: true }
      : null
  }
}
