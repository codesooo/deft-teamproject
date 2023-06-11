import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import auth, { authSaga } from './auth';
import loading from "./loading";
import user, { userSaga } from './user';
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage/session"

// const rootReducer = combineReducers({
//   auth,
//   loading,
//   user,
// });

// export function* rootSaga() {
//   yield all([authSaga(), userSaga()]);
// }

// export default rootReducer;

const persistConfig = {
  key: "root",
  storage: storage,
  // whitelist: ['loading']
};

const rootReducer = combineReducers({ 
  auth,
  loading,
  user,
 });

 export function* rootSaga() {
  yield all([authSaga(), userSaga()]);
}
export default persistReducer(persistConfig, rootReducer);