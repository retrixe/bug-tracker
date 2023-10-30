import type AuthBackend from '.'
import { createHash } from 'crypto'
import { readFile } from 'fs/promises'
import { type AuthState, encodeToken, decodeToken } from '.'

const hash = (str: string): string => createHash('sha256').update(str).digest().toString('hex')

export default class InMemoryAuthBackend implements AuthBackend {
  tokens: Record<string, boolean> = {}

  async connect (): Promise<void> { /* NOOP */ }

  async exists (username: string): Promise<boolean> {
    const users = JSON.parse(await readFile('users.json', { encoding: 'utf8' }))
    return !!users[username]
  }

  async login (username: string, password: string): Promise<string | null> {
    const users = JSON.parse(await readFile('users.json', { encoding: 'utf8' }))
    if (users[username] !== hash(password)) {
      return null
    }
    const token = encodeToken(username, Date.now())
    this.tokens[token] = true
    return token
  }

  async logout (token: string): Promise<boolean> {
    return delete this.tokens[token]
  }

  async validate (token: string): Promise<AuthState | null> {
    const tokenData = decodeToken(token)
    return tokenData && this.tokens[token] ? { ...tokenData, privileged: true } : null
  }
}
