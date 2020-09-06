interface Knowledge {
  [name: string]: any
}

interface Book {
  [index: string]: any
}

interface IStudent {
  knowledge: Knowledge
  readBook(bookIndex: string): void
}

const book: Book = {
  '0': 'prologue',
  '1': 'chapter-one',
  '2': 'chapter-two'
}

// Insert tag after reading
function insertTag<T extends Student2>(tag: string) {
  return function(target: T, propertyKey: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value
    descriptor.value = function(this: T, bookIndex: string) {
      method.call(this, bookIndex)
      this.knowledge[`tag-${bookIndex}`] = tag
    }
  }
}

function validateId<T extends Student2>(target: T, propertyKey: string, descriptor: PropertyDescriptor) {
  const setter = descriptor.set
  descriptor.set = function(this: T, id: string) {
    if (id.length > 10) {
      throw new Error('The Id cannot be longer than 10 characters')
    }
    setter?.call(this, id)
  }
}

function comment(com: string, len: number) {
  return function(target: any, propertyKey: string) {
    target[propertyKey] = new Array(len).fill(com)
  }
}

function logParam(target: any, propertyKey: string, paramValue: any) {
  console.log(target)
  console.log(propertyKey)
  console.log(paramValue)
}

class Student2 implements IStudent {
  /**
   * 注意在使用属性装饰器时如果不初始化值，则得不到 ownPeroperty，
   * 但装饰器会在 prototype 对象上注入，因为此时的 target 为原型对象
   */
  @comment('--hei--', 3)
  interests!: string[]

  constructor(
    public knowledge: Knowledge,
    private identity: string
  ) {}

  get _id() {
    return this.identity
  }

  @validateId
  set _id(id: string) {
    this.identity = id
  }

  @insertTag('read')
  readBook(@logParam bookIndex: string) {
    this.knowledge[bookIndex] = book[bookIndex]
  }
}

const student = new Student2({}, 'sid-001')
student.readBook('0')
console.log(student.knowledge)
