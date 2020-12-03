import config from '../../../config.json'
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

export const getIssue = async (id) => {
  await initialiseDb()
  const issue = await db.collection('issues').findOne({ id })
  if (!issue) return
  delete issue._id
  return issue
}

export default async (req, res) => {
  if (req.method === 'GET') {
    try {
      const id = +req.query.id
      if (isNaN(id)) return res.status(200).json({ error: 'Invalid issue ID provided!' })
      const issue = await getIssue(id)
      res.status(200).json(issue ?? { error: 'This issue was not found!' })
    } catch (e) {
      console.error(e)
      res.status(500).json({ error: 'Internal Server Error!' })
    }
  } else res.status(405).json({ error: 'Method Not Allowed!' })
}
