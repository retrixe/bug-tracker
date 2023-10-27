import type AuthBackend from '.'
import { createHash, randomBytes } from 'crypto'
import { readFile } from 'fs/promises'

const hash = (str: string): string => createHash('sha256').update(str).digest().toString('hex')

export default class InMemoryAuthBackend implements AuthBackend {
  tokens: Record<string, [string, boolean]> = {}

  async connect (): Promise<void> { /* NOOP */ }

  async login (username: string, password: string): Promise<string | null> {
    const users = JSON.parse(await readFile('users.json', { encoding: 'utf8' }))
    if (users[username] !== hash(password)) {
      return null
    }
    const token = randomBytes(25).toString('base64')
    this.tokens[token] = [username, true]
    return token
  }

  async logout (token: string): Promise<boolean> {
    return delete this.tokens[token]
  }

  async validate (token: string): Promise<[string, boolean] | null> {
    return this.tokens[token] ?? null
  }
}
