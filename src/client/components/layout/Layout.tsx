import React, { useContext } from 'react'
import api from '../../hooks/api'
import AuthContext from '../../hooks/authContext'
import UnstyledLink from './UnstyledLink'
import styles from './Layout.module.scss'

// TODO: Awful header
// TODO: No dark mode
// TODO: Center contents like GitHub
const Layout = (props: React.PropsWithChildren<Record<string, unknown>>): JSX.Element => {
  const auth = useContext(AuthContext)
  const logout = (): void => {
    api.post('logout', { throwHttpErrors: false }).then(() => {
      localStorage.removeItem('bug-tracker:token')
      window.location.reload()
    }).catch(console.error)
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
