import { combineReducers } from 'redux';
import UserReducer from './user/reducers';
import DeviceReducer from './device/reducers';

const rootReducers = combineReducers({
  User: UserReducer,
  Device: DeviceReducer,
});

export default rootReducers;
