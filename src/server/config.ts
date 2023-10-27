import config from '../../config.json'

export default config as unknown as {
  mongoUrl?: string
  redisUrl?: string
  mythicAuth?: boolean
}
