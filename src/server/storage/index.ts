import type Issue from '../../shared/types/issue'
import { type IssueWithoutBody } from '../../shared/types/issue'
import type Label from '../../shared/types/label'
import MockStorageBackend from './mock'
import MongoDBStorageBackend from './mongodb'
import config from '../config'

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
  // TODO: Add search and pagination
  getIssues: (includeHidden?: boolean) => Promise<IssueWithoutBody[]>
  getLabels: () => Promise<Label[]>
}
