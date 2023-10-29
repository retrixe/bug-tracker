import { type Db, MongoClient } from 'mongodb'
import type StorageBackend from '.'
import type Issue from '../../shared/types/issue'
import type Label from '../../shared/types/label'

export default class MongoDBStorageBackend implements StorageBackend {
  connection: MongoClient
  db: Db

  constructor (url: string) {
    this.connection = new MongoClient(url)
    this.db = this.connection.db('bug-tracker')
  }

  async connect (): Promise<void> {
    await this.connection.connect()
  }

  async getIssues (includeHidden?: boolean): Promise<Issue[]> {
    const filter = includeHidden ? {} : { hidden: { $ne: true } }
    return await this.db.collection('issues').find<Issue>(filter).toArray()
  }

  async getIssue (id: number): Promise<Issue | null> {
    return await this.db.collection('issues').findOne<Issue>({ id })
  }

  async getLabels (): Promise<Label[]> {
    return await this.db.collection('labels').distinct('name')
  }
}
