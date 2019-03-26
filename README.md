# FilterSuggest

A react component for achieving search-as-you-type functionality on a list of option items.  The actual sorting & filtering of items is left up to you, making it easy to combine data from multiple sources (synchronous & asynchronous).

Implemented using [downshift](http://npmjs.com/package/downshift) and [material-components-web-react](https://github.com/material-components/material-components-web-react).

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
* [Examples](#examples)
  * [Sync](#sync)
  * [Async](#async)
* [Props](#props)
* [Styles](#styles)


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

## Examples

### Sync

A basic synchronous example using [match-sorter](https://www.npmjs.com/package/match-sorter) to sort items:

```jsx
import React, { useState } from 'react'
import FilterSuggest from 'filter-suggest'
import 'filter-suggest/es/index.css'
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

See the [demo source code](./demo/src) for a more comprehensive synchronous example.

### Async

A basic asynchronous example using a dummy GraphQL endpoint to fetch sorted items:

```jsx
import React, { Component } from 'react'
import debounce from 'lodash.debounce'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import FilterSuggest from 'filter-suggest'
import 'filter-suggest/es/index.css'

const DEBOUNCE_TIME = 100
const applyDebounced = debounce((f, x) => f(x), DEBOUNCE_TIME)

const QUERY = gql`
  query GET_ITEMS(
    $search: String!
  ) {
    getItems(
      search: $search
    ) {
      id
      primary
      secondary
    }
  }
`

class AsyncDemo extends Component {
  state = {
    inputValue: '',
    variables: {
      search: '',
    }
  }
  setInputValue = inputValue => {
    this.setState({ inputValue })
  }
  setVariables = variables => {
    this.setState({ variables })
  }
  onInputValueChange = value => {
    this.setInputValue(value)
    applyDebounced(this.setVariables, { search: value })
  }
  render() {
    const { inputValue, variables } = this.state
    return (
      <Query query={QUERY} variables={variables}>
        {({ data, loading, error }) => {
          return (
            <FilterSuggest
              inputValue={inputValue}
              label='Search async'
              loading={loading}
              onInputValueChange={this.onInputValueChange}
              onSelect={item => {
                // handle selected item
              }}
              items={inputValue && data ? data.getItems : []}
            />
          )
        }}
      </Query>
    )
  }
}
```

For a seamless search-as-you-type experience, results should be returned very quickly (say of the order 100ms).  You might want to look at [Elasticsearch completion suggester](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-suggesters-completion.html) or [PostgreSQL trigram indices](https://www.postgresql.org/docs/current/pgtrgm.html).

See [charity-base-search](https://www.npmjs.com/package/charity-base-search) for a real-world asynchronous example.

## Props

FilterSuggest accepts the following props:

```js
FilterSuggest.propTypes = {
  // Optional class applied to the parent div
  className: PropTypes.string,
  // The current value of the input (you must handle the state yourself)
  inputValue: PropTypes.string.isRequired,
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
  // Optional class applied to the input element's parent
  textFieldClassName: PropTypes.string,
}
FilterSuggest.defaultProps = {
  label: 'Start typing...',
  maxSuggestions: 12,
}
```

## Styles

With CSS:

```js
import 'filter-suggest/es/index.css'
```

With Sass:

```js
import 'filter-suggest/es/index.scss'
```

The colour theme can be customised using the following Sass mixin:

```scss
$mdc-theme-primary: #00ff00;
```

For further customisation see MDC Web's mixins for the [text field](https://github.com/material-components/material-components-web/blob/master/packages/mdc-textfield/README.md#sass-mixins) and [list](https://github.com/material-components/material-components-web/blob/master/packages/mdc-list/README.md#sass-mixins).

You may also supply `textFieldClassName` and `menuClassName` props which will be applied to the appropriate components.
