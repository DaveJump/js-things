import types from '../action-types'
import { FilterValues } from '@/types'
import { Reducer } from 'redux'
import { SaveFilterValueAction } from '../actions/filter'

export interface FilterState {
  filterValue: FilterValues
}

const filterReducer: Reducer<FilterState, SaveFilterValueAction> = (state = { filterValue: 'all' }, action) => {
  switch (action.type) {
    case types.SAVE_FILTER_VALUE:
      return {
        filterValue: action.payload
      }
    default:
      return state
  }
}

export default filterReducer