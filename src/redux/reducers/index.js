import { combineReducers } from 'redux';
import personasReducer from './personasReducer';

const rootReducer = combineReducers({
  personas: personasReducer,
});

export default rootReducer;