import config from '../../config.json'
import mongodb from 'mongodb'

// On startup, create table.
export const initialiseDb = async () => {
  if (global.db && global.connection && global.connection.isConnected()) return global.db
  try {
    global.connection = await mongodb.connect(config.mongoUrl, {
      useNewUrlParser: true, useUnifiedTopology: true
    })
    global.db = global.connection.db('bug-tracker')
    return global.db
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

export const getIssues = async (includeHidden) => {
  await initialiseDb()
  return (await db.collection('issues').find({}).toArray()).map(issue => {
    delete issue._id
    return issue
  }).filter(issue => includeHidden || !issue.hidden) // includeHidden is an override.
}

export default async (req, res) => {
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
