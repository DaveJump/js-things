import createStore from '../store'
import React from 'react'

const isServer = typeof window === 'undefined'
const __NEXT_REDUX_STORE__ = '__NEXT_REDUX_STORE__'

function getOrCreateStore(initialState) {
  // 判断是否为服务端，如果为服务端环境则返回新的 store 实例，如果为浏览器环境则常驻一份 store
  if (isServer) {
    return createStore(initialState)
  }
  if (!window[__NEXT_REDUX_STORE__]) {
    window[__NEXT_REDUX_STORE__] = createStore(initialState)
  }
  return window[__NEXT_REDUX_STORE__]
}

export default (Comp) => {
  class WithReduxApp extends React.Component {
    constructor(props) {
      super(props)
      // 每次渲染都返回新的 store 实例
      this.reduxStore = getOrCreateStore(props.initialReduxState)
    }

    static async getInitialProps(ctx) {
      const reduxStore = getOrCreateStore()

      // 透传 reduxStore ，使每个页面在 getInitialProps 中都能拿到带有 reduxStore 的 ctx
      ctx.reduxStore = reduxStore
      
      let appProps = {}
      if (typeof Comp.getInitialProps === 'function') {
        appProps = await Comp.getInitialProps(ctx)
      }
  
      return {
        ...appProps,
        // 这里选择直接传入 state 而不是整个 reduxStore 对象，是因为 next 会把 getInitialProps 方法返回的对象序列化成字符串放到 window 中（script 标签的形式），再反序列化创建对象。整个 reduxStore 对象包含很多属性（包括函数这种不能被序列化的属性），会导致序列化失败
        initialReduxState: reduxStore.getState()
      }
    }

    render() {
      const { Component, pageProps, ...rest } = this.props

      return (
        <Comp Component={Component} pageProps={pageProps} reduxStore={this.reduxStore} {...rest} />
      )
    }
  }
  return WithReduxApp
}