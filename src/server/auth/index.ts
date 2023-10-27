import InMemoryAuthBackend from './memory'

export const createAuthBackend = (): AuthBackend => {
  // if (config.mythicAuth) {
  //   if (!config.redisUrl) {
  //     throw new Error('MythicMC authentication backend requires a Redis URL in config!')
  //   }
  //   return new MythicAuthBackend(config.redisUrl)
  // } else if (config.redisUrl) {
  //   return new RedisAuthBackend(config.redisUrl)
  // } else {
  return new InMemoryAuthBackend()
  // }
}

export default interface AuthBackend {
  connect: () => Promise<void>

  login: (username: string, password: string) => Promise<string | null>
  logout: (token: string) => Promise<boolean>
  validate: (token: string) => Promise<[string, boolean] | null>
}
