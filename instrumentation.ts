import { createAuthBackend } from './src/server/auth'
import { createStorageBackend } from './src/server/storage'

export async function register (): Promise<void> {
  global.authBackend = createAuthBackend()
  await global.authBackend.connect()

  global.storageBackend = createStorageBackend()
  await global.storageBackend.connect()
}
