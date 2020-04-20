import React, { useState, useEffect } from 'react'
import 'styles/App.scss'
import AddInput from '@/components/AddInput'
import TodoList from '@/components/TodoList'
import Filter from '@/components/Filter'
import { TodoItem } from '@/types'

type todoListType = TodoItem[]

let allTodos: todoListType = getStoredTodos()

function storeTodos(todos: todoListType) {
  const todoList = JSON.stringify(todos)
  localStorage.setItem('todoList', todoList)
}

function getStoredTodos(name: string = 'todoList'): todoListType {
  const todoList = localStorage.getItem(name)
  return todoList ? JSON.parse(todoList) : []
}

function App() {
  const [newTodoVal, setNewTodoVal] = useState('')
  const [filterValue, setFilterValue] = useState('all')
  const [todoList, setTodoList] = useState<todoListType>([...allTodos])

  useEffect(() => {
    storeTodos(allTodos)
  }, [allTodos])

  function addTodo() {
    if (!newTodoVal) return
    let newAllTodos = [
      ...allTodos,
      {
        id: (Math.random() * 10 + '').replace(/\./g, ''),
        title: newTodoVal,
        completed: false,
      }
    ]
    allTodos = [...newAllTodos]
    filterTodo(filterValue)
  }

  function toggleDoneTodo(id: string | number, type: 'done' | 'undone') {
    setTodoList(
      todoList.map((todo) => {
        if (todo.id === id) {
          todo.completed = type === 'done'
        }
        return todo
      })
    )
    let newAllTodos = allTodos.map(todo => {
      if (todo.id === id) {
        todo.completed = type === 'done'
      }
      return todo
    })
    allTodos = [...newAllTodos]
    if (filterValue === 'all') return
    filterTodo(type === 'done' ? 'undone' : 'done')
  }

  function deleteTodo(id: string | number) {
    setTodoList(todoList.filter((todo) => todo.id !== id))
    let newAllTodos = allTodos.filter(todo => todo.id !== id)
    allTodos = [...newAllTodos]
  }

  function filterTodo(value: string) {
    let list: React.SetStateAction<todoListType> = []
    if (value === 'all') {
      list = [...allTodos]
    } else if (value === 'done') {
      list = allTodos.filter((todo) => todo.completed)
    } else if (value === 'undone') {
      list = allTodos.filter((todo) => !todo.completed)
    }
    setTodoList(list)
  }

  return (
    <div className="todo-app">
      <AddInput
        onInput={(value) => setNewTodoVal(value)}
        onEnter={() => addTodo()}
      ></AddInput>
      <Filter
        onChange={(value) => {
          filterTodo(value)
          setFilterValue(value)
        }}
      ></Filter>
      <TodoList
        list={todoList}
        onDone={(id) => toggleDoneTodo(id, 'done')}
        onUndone={(id) => toggleDoneTodo(id, 'undone')}
        onDelete={(id) => deleteTodo(id)}
      ></TodoList>
    </div>
  )
}

export default App
