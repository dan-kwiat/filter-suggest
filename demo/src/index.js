import React, { Component } from 'react'
import { render } from 'react-dom'
import FilterSuggest from '../../src'
import Chips from './Chips'
import MaterialIcon from '@material/react-material-icon'
import '@material/react-chips/dist/chips.css'
import '@material/react-material-icon/dist/material-icon.css'
import './demo.css'

const filterTypes = [
  {
    id: 'label',
    icon: <MaterialIcon icon='label' />,
    staticValues: ['one', 'two', 'three'],
  },
  {
    id: 'building',
    icon: <MaterialIcon icon='store' />,
    staticValues: ['four', 'five'],
  },
  {
    id: 'restaurant',
    icon: <MaterialIcon icon='local_dining' />,
    staticValues: ['six', 'seven', 'eight'],
  },
  {
    id: 'location',
    icon: <MaterialIcon icon='place' />,
    staticValues: ['nine', 'ten'],
  },
  {
    id: 'station',
    icon: <MaterialIcon icon='train' />,
    staticValues: ['eleven', 'twelve'],
  },
]

class Demo extends Component {
  state = {
    inputValue: '',
    selectedFilters: [],
  }
  render() {
    return (
      <div className='demo'>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
        <h1>filter-suggest</h1>
        <div className='search-container'>
          <FilterSuggest
            filterTypes={filterTypes}
            inputValue={this.state.inputValue}
            onInputValueChange={inputValue => this.setState({ inputValue })}
            onSelect={x => this.setState(s => {
              const filterSet = new Set([...s.selectedFilters, x.query])
              return { selectedFilters: Array.from(filterSet) }
            })}
          />
          <Chips
            labels={this.state.selectedFilters}
            setLabels={selectedFilters => this.setState({ selectedFilters })}
          />
        </div>
      </div>
    )
  }
}

render(<Demo/>, document.querySelector('#demo'))