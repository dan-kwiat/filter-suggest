import React, { useState } from 'react'
import { render } from 'react-dom'
import matchSorter from 'match-sorter'
import FilterSuggest from '../../src'
import Chips from './Chips'
import filterOptions from './data'
import getFiltersMeta from './getFiltersMeta'
import '@material/react-chips/dist/chips.css'
import '@material/react-material-icon/dist/material-icon.css'
import './demo.css'

const OPTIONS = filterOptions.map(x => ({
  ...x,
  ...getFiltersMeta(x),
}))

const getSearchOption = inputValue => ({
  id: `search-0-${inputValue}`,
  filterType: 'search',
  primary: inputValue,
  ...getFiltersMeta({
    filterType: 'search',
    primary: inputValue,
  })
})

const Demo = () => {
  const [inputValue, setInputValue] = useState('')
  const [selectedFilters, setSelectedFilters] = useState([])
  const filteredOptions = inputValue ? [
    getSearchOption(inputValue),
    ...matchSorter(
      OPTIONS,
      inputValue,
      { keys: ['value', 'label'] }
    ).map(x => ({ ...x, primary: x.label || x.value })),
  ] : []
  return (
    <div className='demo'>
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      <div className='content'>
        <h1>{`<FilterSuggest />`}</h1>
        <h3>Synchronous Example (values stored in client)</h3>
        <div className='margin-container'>
          <FilterSuggest
            inputValue={inputValue}
            label='Filter by genre, actor, film...'
            onInputValueChange={setInputValue}
            onSelect={x => {
              console.log(x)
              setInputValue('')
              setSelectedFilters(Array.from(
                new Set([...selectedFilters, x.id])
              ))
            }}
            options={filteredOptions}
          />
        </div>
        <Chips
          labels={selectedFilters}
          setLabels={setSelectedFilters}
        />
        {selectedFilters.length === 0 ? null : (
          <div className='margin-container'>
            Handling selected filters is left up to you. These filter chips are provided as an example but are not distributed with the filter-suggest package.
          </div>
        )}
        <div className='margin-container'>
          <a href='https://github.com/dan-kwiat/filter-suggest/tree/master/demo/src'>
            Demo Source Code
          </a>
        </div>
        <div className='margin-container'>
          <a href='https://www.npmjs.com/package/filter-suggest'>
            npmjs.com/package/filter-suggest
          </a>
        </div>
      </div>
    </div>
  )
}

render(<Demo/>, document.querySelector('#demo'))