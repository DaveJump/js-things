import React from 'react'
import { TodoListProps } from '@/types'
import './style.scss'
import classNames from 'classnames'

const TodoList = ({ list = [], onDelete, onDone, onUndone }: TodoListProps) => (
  <div className="todo-list">
    {list.length ? list.map((item, index) => (
      <div className={classNames({'todo-item': true, 'is-done': item.completed})} key={item.id || index}>
        <span>{item.title}</span>
        <div className="todo-item-btns">
          {item.completed ? (
            <span onClick={() => onUndone?.(item.id)}>undone</span>
          ) : (
            <span onClick={() => onDone?.(item.id)}>Done</span>
          )}
          <span onClick={() => onDelete?.(item.id)}>Delete</span>
        </div>
      </div>
    )) : <div className="empty-records">No Records</div>}
  </div>
)

export default TodoList
