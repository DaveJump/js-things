// class 和 ts 版本，需 ts 编译，不能直接在浏览器执行

;(function() {
  interface Options {
    title?: string
    content?: string
    confirmText?: string
    cancelText?: string
  }
  type Events = 'show' | 'close' | 'confirm'
  interface EventCallback {
    (options: Options): void
  }
  interface CustomDialog {
    new(options: Options)
    show(): void
    close(): void
    on(event: Events, callback: EventCallback): void
    off(event: Events, handlerId: EventCallback)
  }

  class CustomDialog implements CustomDialog {
    assignedOptions: Options
    dialogWrap: HTMLDivElement
    confirmButton: HTMLSpanElement
    cancelButton: HTMLSpanElement
    showEvents: EventCallback[] = []
    closeEvents: EventCallback[] = []
    confirmEvents: EventCallback[] = []
    
    constructor(options: Options) {
      const defaultOptions: Options = {
        title: '',
        content: '',
        confirmText: '确定',
        cancelText: '取消'
      }
      this.assignedOptions = {
        ...defaultOptions,
        ...options
      }
    }
    private init(): void {
      const { title, content, confirmText, cancelText } = this.assignedOptions
      
      // create dialog-wrap
      this.dialogWrap = document.createElement('div')
      this.dialogWrap.classList.add('custom-dialog')
      
      // create title
      const titleEl = document.createElement('div')
      titleEl.classList.add('custom-dialog__title')
      titleEl.innerHTML = title

      // create content
      const contentEl = document.createElement('div')
      contentEl.classList.add('custom-dialog__content')
      contentEl.innerHTML = content
      
      // create footer and buttons
      const footer = document.createElement('div')
      footer.classList.add('custom-dialog__footer')

      this.confirmButton = document.createElement('span')
      this.confirmButton.classList.add('custom-dialog__button', 'button__confirm')
      this.confirmButton.innerHTML = confirmText

      this.cancelButton = document.createElement('span')
      this.cancelButton.classList.add('custom-dialog__button', 'button__cancel')
      this.cancelButton.innerHTML = cancelText

      // insert element
      this.dialogWrap.appendChild(titleEl)
      this.dialogWrap.appendChild(contentEl)
      footer.appendChild(this.confirmButton)
      footer.appendChild(this.cancelButton)
      this.dialogWrap.appendChild(footer)

      document.body.appendChild(this.dialogWrap)

      this.confirmButton.addEventListener('click', () => {
        // this.close()
        this.confirmEvents.forEach(cb => {
          cb(this.assignedOptions)
        })
      }, false)
      this.cancelButton.addEventListener('click', () => {
        this.close()
      }, false)
    }
    show(): void {
      if (!this.dialogWrap) {
        this.init()
      }
      this.dialogWrap.classList.add('visible')
      this.showEvents.forEach(cb => {
        cb(this.assignedOptions)
      })
    }
    close(): void {
      this.dialogWrap.classList.remove('visible')
      this.closeEvents.forEach(cb => {
        cb(this.assignedOptions)
      })
    }
    on(event: Events, callback: EventCallback): void {
      const events: EventCallback[] = this[`${event}Events`]
      if (events) {
        events.push(callback)
      }
    }
    off(event: Events, handlerId: EventCallback): void {
      const events: EventCallback[] = this[`${event}Events`]
      if (events) {
        const id = events.indexOf(handlerId)
        if (id >= 0) {
          events.splice(id, 1)
        }
      }
    }
  }

  window['CustomDialog'] = CustomDialog
})()