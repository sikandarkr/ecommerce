import { combineReducers } from 'redux';
import user from './user';
import products from './products';

const rootReducer = combineReducers({
  products:products,
  user:user
});

export default rootReducer;