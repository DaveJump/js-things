// 构造函数版本

;(function() {
  function CustomDialog(options) {
    this.assignedOptions = Object.assign({
      title: '',
      content: '',
      confirmText: '确定',
      cancelText: '取消'
    }, options)

    this.init()
  }
  CustomDialog.prototype.init = function() {
    this.confirmEvents = []
    this.showEvents = []
    this.closeEvents = []

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
        cb.call(this, this.assignedOptions)
      })
    }, false)
    this.cancelButton.addEventListener('click', () => {
      this.close()
    }, false)
  }
  CustomDialog.prototype.show = function() {
    if (!this.dialogWrap) {
      this.init()
    }
    this.dialogWrap.classList.add('visible')
    this.showEvents.forEach(cb => {
      cb.call(this, this.assignedOptions)
    })
  }
  CustomDialog.prototype.close = function() {
    this.dialogWrap.classList.remove('visible')
    this.closeEvents.forEach(cb => {
      cb.call(this, this.assignedOptions)
    })
  }
  CustomDialog.prototype.on = function(event, callback) {
    const events = this[`${event}Events`]
    if (events) {
      events.push(callback)
    }
  }
  CustomDialog.prototype.off = function(event, handlerId) {
    const events = this[`${event}Events`]
    if (events) {
      const id = events.indexOf(handlerId)
      if (id >= 0) {
        events.splice(id, 1)
      }
    }
  }

  window['CustomDialog'] = CustomDialog
})()