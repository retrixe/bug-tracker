import { type MongoClient, type Db } from 'mongodb'
declare global {
  var connection: MongoClient // eslint-disable-line no-var
  var db: Db // eslint-disable-line no-var
}
