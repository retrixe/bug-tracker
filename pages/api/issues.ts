import { type NextApiHandler } from 'next'
import { MongoClient, type Db } from 'mongodb'
import type Issue from '../../src/shared/types/issue'
import config from '../../config.json'

// On startup, create table.
export const initialiseDb = async (): Promise<Db> => {
  if (global.db) {
    await global.connection.connect()
    return global.db
  }
  try {
    const conn = new MongoClient(config.mongoUrl)
    await conn.connect()
    global.connection = conn
    global.db = global.connection.db('bug-tracker')
    return global.db
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

export const getIssues = async (includeHidden = true): Promise<Issue[]> => {
  await initialiseDb()
  const filter = includeHidden ? {} : { hidden: { $ne: true } }
  return await db.collection('issues').find<Issue>(filter).toArray()
}

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'GET') {
    try {
      // TODO: Support confidential issues.
      const issues = await getIssues()
      res.status(200).json(issues)
    } catch (e) {
      console.error(e)
      res.status(500).json({ error: 'Internal Server Error!' })
    }
  } else res.status(405).json({ error: 'Method Not Allowed!' })
}
export default handler
