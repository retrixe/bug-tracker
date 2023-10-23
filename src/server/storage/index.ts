import type Issue from '../../shared/types/issue'
import MongoDBStorageBackend from './mongodb'
import config from '../config'

export const createStorageBackend = (): StorageBackend => {
  if (config.mongoUrl) {
    return new MongoDBStorageBackend(config.mongoUrl)
  }
  throw new Error('No storage backend has been configured!')
}

export default interface StorageBackend {
  connect: () => Promise<void>

  getIssue: (id: number) => Promise<Issue | null>
  getIssues: (includeHidden: boolean) => Promise<Issue[]>
}
