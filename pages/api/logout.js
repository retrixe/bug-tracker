import { tokens } from './login'

export default async (req, res) => {
  if (req.method === 'POST') {
    try {
      if (!req.headers.authorization || typeof req.headers.authorization !== 'string') {
        return res.status(400).json({ error: 'Authorization header is invalid!' })
      }
      if (!tokens[req.headers.authorization]) {
        return res.status(403).json({ error: 'Invalid credentials have been provided!' })
      }
      delete tokens[req.headers.authorization.split(' ').pop()]
      return res.status(200).json({ success: true })
    } catch (e) {
      console.error(e)
      res.status(500).json({ error: 'Internal Server Error!' })
    }
  } else res.status(405).json({ error: 'Method Not Allowed!' })
}
