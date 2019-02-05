import { combineReducers } from 'redux';

import taskStore from './TaskReducer';
import currentTaskStore from './CurrentTaskReducer';

export default combineReducers({
    taskStore,
    currentTaskStore,
});