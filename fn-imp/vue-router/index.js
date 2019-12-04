/* eslint-disable */

/**
 * mini vue-router
 */

class HistoryRoute {
  constructor() {
    this.current = null
  }
}

class VueRouter {
  constructor(options) {
    this.mode = options.mode || 'hash'
    this.routes = options.routes || []
    this.routesMap = this.createMap(this.routes)
    this.history = new HistoryRoute()
    this.init()
  }

  init() {
    if (this.mode === 'hash') {
      location.hash ? '' : location.hash = '/'
      window.addEventListener('load', () => {
        this.history.current = location.hash.slice(1)
      })
      window.addEventListener('hashchange', () => {
        this.history.current = location.hash.slice(1)
      })
    }
  }
  createMap(routes) {
    return routes.reduce((memo, current) => {
      memo[current.path] = current.component
      return memo
    }, {})
  }
}

VueRouter.install = function(vue) {
  if (VueRouter.install.installed) return
  VueRouter.install.installed = true
  vue.mixin({
    beforeCreate() {
      if (this.$options && this.$options.router) {
        this._root = this
        this._router = this.$options.router
        vue.util.defineReactive(this, 'current', this._router.history)
      } else {
        this._root = this.$parent._root
      }
      Object.defineProperty(this, '$router', {
        get() {
          return this._root._router
        }
      })
    }
  })
  vue.component('router-view', {
    render(h) {
      const current = this._self._root._router.history.current
      const routesMap = this._self._root._router.routesMap
      return h(routesMap[current])
    }
  })
}

export default VueRouter
