import type Issue from '../../shared/types/issue'
import { type IssueBodyWithProps, type IssueWithoutContent } from '../../shared/types/issue'
import type Label from '../../shared/types/label'
import MockStorageBackend from './mock'
import MongoDBStorageBackend from './mongodb'
import config from '../config'

export class ValidationError extends Error {
  constructor (message: string) {
    super(message)
    this.name = 'ValidationError'
  }
}

export const createStorageBackend = (): StorageBackend => {
  // FIXME: PostgreSQL and MySQL backends
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
  getIssues: (includeHidden?: boolean) => Promise<IssueWithoutContent[]> // TODO: Add search, pagination
  getLabels: () => Promise<Label[]>

  createIssue: (issue: IssueBodyWithProps) => Promise<number>
}
