import { combineReducers, createStore } from 'redux'
import { counterAddReducer, initialCounterState } from './counter'

const reducers = combineReducers({
  counter: counterAddReducer,
})

// export 一个函数而不是 store 实例，在 app 页面每次渲染都初始化一个新的 store，避免与客户端的 store 不同步（因为客户端的 store 每次刷新后会重新实例化，而已经实例化的 store 实例会常驻服务端进程内）
export default function initializeStore(state) {
  const store = createStore(
    reducers,
    Object.assign(
      {},
      {
        counter: initialCounterState,
      },
      state
    )
  )
  return store
}
