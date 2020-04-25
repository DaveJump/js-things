import React, { useRef } from 'react'
import { AddInputProps } from '@/types'
import './style.scss'

const AddInput: React.FC<AddInputProps> = ({ onInput, onEnter }) => {
  const inputRef = useRef<HTMLInputElement>(null)

  function handleKeyup(evt: React.KeyboardEvent) {
    if (evt.keyCode === 13) {
      ;(inputRef.current as HTMLInputElement).value = ''
      onEnter?.()
      onInput?.('')
    }
  }

  return (
    <div className="add-input">
      <input
        type="text"
        onInput={(evt) => onInput?.((evt.target as any).value)}
        onKeyUp={(evt) => handleKeyup(evt)}
        placeholder="Enter Todo Name"
        ref={inputRef}
      />
    </div>
  )
}

export default AddInput
