import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
// eslint-disable-next-line import/no-cycle
import session from './session';

const rootReducer = (history) => combineReducers({
  session,
  router: connectRouter(history),
});

export default rootReducer;
