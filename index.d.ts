import type StorageBackend from './src/server/storage'
declare global {
  var storageBackend: StorageBackend // eslint-disable-line no-var
}
