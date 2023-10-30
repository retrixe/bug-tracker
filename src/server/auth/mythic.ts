import Redis from 'ioredis'
import RedisAuthBackend from './redis'
import { type AuthState, decodeToken, encodeToken } from '.'

const permissionNamespace = 'bugtracker.*'
const userPermission = 'bugtracker.user'
const adminPermission = 'bugtracker.admin'

export default class MythicAuthBackend extends RedisAuthBackend {
  promises = new Map<string, {
    resolve: (value: boolean) => void
    timeout: NodeJS.Timeout
  }>()

  pub: Redis
  sub: Redis

  constructor (redisUrl: string) {
    super(redisUrl)
    this.pub = new Redis(redisUrl)
    this.sub = new Redis(redisUrl)
  }

  async connect (force?: boolean): Promise<void> {
    await super.connect()
    if (this.sub.mode === 'subscriber' && !force) {
      return // Don't reconnect if already connected.
    }
    await this.sub.psubscribe(`mythicauthservice:response:${permissionNamespace}`)
    this.sub.on('pmessage', (pattern, channel, message) => {
      const permission = channel.split(':')[2]
      const { request, authorised } = JSON.parse(message)
      const promise = this.promises.get(permission + ' ' + request)
      if (promise) {
        clearTimeout(promise.timeout)
        this.promises.delete(request)
        promise.resolve(authorised)
      }
    })
  }

  async #checkPerm (username: string, permission: string, password?: string): Promise<boolean> {
    if (password === '') return false
    const request = JSON.stringify({ username, password })
    const promise = new Promise<boolean>((resolve, reject) => {
      this.promises.set(permission + ' ' + request, {
        resolve,
        timeout: setTimeout(() => {
          reject(new Error('Timeout when waiting for auth response from Minecraft server!'))
        }, 5000)
      })
    })
    await this.pub.publish(`mythicauthservice:request:${permission}`, request)
    return await promise
  }

  async login (username: string, password: string): Promise<string | null> {
    const validAuth = await this.#checkPerm(username, userPermission, password)
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
    const hasPerm = !!validToken && await this.#checkPerm(tokenData.username, adminPermission)
    return validToken ? { ...tokenData, privileged: hasPerm } : null
  }
}
