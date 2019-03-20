# FilterSuggest

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]

[build-badge]: https://img.shields.io/travis/user/repo/master.png?style=flat-square
[build]: https://travis-ci.org/user/repo

[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package

[coveralls-badge]: https://img.shields.io/coveralls/user/repo/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/user/repo

* [Demo](#demo)
* [Installation](#installation)
* [Example](#example)
* [Props](#props)


## Demo

[https://dan-kwiat.github.io/filter-suggest](https://dan-kwiat.github.io/filter-suggest)


## Installation

With Yarn:

```
yarn add filter-suggest
```

Or npm:

```
npm install --save filter-suggest
```

You'll need to have the peer dependencies installed too:

```json
{
  "prop-types": "15.x",
  "react": "16.x",
  "react-dom": "16.x"
},
```

## Example

```jsx
import React, { useState } from 'react'
import FilterSuggest from 'filter-suggest'
import matchSorter from 'match-sorter'

const ITEMS = [
  {
    id: `movie-1`,
    icon: null,
    primary: 'movie:The Big Short',
    secondary: 'Filter by movie',
  },
  // add more items here
]

const Demo = () => {
  const [inputValue, setInputValue] = useState('')
  const sortedItems = inputValue ? matchSorter(
    ITEMS,
    inputValue,
    { keys: ['primary'] }
  ) : []
  return (
    <FilterSuggest
      inputValue={inputValue}
      label='Start typing...'
      onInputValueChange={setInputValue}
      onSelect={item => {
        // deal with selected item here
      }}
      items={sortedItems}
    />
  )
}
```

See the [demo source code](./demo/src) for a more comprehensive example.


## Props

FilterSuggest accepts the following props:

```js
FilterSuggest.propTypes = {
  // Optional class applied to the input element's parent
  textFieldClassName: PropTypes.string,
  // The current value of the input (you must handle the state yourself)
  inputValue: PropTypes.string.isRequired,
  // The input label
  label: PropTypes.string,
  // Whether or not the items are loading
  loading: PropTypes.bool,
  // Maximum number of items to render in dropdown list
  maxSuggestions: PropTypes.number,
  // Optional class applied to the dropdown menu
  menuClassName: PropTypes.string,
  // A callback fired whenever an input value change is detected
  onInputValueChange: PropTypes.func.isRequired,
  // A callback fired whenever an item is selected
  onSelect: PropTypes.func.isRequired,
  // An array of items to render in the dropdown
  items: PropTypes.arrayOf(PropTypes.shape({
    // A unique item id
    id: PropTypes.string.isRequired,
    // An optional icon to render on the left
    icon: PropTypes.element,
    // The main text to display on the item
    primary: PropTypes.string.isRequired,
    // Secondary text to display below the main text (useful for giving prompts)
    secondary: PropTypes.string,
    // You may want to provide additional item props here (for use in the onSelect callback)
  })).isRequired,
}
FilterSuggest.defaultProps = {
  label: 'Start typing to search filters...',
  maxSuggestions: 12,
}
```
