import { combineReducers } from 'redux';
import universities from './universities';

const rootReducer = combineReducers({
  universities: universities,
});

export default rootReducer; 