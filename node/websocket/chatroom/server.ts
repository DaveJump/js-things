import express from 'express'
import cors from 'cors'
import http from 'http'
import SocketIO from 'socket.io'
import path from 'path'

class User {
  nickName!: string
  avatar!: string
  id!: string

  constructor() {}
}

class ChatServer {
  public static readonly PORT: number = 8020
  private io!: SocketIO.Server
  private app!: express.Application
  private server!: http.Server
  private port!: string | number
  // @ts-ignore
  private userList!: User[] = []

  constructor() {
    this.createApp()
    this.config()
    this.createServer()
    this.sockets()
    this.listen()
  }

  private createApp() {
    this.app = express()
    this.app.use(cors())
    this.app.use(express.static(path.join(__dirname, 'public')))
  }
  private createServer() {
    this.server = http.createServer(this.app)
  }
  private config() {
    this.port = process.env.PORT || ChatServer.PORT
  }
  private sockets() {
    this.io = new SocketIO.Server(this.server)
  }
  private listen() {
    this.server.listen(this.port, () => {
      console.log('Server running on port %s', this.port)
    })
    // 客户端与 socket 服务器连接时触发
    // 回调参数 socket : 服务端 socket 对象
    this.io.on('connect', socket => {
      /**
       * socket.emit 只向建立连接的客户端广播
       * socket.broadcast.emit 向除了建立该连接意外的客户端广播（排己）
       * io.emit 向所有客户端广播
       * io.sockets.sockets.get(socketId).emit 向指定 id 的客户端广播
       */

      console.log('[client](connected): %s', socket.id)

      socket.on('join', (data: { user: User }) => {
        this.userList.push(data.user)
        // 广播加入群聊
        this.io.emit('join', data.user)
        // 广播用户列表
        this.io.emit('users', this.userList)
      })

      socket.on('message', data => {
        this.io.emit('message', data)
      })

      socket.on('disconnect', () => {
        console.log('[client](disconnected): %s', socket.id)

        const userIndex = this.userList.findIndex(user => user.id === socket.id)
        const user = this.userList[userIndex]
        if (userIndex >= 0) {
          this.userList.splice(userIndex, 1)
          // 广播用户离开
          this.io.emit('leave', user)
          this.io.emit('users', this.userList)
        }
      })
    })
  }

  public getApp() {
    return this.app
  }
}

export default ChatServer
