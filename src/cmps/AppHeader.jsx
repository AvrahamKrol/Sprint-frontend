import { Link, NavLink } from 'react-router-dom'
import { useLocation, useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { logout } from '../store/actions/user.actions'
import { setFilterBy } from '../store/actions/gig.actions'

import logo from '../../public/img/logo.png'
import { GigFilter } from './GigFilter'

export function AppHeader() {
  const user = useSelector((storeState) => storeState.userModule.user)
  const filterBy = useSelector((storeState) => storeState.gigModule.filterBy)
  const navigate = useNavigate()
  const { pathname } = useLocation()

  function onSetFilterBy(filter) {
    if (filter.txt === filterBy.txt) return
    setFilterBy(filter)

    if (pathname !== '/gig') navigate('/gig')
  }

  async function onLogout() {
    try {
      await logout()
      navigate('/')
      showSuccessMsg(`Bye now`)
    } catch (err) {
      showErrorMsg('Cannot logout')
    }
  }

  return (
    <header className="app-header">
      <NavLink to="/" className="logo">
        <img className="logo logo-img" src={logo} alt="logo image" />
      </NavLink>
      <GigFilter filterBy={filterBy} setFilterBy={onSetFilterBy} />
      {!user && (
        <div className="auth-actions">
          <NavLink to="auth/login" className="signin-link">
            <button className="signin-link">Sign in</button>
          </NavLink>
          <NavLink to="auth/login">
            <button className="join-link">Join</button>
          </NavLink>
        </div>
      )}
    </header>
  )
}
