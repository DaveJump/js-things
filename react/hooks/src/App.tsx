import React, { useState, useEffect, useCallback } from 'react'
import 'styles/App.scss'
import AddInput from '@/components/AddInput'
import TodoList from '@/components/TodoList'
import Filter from '@/components/Filter'
import { TodoItem } from '@/types'
import { useSelector } from 'react-redux'
import { StoreStateModules } from '@/store'

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

const App: React.FC = () => {
  const [newTodoVal, setNewTodoVal] = useState('')
  const state = useSelector((state: StoreStateModules) => state)
  const [todoList, setTodoList] = useState<todoListType>([...allTodos])

  useEffect(() => {
    storeTodos(allTodos)
  }, [allTodos])

  const filterTodo = useCallback((value: string) => {
    let list: React.SetStateAction<todoListType> = []
    if (value === 'all') {
      list = [...allTodos]
    } else if (value === 'done') {
      list = allTodos.filter((todo) => todo.completed)
    } else if (value === 'undone') {
      list = allTodos.filter((todo) => !todo.completed)
    }
    setTodoList(list)
  }, [])

  const addTodo = useCallback(() => {
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
    filterTodo(state.filter.filterValue)
  }, [newTodoVal])

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
    if (state.filter.filterValue === 'all') return
    filterTodo(type === 'done' ? 'undone' : 'done')
  }

  const deleteTodo = useCallback((id: string | number) => {
    setTodoList(todoList.filter((todo) => todo.id !== id))
    let newAllTodos = allTodos.filter(todo => todo.id !== id)
    allTodos = [...newAllTodos]
  }, [todoList])

  return (
    <div className="todo-app">
      <AddInput
        onInput={setNewTodoVal}
        onEnter={addTodo}
      ></AddInput>
      <Filter
        onChange={filterTodo}
      ></Filter>
      <TodoList
        list={todoList}
        onDone={(id) => toggleDoneTodo(id, 'done')}
        onUndone={(id) => toggleDoneTodo(id, 'undone')}
        onDelete={deleteTodo}
      ></TodoList>
    </div>
  )
}

export default App
