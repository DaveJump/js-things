export type AddInputProps = Partial<{
  onInput: (value: string) => void
  onEnter: () => void
}>

export interface TodoItem {
  id: string
  title: string
  completed: boolean
}

export type TodoListProps = Partial<{
  list: TodoItem[],
  onDone: (index: string | number) => void
  onDelete: (index: string | number) => void
  onUndone: (index: string | number) => void
}>

export interface FilterProps {
  onChange?: (value: string) => void
}
