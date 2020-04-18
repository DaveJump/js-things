import React, { useState, useEffect } from 'react'
import 'styles/App.scss'
import AddInput from '@/components/AddInput'
import TodoList from '@/components/TodoList'
import { TodoItem } from '@/types'

function App() {
  const [newTodoVal, setNewTodoVal] = useState('')
  const [todoList, setTodoList] = useState<TodoItem[]>([])

  function addTodo() {
    if (!newTodoVal) return
    setTodoList([
      ...todoList,
      {
        title: newTodoVal,
        completed: false,
      },
    ])
  }

  function toggleDoneTodo(index: number, type: 'done' | 'undone') {
    setTodoList(
      todoList.map((todo, idx) => {
        if (idx === index) {
          todo.completed = type === 'done'
        }
        return todo
      })
    )
  }

  function deleteTodo(index: number) {
    setTodoList(todoList.filter((todo, idx) => idx !== index))
  }

  return (
    <div className="todo-app">
      <AddInput
        onInput={(value) => setNewTodoVal(value)}
        onEnter={() => addTodo()}
      ></AddInput>
      <TodoList
        list={todoList}
        onDone={(index) => toggleDoneTodo(index, 'done')}
        onUndone={(index) => toggleDoneTodo(index, 'undone')}
        onDelete={(index) => deleteTodo(index)}
      ></TodoList>
    </div>
  )
}

export default App
