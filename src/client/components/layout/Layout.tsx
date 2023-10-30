import React from 'react'
import api from '../../hooks/api'
import useAuth from '../../hooks/useAuth'
import UnstyledLink from './UnstyledLink'
import styles from './Layout.module.scss'

const Layout = (props: React.PropsWithChildren<Record<string, unknown>>): JSX.Element => {
  const auth = useAuth()
  const logout = (): void => {
    api.post('logout').then(window.location.reload).catch(console.error)
  }
  return (
    <div>
      <div className={styles.header}>
        <h1><UnstyledLink href='/'>Bug Tracker</UnstyledLink></h1>
        <div className={styles['flex-spacer']} />
        <h4>
          {auth
            ? <span onClick={logout} className={styles['logout-button']}>Logout</span>
            : <UnstyledLink href='/login'>Login</UnstyledLink>}
        </h4>
      </div>
      <div className={styles['layout-contents']}>
        {props.children}
      </div>
    </div>
  )
}

const LayoutMemo = React.memo(Layout)
export default LayoutMemo
