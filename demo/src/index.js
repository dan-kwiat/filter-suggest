import React, { Component } from 'react'
import { render } from 'react-dom'
import FilterSuggest from '../../src'
import './demo.css'

const filterTypes = [
  {
    id: 'label',
    // icon: 'label',
    staticValues: ['one', 'two', 'three'],
  },
  {
    id: 'building',
    // icon: 'store',
    staticValues: ['four', 'five'],
  },
  {
    id: 'restaurant',
    // icon: 'local_dining',
    staticValues: ['six', 'seven', 'eight'],
  },
  {
    id: 'location',
    // icon: 'place',
    staticValues: ['nine', 'ten'],
  },
  {
    id: 'station',
    // icon: 'train',
    staticValues: ['eleven', 'twelve'],
  },
]

class Demo extends Component {
  state = {
    inputValue: '',
  }
  render() {
    return (
      <div className='demo'>
        <h1>filter-suggest</h1>
        <div className='search-container'>
          <FilterSuggest
            inputValue={this.state.inputValue}
            onInputValueChange={inputValue => this.setState({ inputValue })}
            onSelect={selectedItem => console.log(selectedItem)}
            filterTypes={filterTypes}
          />
        </div>
      </div>
    )
  }
}

render(<Demo/>, document.querySelector('#demo'))