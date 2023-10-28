import type AuthBackend from './src/server/auth'
import type StorageBackend from './src/server/storage'
declare global {
  var authBackend: AuthBackend // eslint-disable-line no-var
  var storageBackend: StorageBackend // eslint-disable-line no-var
}
