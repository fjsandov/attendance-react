import { createSelector } from 'reselect';
import get from 'lodash/get';
// eslint-disable-next-line import/no-cycle
import getApi from '../../services/api';

const types = {
  LOGIN: 'sessions/LOGIN',
  LOGOUT: 'sessions/LOGOUT',
  LOGIN_SUCCESS: 'sessions/LOGIN_SUCCESS',
  LOGOUT_SUCCESS: 'sessions/LOGOUT_SUCCESS',
};

const INITIAL_STATE = {
  jwtToken: undefined,
  id: undefined,
  email: undefined,
  admin: false,
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.LOGIN_SUCCESS: {
      const {
        jwtToken, id, email, admin,
      } = action.payload;
      return {
        ...state, jwtToken, id, email, admin,
      };
    }
    case types.LOGOUT_SUCCESS: {
      return { ...state, ...INITIAL_STATE };
    }
    default:
      return state;
  }
}

export function login({ email: credentialsEmail, password }) {
  return (dispatch) => {
    dispatch({ type: types.LOGIN });
    return getApi().session.login(credentialsEmail, password)
      .then(({
        jwt_token: jwtToken, id, email, admin,
      }) => dispatch({
        type: types.LOGIN_SUCCESS,
        payload: {
          jwtToken, id, email, admin,
        },
      }));
  };
}

export function logout() {
  return async (dispatch) => {
    dispatch({ type: types.LOGOUT });
    return getApi().session.logout()
      .then(() => dispatch({ type: types.LOGOUT_SUCCESS }));
  };
}

const getSession = (state) => state.session;

export const getJwtToken = createSelector(
  getSession,
  (session) => get(session, 'jwtToken'),
);

export const getIsSignedIn = createSelector(
  getJwtToken,
  (jwtToken) => Boolean(jwtToken),
);
