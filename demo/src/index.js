import React, { Component } from 'react'
import { render } from 'react-dom'
import FilterSuggest from '../../src'
import './demo.css'

const filters = {
  'label': {
    // icon: 'label',
    staticValues: ['one', 'two', 'three'],
  },
  'building': {
    // icon: 'store',
    staticValues: ['four', 'five'],
  },
  'restaurant': {
    // icon: 'local_dining',
    staticValues: ['six', 'seven', 'eight'],
  },
  'location': {
    // icon: 'place',
    staticValues: ['nine', 'ten'],
  },
  'station': {
    // icon: 'train',
    staticValues: ['eleven', 'twelve'],
  },
}

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
            dropdownOptions={filters}
          />
        </div>
      </div>
    )
  }
}

render(<Demo/>, document.querySelector('#demo'))