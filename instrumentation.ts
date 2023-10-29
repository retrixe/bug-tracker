export async function register (): Promise<void> {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { createAuthBackend } = await import('./src/server/auth')
    const { createStorageBackend } = await import('./src/server/storage')

    global.authBackend = createAuthBackend()
    await global.authBackend.connect()

    global.storageBackend = createStorageBackend()
    await global.storageBackend.connect()
  }
}
