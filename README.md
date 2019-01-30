# <FilterSuggest />

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
* [Examples](#examples)
  * [Synchronous](#synchronous)
  * [Asynchronous](#asynchronous)
* [Docs](#docs)


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

## Examples

### Synchronous

```jsx
import React, { Component } from 'react'
import FilterSuggest from 'filter-suggest'

const filterTypes = [
  {
    id: 'size',
    icon: null,
    staticValues: ['miniscule', 'tiny', 'small', 'medium', 'large', 'massive', 'humongous'],
  },
  {
    id: 'is',
    icon: null,
    staticValues: ['read', 'unread', 'spam'],
  },
]

class Demo extends Component {
  state = {
    inputValue: '',
  }
  render() {
    return (
      <FilterSuggest
        filterTypes={filterTypes}
        inputValue={this.state.inputValue}
        onInputValueChange={inputValue => this.setState({ inputValue })}
        onSelect={x => console.log(x)}
      />
    )
  }
}
```

### Asynchronous

Coming soon

## Docs

Coming soon
