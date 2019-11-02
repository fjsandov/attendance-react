import {
  jsonFetch,
  authJsonFetchBuilder,
} from './fetch';
// eslint-disable-next-line import/no-cycle
import configureStore from '../store';
// eslint-disable-next-line import/no-cycle
import { getJwtToken } from '../store/ducks/session';

export default function getApi() {
  const store = configureStore();
  const authJsonFetch = authJsonFetchBuilder(store, getJwtToken);

  return {
    session: {
      login: (email, password) => jsonFetch('login', {
        method: 'POST',
        body: JSON.stringify({
          user: {
            email,
            password,
          },
        }),
      }),
      logout: () => authJsonFetch('logout', {
        method: 'DELETE',
      }),
    },
  };
}
