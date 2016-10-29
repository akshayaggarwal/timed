import { connect } from 'react-redux'
import { loginRequest, logoutSuccess } from '../actions'
import Header from '../components/Header'

const mapStateToProps = (state) => {
  const { isAuthenticated, profile } = state.auth
  return {
    isAuthenticated,
    profile
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLoginClick: () => dispatch(loginRequest()),
    onLogoutClick: () => dispatch(logoutSuccess())
  }
}

const HeaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)

export default HeaderContainer
