import { type NextApiHandler } from 'next'
// import { cookies } from 'next/headers'

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'POST') {
    try {
      if (!req.body?.username || !req.body.password) {
        return res.status(400).json({
          error: 'Invalid body! Make sure to have a username/password in JSON with ' +
            'Content-Type application/json.'
        })
      }
      const token = await authBackend.login(req.body.username, req.body.password)
      if (!token) {
        return res.status(401).json({ error: 'Invalid credentials have been provided!' })
      }
      // TODO: Use cookies, then accept them in frontend SSR functions as well?
      // cookies().set('X-Authorization', token, {
      //   httpOnly: true, sameSite: 'strict', secure: true, maxAge: 60 * 60 * 24 * 365 })
      return res.status(200).json({ token })
    } catch (e) {
      console.error(e)
      res.status(500).json({ error: 'Internal Server Error!' })
    }
  } else res.status(405).json({ error: 'Method Not Allowed!' })
}
export default handler
