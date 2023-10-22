import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Title from '../src/client/title'
import Layout from '../src/client/layout'

const Login = (): JSX.Element => {
  const router = useRouter()
  const [error, setError] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const onUsernameChange: React.ChangeEventHandler<HTMLInputElement> =
    event => setUsername(event.target.value)
  const onPasswordChange: React.ChangeEventHandler<HTMLInputElement> =
    event => setPassword(event.target.value)

  const setToken = (token: string): void => {
    localStorage.setItem('token', token)
    router.push('/').catch(console.error)
  }
  const login = (): void => {
    fetch('/api/login', {
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ username, password }),
      method: 'POST'
    }).then(async e => await e.json())
      .then(e => (e.error ? setError(e.error) : setToken(e.token)))
      .catch(() => setError('An unknown error occurred while logging in. Are you online?'))
  }

  return (
    <Layout>
      <Title title='Login - Bug Tracker' url='/login' description='Log into this bug tracker.' />
      <input placeholder='Username' value={username} onChange={onUsernameChange} />
      <br />
      <input placeholder='Password' value={password} onChange={onPasswordChange} type='password' />
      <br />
      <button style={{ width: 185 }} onClick={login}>Login</button>
      {error && <><br /><span style={{ color: 'red' }}>{error}</span></>}
    </Layout>
  )
}

export default Login
