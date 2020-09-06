/**
 * Observer pattern
 */

/* Publish - Subscribe */

interface ISubject {
  name: string
  observers: Observer[]
  addObserver(ob: Observer): void
  removeObserver(ob: Observer): void
  notify(): void
}

interface IObserver {
  name: string
  update(sub?: Subject): void
  subscribeTo(sub: Subject): void
  unsubscribeTo(sub: Subject): void
}

class Subject implements ISubject {
  observers: Observer[]
  name: string = ''
  constructor(name: string) {
    this.observers = []
    this.name = name
  }

  addObserver(ob: Observer) {
    this.observers.push(ob)
  }
  removeObserver(ob: Observer) {
    const idx = this.observers.indexOf(ob)
    idx > -1 && this.observers.splice(idx, 1)
  }
  notify() {
    this.observers.forEach(ob => {
      ob.update(this)
    })
  }
}

class Observer implements IObserver {
  name: string = ''
  constructor(name: string) {
    this.name = name
  }

  update(sub?: Subject) {
    console.log(`${this.name}: ${sub?.name} updated`)
  }
  subscribeTo(sub: Subject) {
    sub.addObserver(this)
  }
  unsubscribeTo(sub: Subject) {
    sub.removeObserver(this)
  }
}

const sub = new Subject('subject_1')
const ob = new Observer('user_1')
const ob2 = new Observer('user_2')
const ob3 = new Observer('user_3')
ob.subscribeTo(sub)
ob2.subscribeTo(sub)
ob3.subscribeTo(sub)
ob3.unsubscribeTo(sub)

sub.notify()

/* Event Emitter */

type Events = { [name: string]: (() => any)[] | undefined }

interface EventEmitterIntf {
  events: Events
  on(name: string, fn: () => any): void
  off(name: string, fn?: () => any): void
  emit(name: string): void
  once(name: string, fn: () => any): void
}

class EventEmitter implements EventEmitterIntf {
  events: Events
  constructor() {
    this.events = {}
  }

  on(name: string, fn: () => any) {
    if (!this.events[name]) {
      this.events[name] = []
    }
    this.events[name]!.push(fn)
  }
  off(name: string, fn?: () => any) {
    if (!this.events[name]) {
      return
    }
    if (!fn) {
      this.events[name] = undefined
      return
    }
    const index = this.events[name]!.indexOf(fn)
    this.events[name]!.splice(index, 1)
  }
  emit(name: string) {
    if (!this.events[name]) {
      return
    }
    this.events[name]!.forEach(fn => fn())
  }
  once(name: string, fn: () => any) {
    const _fn = (...args: any[]) => {
      fn.apply<this, typeof args, any>(this, args)
      this.off(name)
    }
    this.on(name, _fn)
  }
}

const evt = new EventEmitter()
evt.on('custom_1', () => {
  console.log('custom_1_1_emitted!')
})
evt.on('custom_1', () => {
  console.log('custom_1_2_emitted!')
})
evt.on('custom_2', () => {
  console.log('custom_2_1_emitted!')
})
const handler = () => {
  console.log('custom_2_2_emitted!')
}
evt.on('custom_2', handler)
evt.off('custom_2', handler)
evt.once('custom_3', () => {
  console.log('custom_3 emitted once')
})
// evt.emit('custom_1')
// evt.emit('custom_2')
// evt.emit('custom_3')
