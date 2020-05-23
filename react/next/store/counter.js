export const COUNTER_ADD = 'COUNTER_ADD'

export const counterAddAction = (count) => {
  return {
    type: COUNTER_ADD,
    count
  }
}

export const initialCounterState = {
  count: 0
}

export const counterAddReducer = (state, action) => {
  switch (action.type) {
    case COUNTER_ADD:
      return {
        ...state,
        count: action.count
      }
    default:
      return {
        ...state
      }
  }
}
