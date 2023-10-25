import type Issue from '../../shared/types/issue'
import MongoDBStorageBackend from './mongodb'
import config from '../config'
import MockStorageBackend from './mock'

export const createStorageBackend = (): StorageBackend => {
  if (config.mongoUrl) {
    return new MongoDBStorageBackend(config.mongoUrl)
  }
  if (process.env.NODE_ENV === 'development') {
    console.warn('Detected development environment, and no storage backend configured. Loading dummy storage.')
    return new MockStorageBackend()
  }
  throw new Error('No storage backend has been configured!')
}

export default interface StorageBackend {
  connect: () => Promise<void>

  getIssue: (id: number) => Promise<Issue | null>
  getIssues: (includeHidden: boolean) => Promise<Issue[]>
}
