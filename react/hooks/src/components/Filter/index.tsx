import React, { useEffect } from 'react'
import { FilterProps, FilterValues } from '@/types'
import classNames from 'classnames'
import './style.scss'
import { useSelector, useDispatch } from 'react-redux'
import { SaveFilterValueAction } from '@/store/actions/filter'
import { StoreStateModules } from '@/store'
import saveFilterValue from '@/store/actions/filter'
import { Dispatch } from 'redux'

const filterItems: FilterValues[] = ['all', 'done', 'undone']

const Filter: React.FC<FilterProps> = ({ onChange }) => {
  // const [filterValue, setFilterValue] = useState('all')
  const state = useSelector((state: StoreStateModules) => state)
  const dispatch = useDispatch<Dispatch<SaveFilterValueAction>>()

  useEffect(() => {
    dispatchValue(state.filter.filterValue)
  }, [])

  function handleChange(value: FilterValues) {
    if (value === state.filter.filterValue) return
    dispatchValue(value)
  }

  function dispatchValue(value: FilterValues) {
    onChange?.(value)
    dispatch(saveFilterValue(value))
  }

  return (
    <div className="filter">
      {filterItems.map((value) => (
        <span
          key={value}
          className={classNames({
            'filter-item': true,
            'is-active': value === state.filter.filterValue,
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
