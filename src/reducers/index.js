import { combineReducers } from 'redux';

import CountReducer from './count-reducer.js';

const rootReducer = combineReducers({
  count: CountReducer,
});

export default rootReducer;
