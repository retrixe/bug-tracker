import MythicAuth from '@mythicmc/auth'
import RedisAuthBackend from './redis'
import { type AuthState, decodeToken, encodeToken } from '.'

const permissionNamespace = 'bugtracker.*'
const userPermission = 'bugtracker.user'
const adminPermission = 'bugtracker.admin'

export default class MythicAuthBackend extends RedisAuthBackend {
  client: MythicAuth

  constructor (redisUrl: string) {
    super(redisUrl)
    this.client = new MythicAuth(redisUrl)
  }

  async connect (force?: boolean): Promise<void> {
    await super.connect()
    await this.client.connect(permissionNamespace, force)
  }

  async exists (username: string): Promise<boolean> {
    return await this.client.check(username, userPermission, '')
  }

  async login (username: string, password: string): Promise<string | null> {
    const validAuth = await this.client.check(username, userPermission, password)
    if (validAuth) {
      const token = encodeToken(username, Date.now())
      await this.redis.sadd('bug-tracker:tokens', token)
      return token
    }
    return null
  }

  async validate (token: string): Promise<AuthState | null> {
    const tokenData = decodeToken(token)
    const validToken = tokenData && await this.redis.sismember(this.tokenStoreKey, token) >= 1
    const hasPerm = !!validToken && await this.client.check(tokenData.username, adminPermission)
    return validToken ? { ...tokenData, privileged: hasPerm } : null
  }
}
