import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Title from '../imports/title'
import Layout from '../imports/layout'

const Login = () => {
  const router = useRouter()
  const [error, setError] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const onUsernameChange = event => setUsername(event.target.value)
  const onPasswordChange = event => setPassword(event.target.value)

  const setToken = token => {
    localStorage.setItem('token', token)
    router.push('/')
  }
  const login = () => {
    fetch('/api/login', {
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ username, password }),
      method: 'POST'
    }).then(e => e.json())
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
