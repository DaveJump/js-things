import React, { useState, useEffect } from 'react'
import { FilterProps } from '@/types'
import classNames from 'classnames'
import './style.scss'

const filterItems = ['all', 'done', 'undone']

const Filter = ({ onChange }: FilterProps) => {
  const [filterValue, setFilterValue] = useState('all')

  useEffect(() => {
    onChange?.(filterValue)
  }, [filterValue])

  function handleChange(value: string) {
    if (value === filterValue) return
    setFilterValue(value)
  }

  return (
    <div className="filter">
      {filterItems.map((value) => (
        <span
          key={value}
          className={classNames({
            'filter-item': true,
            'is-active': value === filterValue,
          })}
          onClick={() => handleChange(value)}
        >
          {value.replace(/\b(\w)/, m => m.toUpperCase())}
        </span>
      ))}
    </div>
  )
}

export default Filter
