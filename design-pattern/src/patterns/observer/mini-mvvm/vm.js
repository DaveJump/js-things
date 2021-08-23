;(function (globalThis) {
  // 储存订阅者并发布消息
  class Dep {
    constructor() {
      this.id = Dep.depId++
      this.subs = []
    }
    static depId = 0 // 记录已经生成的 Dep 的 id
    static target = null // target 记录临时的当前的订阅者
    // 添加订阅者
    addSub(sub) {
      this.subs.push(sub)
    }
    // 向订阅者添加相关联的 Dep 实例
    depend() {
      Dep.target.addDep(this)
    }
    // 通知所有订阅者更新
    notify() {
      this.subs.forEach(sub => {
        sub.update()
      })
    }
  }

  // 观察者，用于观察属性值变动
  class Observer {
    constructor(value) {
      this.value = value
      this.walk(this.value)
    }
    walk(value) {
      // 为对象添加监听
      Object.keys(value).forEach(key => {
        this.convert(key, value)
      })
    }
    convert(key, val) {
      defineReactive(this.value, key, val)
    }
  }
  function defineReactive(obj, key, val) {
    const dep = new Dep()
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get() {
        // Watcher 实例在实例化过程中，get 方法会读取 data 中的某个属性，从而触发当前 getter 并为 watcher 添加对应管理员 dep
        if (Dep.target) {
          dep.depend()
        }
        return val
      },
      set(newVal) {
        val = newVal
        // 通知所有观察者更新变化
        dep.notify()
        return newVal
      }
    })
  }
  function observe(value) {
    // 非对象类型不处理
    if (!value || typeof value !== 'object') {
      return
    }
    return new Observer(value)
  }

  // 订阅者，订阅信息
  class Watcher {
    constructor(vm, prop, cb) {
      this.vm = vm
      this.watchProp = prop
      this.callback = cb
      // 获取更新前的值
      this.value = this.get()
    }
    static deps = {}
    // 添加对应管理员 dep
    addDep(dep) {
      let depId = dep.id
      // 判断 depId 避免重复添加，一个管理员(dep)管理一批订阅者(watcher)
      if (!Watcher.deps.hasOwnProperty(depId)) {
        dep.addSub(this)
        Watcher.deps[depId] = dep
      }
    }
    // 对外暴露的接口，用于在订阅的数据被更新时，由订阅者管理员(Dep)调用
    update() {
      this.run()
    }
    run() {
      const val = this.get()
      if (val !== this.value) {
        this.value = val
        this.callback(this.value, this.vm)
      }
    }
    get() {
      // 当前订阅者(Watcher)读取被订阅数据的最新更新后的值时，通知订阅者管理员收集当前订阅者
      Dep.target = this
      // 此处触发已被 observe 属性的 getter
      let value = this.vm._data[this.watchProp]
      // 清空当前 dep target（watcher）
      Dep.target = null
      return value
    }
  }

  class VM {
    constructor(options) {
      this.$options = options
      this._data = options.data
      // 将 data 代理到实例上
      this._proxy()
      // 实例化先 observe 数据
      observe(this._data)
    }
    $watch(prop, cb) {
      new Watcher(this, prop, cb)
    }
    // 代理到 vm 实例上
    _proxy() {
      Object.keys(this._data).forEach(key => {
        Object.defineProperty(this, key, {
          enumerable: true,
          configurable: true,
          get: () => this._data[key],
          set: val => {
            // 设置实例属性值相当于设置已经被观察的 _data 对象
            this._data[key] = val
          }
        })
      })
    }
  }

  globalThis['VM'] = VM
  return VM
})(window)
