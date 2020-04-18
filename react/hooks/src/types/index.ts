export type AddInputProps = Partial<{
  onInput: (value: string) => void
  onEnter: () => void
}>

export interface TodoItem {
  title: string
  completed: boolean
}

export type TodoListProps = Partial<{
  list: TodoItem[],
  onDone: (index: number) => void
  onDelete: (index: number) => void
  onUndone: (index: number) => void
}>
