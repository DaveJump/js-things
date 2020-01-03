import { TodoItem } from '@/types'
import { ref, Ref } from '@vue/composition-api'
const storage = window.localStorage

export const useTodoUpdate = () => {
  const prevList = storage.getItem('TodoList')
  const todoList: Ref<TodoItem[]> = ref(
    prevList ? JSON.parse(prevList) : []
  )

  const updateTodo = (todo: TodoItem | number, index?: number) => {
    if (typeof index !== 'undefined' && index >= 0) {
      // modify todo
      if (typeof todo !== 'number') {
        todoList.value.splice(index, 1, todo)
      }
    } else {
      if (typeof todo !== 'number') {
        // add todo
        todoList.value.unshift({
          todoName: todo.todoName,
          isDone: false
        })
      } else {
        // delete todo
        todoList.value.splice(todo, 1)
      }
    }
    storage.setItem('TodoList', JSON.stringify(todoList.value))
  }

  return {
    todoList,
    updateTodo
  }
}
