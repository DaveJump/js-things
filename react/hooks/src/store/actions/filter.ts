import types from '../action-types'
import { Action } from 'redux'
import { FilterValues } from '@/types'

export interface SaveFilterValueAction extends Action {
  payload: FilterValues
}

const saveFilterValue = (payload: FilterValues): SaveFilterValueAction => {
  return {
    type: types.SAVE_FILTER_VALUE,
    payload
  }
}

export default saveFilterValue
