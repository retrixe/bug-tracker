import { createHash, randomBytes } from 'crypto'
import { readFile } from 'fs/promises'

export const tokens = {} // TODO: Better system is required.

const INVALID_BODY =
  'Invalid body! Make sure to have a username/password in JSON with Content-Type application/json.'
const hash = (string) => createHash('sha256').update(string).digest().toString('hex')
export default async (req, res) => {
  if (req.method === 'POST') {
    try {
      if (!req.body || !req.body.username || !req.body.password) {
        return res.status(400).json({ error: INVALID_BODY })
      }
      const users = JSON.parse(await readFile('users.json'))
      if (!users[req.body.username] || users[req.body.username] !== hash(req.body.password)) {
        return res.status(401).json({ error: 'Invalid credentials have been provided!' })
      }
      const token = randomBytes(25).toString('base64')
      tokens[token] = req.body.username
      return res.status(200).json({ token }) // TODO: Consider using cookies.
    } catch (e) {
      console.error(e)
      res.status(500).json({ error: 'Internal Server Error!' })
    }
  } else res.status(405).json({ error: 'Method Not Allowed!' })
}
