;(function (io) {
  'use strict'

  const util = {
    proxyEvent({ proxy, event, target, callback }) {
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
      if (proxy instanceof HTMLElement) {
        target = (target || proxy.nodeName).toUpperCase()
        proxy.addEventListener(event, e => {
          p(e.target, e)
        })
      }
    }
  }
  class User {
    constructor(info) {
      this.setInfo(info)
    }
    setInfo(info) {
      const { nickname, avatar, id } = info || {}
      this.nickname = nickname ?? (this.nickname || '')
      this.avatar = avatar ?? (this.avatar || '')
      this.id = id ?? (this.id || '')
    }
  }

  class PrivateChat {
    constructor() {
      this.toUser = null
      this.userMessages = new Map()
    }
    setCurrentUser(user) {
      this.toUser = user
    }
    storeUserMessage(targetUser, from, content) {
      const { id } = targetUser
      this.userMessages.set(id, [
        ...(this.userMessages.get(id) || []),
        { ...from, content }
      ])
    }
    getUserMessages(uid) {
      return this.userMessages.get(uid) || []
    }
    prePrivateChat() {
      const userList = document.getElementById('user-list')
      const privateMsgBoxWrap = document.getElementById('private-msg-box-wrap')
      const privateMsgBox = document.getElementById('private-msg-box')
      const privateMsgBoxNickname = document.getElementById(
        'private-msg-box-nickname'
      )
      const backToPublicBtn = document.getElementById('back-to-public')

      util.proxyEvent({
        proxy: userList,
        event: 'click',
        target: 'dl',
        callback: target => {
          const id = target.getAttribute('data-uid')
          const nickname = target.getAttribute('data-uname')
          const avatar = target
            .querySelector('img[alt="avatar"]')
            .getAttribute('src')
          if (this.showPrivateMessages({ id, nickname, avatar })) {
            this.clearUserListSelected()
            target.classList.add('selected')
          }
        }
      })

      backToPublicBtn.addEventListener('click', () => {
        this.closePrivateMsgBox()
      })

      return {
        userList,
        privateMsgBoxWrap,
        privateMsgBox,
        privateMsgBoxNickname
      }
    }
    showPrivateMessages(user) {
      const { id, nickname } = user
      if (this.user.id === id) {
        return alert('不能和自己私聊')
      }
      this.setCurrentUser(user)
      this.getStorePrivateMessages(id)
      this.els.privateMsgBoxNickname.innerHTML = nickname
      this.openPrivateMsgBox()
      return true
    }
    getStorePrivateMessages(id) {
      const messages = this.getUserMessages(id)
      this.els.privateMsgBox.innerHTML = ''
      messages.forEach(m => {
        this.appendMessageBlock({ ...m }, m.content, true)
      })
      this.clearCountTip(id)
    }
    clearCountTip(id) {
      this.getUserNodes().forEach(u => {
        if (u.getAttribute('data-uid') === id) {
          const tip = u.querySelector('.count-tip')
          if (tip) {
            tip.innerHTML = '0'
            tip.classList.add('hidden')
          }
        }
      })
    }
    closePrivateMsgBox() {
      this.els.privateMsgBoxWrap.classList.add('hidden')
      this.els.msgBoxWrap.classList.remove('hidden')
      this.toUser = null
      this.clearUserListSelected()
      this.els.msgInput.focus()
    }
    getUserNodes() {
      return Array.from(this.els.userList.querySelectorAll('dl'))
    }
    clearUserListSelected() {
      this.getUserNodes().forEach(e => {
        e.classList.remove('selected')
      })
    }
    openPrivateMsgBox() {
      this.els.privateMsgBoxWrap.classList.remove('hidden')
      this.els.msgBoxWrap.classList.add('hidden')
      this.els.msgInput.focus()
    }
    injectPrivateMessage(data) {
      const { from, content } = data
      let storeTargetUser

      if (this.toUser) {
        if (from.id === this.user.id) {
          // 只有 from 的 id 等于自己的 id 才可能是主动发送私聊消息，一并保存到当前打开的用户
          storeTargetUser = { ...this.toUser }
          // 打开了对话框则直接添加节点
          this.appendMessageBlock(from, content, true)
        } else {
          storeTargetUser = { ...from }
        }
        this.storeUserMessage(storeTargetUser, from, content)

        if (from.id === this.toUser.id) {
          // 打开了对话框则直接添加节点
          this.appendMessageBlock(from, content, true)
        } else {
          this.showCountTip(from)
        }
      } else {
        storeTargetUser = { ...from }
        this.storeUserMessage(storeTargetUser, from, content)
        this.showCountTip(from)
      }
      this.scrollToBottom(this.els.privateMsgBox)
    }
    showCountTip(from) {
      if (from.id === this.user.id) return
      this.getUserNodes().forEach(n => {
        if (from.id === n.getAttribute('data-uid')) {
          let msgCountTip = n.querySelector('.count-tip')
          if (msgCountTip) {
            msgCountTip.classList.remove('hidden')
            msgCountTip.innerHTML = +msgCountTip.innerHTML + 1
          }
        }
      })
    }
  }

  class Chat extends PrivateChat {
    constructor() {
      super()
      this.socket = this.initSocket()
      this.els = {
        ...this.preLogin(),
        ...this.preMessage(),
        ...this.prePrivateChat(),
        chatLogin: document.getElementById('chat-login'),
        chatRoom: document.getElementById('chat-room'),
        msgBox: document.getElementById('msg-box')
      }
      this.user = new User()
    }

    initSocket() {
      const socket = io()
      return socket
    }
    preLogin() {
      const nicknameInput = document.getElementById('nick-name-input')
      const loginButton = document.getElementById('login-btn')
      const avatarList = document.getElementById('portrait-list')

      nicknameInput.addEventListener('input', e => {
        this.user.setInfo({
          nickname: e.target.value
        })
      })
      loginButton.addEventListener('click', () => {
        const { nickname, avatar } = this.user
        if (!nickname || !avatar) {
          return alert('请输入昵称和选择头像')
        }
        this.login()
      })

      util.proxyEvent({
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
        nicknameInput,
        loginButton,
        avatarList
      }
    }
    preMessage() {
      const msgInput = document.getElementById('msg-input')
      const msgBoxWrap = document.getElementById('msg-box-wrap')

      msgInput.addEventListener('keydown', e => {
        if (e.key !== 'Enter') return
        e.preventDefault()
        this.sendMessage(e.target.value)
        e.target.value = ''
      })

      return {
        msgInput,
        msgBoxWrap
      }
    }
    login() {
      this.switchPage()

      this.user.setInfo({ id: this.socket.id })
      // 保证登录后再监听 join 事件，避免其他还在未登录状态的用户自动跳到聊天页
      this.listen('join', user => {
        this.appendTip(user.nickname + '加入聊天')
      })
      this.listen('users', users => {
        this.refreshUsers(users)
      })
      this.emit('join', {
        user: { ...this.user }
      })
      this.listen('message', data => {
        this.injectMessage(data)
      })
      this.listen('privateMessage', data => {
        this.injectPrivateMessage(data)
      })
      this.listen('private')
      this.listen('leave', user => {
        this.appendTip(user.nickname + '离开聊天')
      })

      this.els.msgInput.focus()
    }
    scrollToBottom(el) {
      if (!el) return
      el.scrollTop = el.scrollHeight
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
            <dl data-uid="${user.id}" data-uname="${user.nickname}">
              <dt>
                <span class="user-item-avatar">
                  <img src="${user.avatar}" alt="avatar">
                </span>
                <span class="count-tip hidden"></span>
              </dt>
              <dd title="${user.nickname}">${user.nickname}</dd>
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
    async sendMessage(content) {
      let payload = { from: this.user, content }
      try {
        if (this.toUser) {
          // 增加私聊信息
          payload.to = { ...this.toUser }
        }
        await this.verifyMessageContent(content)
        this.emit('message', payload)
      } catch (e) {}
    }
    verifyMessageContent(content) {
      switch (typeof content) {
        case 'string':
          if (!content.trim()) {
            return Promise.reject(new Error('content can not be empty'))
          }
        default:
          return Promise.resolve()
      }
    }
    injectMessage(data) {
      const { from, content } = data
      this.appendMessageBlock(from, content)
      this.scrollToBottom(this.els.msgBox)
    }
    appendMessageBlock({ id, nickname, avatar }, content, isPrivate = false) {
      let block = `
          <div class="msg-block-base ${
            id === this.user.id ? 'own-msg' : 'incoming-msg'
          }">
            <div class="portrait">
              <img src="${avatar}" alt="">
            </div>
            <div class="info">
              ${
                id !== this.user.id && !isPrivate
                  ? `<div class="nick-name">${nickname}</div>`
                  : ''
              }
              <div class="msg">${content}</div>
            </div>
          </div>
          `
      const frag = document.createElement('div')
      frag.innerHTML = block

      let box = isPrivate ? this.els.privateMsgBox : this.els.msgBox
      box.appendChild(frag)
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

  return new Chat()
})(io)
