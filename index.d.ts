import type AuthBackend from './src/server/auth'
import type StorageBackend from './src/server/storage'
declare global {
  var authBackend: AuthBackend
  var storageBackend: StorageBackend // eslint-disable-line no-var
}
