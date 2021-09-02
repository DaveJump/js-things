;(function (io) {
  'use strict'

  class User {
    constructor({ nickName = '', avatar = '', id = '' } = {}) {
      this.setInfo({ nickName, avatar, id })
    }
    setInfo({ nickName, avatar, id }) {
      this.nickName = nickName || this.nickName
      this.avatar = avatar || this.avatar
      this.id = id || this.id
    }
  }

  class Message {
    constructor() {}
  }

  class ChatApp {
    constructor() {
      this.socket = this.initSocket()
      this.els = {
        ...this.prelogin(),
        ...this.premessage(),
        chatLogin: document.getElementById('chat-login'),
        chatRoom: document.getElementById('chat-room'),
        msgBox: document.getElementById('msg-box')
      }
      this.user = new User()
    }

    static proxyEvent({ proxy, event, target, callback }) {
      if (!proxy || !event) {
        return new TypeError('"proxy" and "event" can not be empty.')
      }
      const p = (t, e) => {
        if (!t) return
        if (t.nodeName === target) {
          callback && callback(t, e)
        } else {
          return p(t.parentNode, e)
        }
      }
      target = (target || proxy.nodeName).toUpperCase()
      if (proxy instanceof HTMLElement) {
        proxy.addEventListener(event, e => {
          p(e.target, e)
        })
      }
    }

    initSocket() {
      const socket = io()
      return socket
    }
    prelogin() {
      const nickNameInput = document.getElementById('nick-name-input')
      const loginButton = document.getElementById('login-btn')
      const avatarList = document.getElementById('portrait-list')

      nickNameInput.addEventListener('input', e => {
        this.user.setInfo({
          nickName: e.target.value
        })
      })
      loginButton.addEventListener('click', () => {
        const { nickName, avatar } = this.user
        if (!nickName || !avatar) {
          return alert('请输入昵称和选择头像')
        }
        this.login()
      })

      ChatApp.proxyEvent({
        proxy: avatarList,
        event: 'click',
        target: 'img',
        callback: target => {
          this.user.setInfo({
            avatar: target.getAttribute('src')
          })
          toggleSelect(target)
        }
      })

      const toggleSelect = el => {
        Array.from(this.els.avatarList.querySelectorAll('li')).forEach(el => {
          el.classList.remove('selected')
        })
        if (el && el.parentNode) {
          el.parentNode.classList.add('selected')
        }
      }

      return {
        nickNameInput,
        loginButton,
        avatarList
      }
    }
    premessage() {
      const userList = document.getElementById('user-list')
      const msgInput = document.getElementById('msg-input')

      ChatApp.proxyEvent({
        proxy: userList,
        event: 'click',
        target: 'dl',
        callback: target => {
          console.log(target)
        }
      })

      msgInput.addEventListener('keydown', e => {
        if (e.key !== 'Enter') return
        e.preventDefault()
        this.sendMessage(e.target.value)
        e.target.value = ''
      })

      return {
        userList,
        msgInput
      }
    }
    login() {
      this.switchPage()

      this.user.setInfo({ id: this.socket.id })
      // 保证登录后再监听 join 事件，避免其他还在未登录状态的用户自动跳到聊天页
      this.listen('join', user => {
        this.appendTip(user.nickName + '加入聊天')
      })
      this.listen('users', users => {
        this.refreshUsers(users)
      })
      this.emit('join', {
        user: { ...this.user }
      })
      this.listen('message', data => {
        this.appendMessageBlock(data)
      })
      this.listen('leave', user => {
        this.appendTip(user.nickName + '离开聊天')
      })
    }
    appendTip(tip) {
      const tipNode = document.createElement('div')
      tipNode.innerHTML = `<div class="tip">${tip}</div>`
      this.els.msgBox.appendChild(tipNode)
    }
    refreshUsers(users) {
      let list = ''
      users.forEach(user => {
        list += `
          <div class="user-item">
            <dl>
              <dt><img src="${user.avatar}" alt=""></dt>
              <dd title="${user.nickName}">${user.nickName}</dd>
              ${
                user.id === this.user.id
                  ? `<span class="own-mark">我</span>`
                  : ''
              }
            </dl>
          </div>
        `
      })
      this.els.userList.innerHTML = list
    }
    sendMessage(message) {
      if (!message.trim()) return
      this.emit('message', { user: this.user, message })
      // this.appendMessageBlock({ user: this.user, message })
    }
    appendMessageBlock({ user, message }) {
      let block = `
        <div class="msg-block-base ${
          user.id === this.user.id ? 'own-msg' : 'incoming-msg'
        }">
          <div class="portrait">
            <img src="${user.avatar}" alt="">
          </div>
          <div class="info">
            ${user.id !== this.user.id ? `<div class="nick-name">${user.nickName}</div>` : ''}
            <div class="msg">${message}</div>
          </div>
        </div>
        `
      const frag = document.createElement('div')
      frag.innerHTML = block
      this.els.msgBox.appendChild(frag)
    }
    switchPage() {
      this.els.chatLogin.classList.add('hidden')
      this.els.chatRoom.classList.remove('hidden')
    }
    listen(event, callback) {
      if (!event) return
      this.socket.on(event, data => {
        callback && callback(data)
      })
    }
    emit(event, data = '') {
      if (!event) return
      this.socket.emit(event, data)
    }
  }

  return new ChatApp()
})(io)
