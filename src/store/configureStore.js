import {combineReducers, createStore} from 'redux';
import tokenReducer from './../reducers/tokenReducer';
import profileReducer from '../reducers/profileReducer';

const rootReducer = combineReducers({
  token: tokenReducer,
  profile: profileReducer,
});

const configureStore = () => {
  return createStore(rootReducer);
};

export default configureStore;
