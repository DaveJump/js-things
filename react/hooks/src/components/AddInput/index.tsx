import React, { useRef } from 'react'
import { AddInputProps } from '@/types'
import './style.scss'

const AddInput: React.FC<AddInputProps> = ({ onChange, onEnter }) => {
  const inputRef = useRef<HTMLInputElement>(null)

  function handleKeyup(evt: React.KeyboardEvent<HTMLInputElement>) {
    if (evt.keyCode === 13) {
      (inputRef.current as HTMLInputElement).value = ''
      onEnter?.()
      onChange?.('')
    }
  }

  return (
    <div className="add-input">
      <input
        type="text"
        onChange={(evt) => onChange?.(evt.target.value)}
        onKeyUp={(evt) => handleKeyup(evt)}
        placeholder="Enter Todo Name"
        ref={inputRef}
      />
    </div>
  )
}

export default AddInput
