/**
 * Singleton Pattern
 */

const Toast = (function() {
  class Toast {
    $message: string
    $timeout: number
    $el: HTMLElement
    private constructor(message: string, timeout?: number) {
      this.$message = message
      this.$timeout = timeout || 1500
      this.hideWithTimeout = debounce(this.hide.bind(this), this.$timeout)
      const el = document.createElement('div')
      const style = {
        backgroundColor: 'rgba(0,0,0,.6)',
        textAlign: 'center',
        width: '100px',
        padding: '30px 60px',
        margin: '200px auto',
        display: 'none',
        color: '#fff'
      }
      el.innerHTML = this.$message
      for (let prop in style) {
        el.style[prop] = style[prop]
      }
      this.$el = el
      document.body.appendChild(el)
    }
    static getToast = (function() {
      // return the same instance if this method is being handled more than once
      let instance
      return function(message: string, timeout?: number) {
        if (!instance) {
          instance = new Toast(message, timeout)
        }
        return instance
      }
    })()

    show(): void {
      this.$el.style.display = 'block'
      this.hideWithTimeout()
    }

    private hideWithTimeout: () => void

    hide(): void {
      this.$el.style.display = 'none'
    }
  }

  function debounce(handler: () => void, timeout: number = 1500) {
    let timer
    return function() {
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(handler, timeout)
    }
  }

  return Toast
})()
