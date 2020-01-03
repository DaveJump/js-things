<template>
  <div class="todo-addit">
    <input type="text" v-model="state.todoName" placeholder="Enter Todo name" @keyup.enter="handleAddTodo">
  </div>
</template>

<script lang="ts">
import { createComponent, onMounted, reactive } from '@vue/composition-api'

interface TodoAdditProps {}

interface TodoAdditState {
  todoName: string
}

export default createComponent({
  name: 'TodoAddit',
  setup(props: TodoAdditProps, context) {
    // state
    const state: TodoAdditState = reactive({
      todoName: ''
    })

    // methods
    const handleAddTodo = () => {
      context.emit('addTodo', state.todoName)
      state.todoName = ''
    }

    // hooks
    onMounted(() => {
    })

    return {
      state,
      handleAddTodo
    }
  }
})
</script>

<style scoped>
.todo-addit input {
  padding: 10px 15px;
  background-color: #f6f6f6;
  outline: none;
  -webkit-appearance: none;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  width: 100%;
}
</style>
