import { MongoClient, Db } from 'mongodb'
declare global {
  var connection: MongoClient
  var db: Db
}
