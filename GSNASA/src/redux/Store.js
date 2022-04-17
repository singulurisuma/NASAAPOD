import { createStore } from 'redux'
import RootReducer from './RootReducers';

const store = createStore(RootReducer)

export default store;