export interface TodoItem {
  todoName: string
  isDone?: boolean
}

export interface TodoAppState {
  todoList: TodoItem[]
}
