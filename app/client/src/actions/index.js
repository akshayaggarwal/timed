import { CALL_API } from '../middleware/api'

import AuthService from '../utils/AuthService'

// import AuthService to deal with all the actions related to auth
const auth = new AuthService('SyZVm6XmXC4JgIBfw1sj3iHTEdmJ59UC', 'timed.auth0.com');

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_ERROR = 'LOGIN_ERROR'

function loginRequest() {
  console.log('Request')
  return {
    type: LOGIN_REQUEST
  }
}

function loginSuccess(profile) {
  console.log('Success')
  return {
    type: LOGIN_SUCCESS,
    profile
  }
}

function loginError(error) {
  return {
    type: LOGIN_ERROR,
    error
  }
}

// export function login() {
//   // const lock = new Auth0Lock('SyZVm6XmXC4JgIBfw1sj3iHTEdmJ59UC', 'timed.auth0.com', {})
//   return dispatch => {
//     lock.show((error, profile, token) => {
//       if(error) {
//         return dispatch(loginError(error))
//       }
//       localStorage.setItem('profile', JSON.stringify(profile))
//       localStorage.setItem('id_token', token)
//       return dispatch(loginSuccess(profile))
//     })
//   }
// }
export function login() {
  auth.lock.show()
  dispatch(loginRequest())
}

export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'

function logoutSuccess(profile) {
  return {
    type: LOGOUT_SUCCESS
  }
}

export function logout() {
  return dispatch => {
    localStorage.removeItem('id_token')
    localStorage.removeItem('profile')
    return dispatch(logoutSuccess())
  }
}

// export const JEDIS_REQUEST = 'JEDIS_REQUEST'
// export const JEDIS_SUCCESS = 'JEDIS_SUCCESS'
// export const JEDIS_FAILURE = 'JEDIS_FAILURE'

// function fetchJedis() {
//   return {
//     [CALL_API]: {
//       types: [ JEDIS_REQUEST, JEDIS_SUCCESS, JEDIS_FAILURE ],
//       endpoint: 'jedis',
//       authenticatedRequest: false
//     }
//   }
// }

// export function loadJedis() {
//   return dispatch => {
//     return dispatch(fetchJedis())
//   }
// }

// export const JEDI_REQUEST = 'JEDI_REQUEST'
// export const JEDI_SUCCESS = 'JEDI_SUCCESS'
// export const JEDI_FAILURE = 'JEDI_FAILURE'

// function fetchJedi(id) {
//   return {
//     [CALL_API]: {
//       types: [ JEDI_REQUEST, JEDI_SUCCESS, JEDI_FAILURE ],
//       endpoint: `jedis/${id}`,
//       authenticatedRequest: true
//     }
//   }
// }

// export function loadJedi(id) {
//   return dispatch => {
//     return dispatch(fetchJedi(id))
//   }
// }
