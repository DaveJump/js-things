<template>
  <div class="todo-list">
    <ul v-if="list.length">
      <li
        v-for="(todo, index) in list"
        class="todo-item"
        :class="todo.isDone ? 'is-done' : ''"
        :key="index"
      >
        <span>{{ todo.todoName }}</span>
        <div class="todo-operation">
          <span @click="handleUpdateTodo(todo, index)" v-if="!todo.isDone">Done</span>
          <span @click="handleUpdateTodo(index)">Delete</span>
        </div>
      </li>
    </ul>
    <div v-else class="empty-container">
      No result here
    </div>
  </div>
</template>

<script lang="ts">
import { createComponent, watch } from '@vue/composition-api'
import { TodoItem } from '@/types'

interface TodoListProps {
  list: TodoItem[]
}

export default createComponent({
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  name: 'TodoList',
  setup(props: TodoListProps, context) {
    const handleUpdateTodo = (todo: TodoItem | number, index: number) => {
      const TODO = typeof todo !== 'number' ? { todoName: todo.todoName, isDone: true } : todo
      context.emit('updateTodo', TODO, index)
    }

    return {
      handleUpdateTodo
    }
  }
})
</script>

<style scoped>
.todo-list {
  margin-top: 20px;
  border: 1px solid #e0e0e0;
  max-height: 450px;
  overflow-x: hidden;
  overflow-y: auto;
}
.todo-list .todo-item {
  padding: 10px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.todo-list .todo-item.is-done {
  color: #999;
}
.todo-list .todo-item.is-done > span {
  text-decoration: line-through;
}
.todo-operation {
  -webkit-user-select: none;
  user-select: none;
}
.todo-operation > span {
  margin-left: 10px;
  color: #409eff;
  font-size: 12px;
  cursor: pointer;
}
.todo-operation > span:hover {
  color: #7ab3ec;
}
.todo-list .todo-item + .todo-item {
  border-top: 1px solid #e2e2e2;
}
.empty-container {
  text-align: center;
  padding: 40px;
  color: #999;
}
</style>
