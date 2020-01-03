<template>
  <div id="app">
    <Addit @addTodo="handleAddTodo" />
    <List :list="todoList" @updateTodo="handleUpdateTodo" />
  </div>
</template>

<script lang="ts">
import { createComponent, reactive } from '@vue/composition-api'
import Addit from '@/components/Addit.vue'
import List from '@/components/List.vue'
import { TodoAppState, TodoItem } from '@/types'
import { useTodoUpdate } from '@/hooks'

export default createComponent({
  name: 'App',
  components: {
    Addit,
    List
  },
  setup(props: {}, context) {
    const { todoList, updateTodo } = useTodoUpdate()

    // methods
    const handleAddTodo = (todoName: string) => {
      updateTodo({ todoName })
    }
    const handleUpdateTodo = (todo: TodoItem | number, index?: number) => {
      updateTodo(todo, index)
    }

    return {
      todoList,
      handleAddTodo,
      handleUpdateTodo
    }
  }
})
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 100px auto 0 auto;
  width: 450px;
}
#app * {
  box-sizing: border-box;
}
input::-webkit-input-placeholder {
  color: #b6b6b6;
}
:-moz-placeholder {
  color: #b6b6b6;
}
::-moz-placeholder {
  color: #b6b6b6;
}
ul,
li {
  margin: 0;
  padding: 0;
  list-style: none;
}
</style>
