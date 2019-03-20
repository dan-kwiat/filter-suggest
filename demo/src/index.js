import React, { Component } from 'react'
import { render } from 'react-dom'
import FilterSuggest from '../../src'
import Chips from './Chips'
import filterOptions from './data'
import getFiltersMeta from './getFiltersMeta'
import '@material/react-chips/dist/chips.css'
import '@material/react-material-icon/dist/material-icon.css'
import './demo.css'

const OPTIONS = filterOptions.map(x => ({
  ...x,
  ...getFiltersMeta(x.filterType),
}))

const matches = (str, target, prefixOnly=false) => {
  const index = target.toLowerCase().indexOf(str.toLowerCase())
  return prefixOnly ? (
    index === 0
  ) : (
    index > -1
  )
}

const filter = (options, inputValue) => {
  const matchingItems = options.reduce((agg, x) => {
    const doesMatch = matches(inputValue, x.label || x.value)
    return doesMatch ? [...agg, x] : agg
  }, [])
  return matchingItems
}

class Demo extends Component {
  state = {
    inputValue: '',
    selectedFilters: [],
  }
  render() {
    const filteredOptions = filter(
      OPTIONS,
      this.state.inputValue,
    )
    return (
      <div className='demo'>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
        <div className='content'>
          <h1>{`<FilterSuggest />`}</h1>
          <div className='margin-container'>
            <a href='https://github.com/dan-kwiat/filter-suggest/tree/master/demo'>
              Source Code
            </a>
          </div>
          <h3>Synchronous Example (values stored in client)</h3>
          <div className='margin-container'>
            <FilterSuggest
              inputValue={this.state.inputValue}
              label='Filter by genre, actor, film...'
              onInputValueChange={inputValue => this.setState({ inputValue })}
              onSelect={x => this.setState(s => {
                console.log(x)
                const filterSet = new Set([...s.selectedFilters, x.id])
                return { selectedFilters: Array.from(filterSet) }
              })}
              options={filteredOptions}
            />
          </div>
          <Chips
            labels={this.state.selectedFilters}
            setLabels={selectedFilters => this.setState({ selectedFilters })}
          />
          {this.state.selectedFilters.length === 0 ? null : (
            <div className='margin-container'>
              Handling selected filters is left up to you. These filter chips are provided as an example but are not distributed with the filter-suggest package.
            </div>
          )}
        </div>
      </div>
    )
  }
}

render(<Demo/>, document.querySelector('#demo'))