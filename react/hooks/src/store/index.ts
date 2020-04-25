import { createStore } from 'redux'
import rootReducer from './reducers'
import { FilterState } from './reducers/filter'
import { SaveFilterValueAction } from './actions/filter'

export interface StoreStateModules {
  filter: FilterState
}

export default createStore<StoreStateModules, SaveFilterValueAction, null, null>(rootReducer)
