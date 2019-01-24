import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Downshift from 'downshift'
import TextField, { Input } from '@material/react-text-field'
import MaterialIcon from '@material/react-material-icon'
import List, {
  ListItem,
  ListItemGraphic,
  ListItemText,
  ListItemMeta,
} from '@material/react-list'
import { CircularProgress } from '@rmwc/circular-progress'
import './FilterSuggest.css'
import '@material/react-list/dist/list.css'
import '@material/react-text-field/dist/text-field.css'
import '@material/react-material-icon/dist/material-icon.css'

class FilterSuggest extends Component {
  stringify = item => {
    if (!item) return
    return item.complete ? '' : item.query
  }
  getOptionMatches = (prefix, { icon, staticValues }, inputValue) => {
    if (!inputValue) return []
    if (inputValue === ':') return [{
      query: `${prefix}:`,
      icon,
      complete: false,
      suggestions: (staticValues.join(', ') || 'type for suggestions'),
    }]
    const isLongerThanPrefix = inputValue.length > (`${prefix}:`).length
    const prefixValues = isLongerThanPrefix ? staticValues.map(v => `${prefix}:${v}`) : [`${prefix}:`]
    const prefixValueMatches = prefixValues.filter(x => x.toLowerCase().indexOf(inputValue.toLowerCase()) === 0)
    const valuesMatches = staticValues.filter(x => x.toLowerCase().indexOf(inputValue.toLowerCase()) === 0).map(v => `${prefix}:${v}`)
    const allMatches = [
      ...prefixValueMatches,
      ...valuesMatches,
    ]
    return allMatches.map(query => ({
      filterType: prefix,
      value: query.substr(prefix.length + 1),
      query,
      icon,
      complete: query !== `${prefix}:`,
      suggestions: query === `${prefix}:` ? (staticValues.join(', ') || 'type for suggestions') : null,
    }))
  }
  getDropdownItems = inputValue => {
    return Object.keys(this.props.dropdownOptions).reduce((agg, prefix) => ([
      ...agg,
      ...this.getOptionMatches(prefix, this.props.dropdownOptions[prefix], inputValue),
    ]), [])
  }
  render() {
    const dropdownItems = [
      ...this.getDropdownItems(this.props.inputValue),
      ...this.props.controlledItems,
    ]
    return (
      <Downshift
        selectedItem={null}
        inputValue={this.props.inputValue}
        onInputValueChange={x => this.props.onInputValueChange(x || '')}
        itemToString={this.stringify}
        defaultHighlightedIndex={0}
        onStateChange={(changes, downshift) => {
          if (changes.hasOwnProperty('selectedItem')) {
            if (changes.selectedItem.complete) {
              return this.props.onSelect(changes.selectedItem)
            }
            return downshift.openMenu()
          }
          if (changes.type === Downshift.stateChangeTypes.changeInput) {
            if (downshift.highlightedIndex !== 0) {
              downshift.setHighlightedIndex(0)
            }
          }
        }}
      >
        {({
          getInputProps,
          getItemProps,
          getLabelProps,
          getMenuProps,
          isOpen,
          inputValue,
          highlightedIndex,
          setHighlightedIndex,
          selectedItem,
        }) => (
          <div>
            <TextField
              label={this.props.label}
              style={{ width: '100%' }}
              trailingIcon={this.props.loading ? <CircularProgress /> : undefined}
            >
              <Input
                {...getInputProps()}
              />
            </TextField>
            {isOpen && dropdownItems.length > 0 ? (
              <div
                style={{ position: 'relative', }}
              >
                <div
                  {...getMenuProps()}
                  className='filter-menu'
                >
                  <List
                    twoLine
                    singleSelection
                    selectedIndex={highlightedIndex}
                    handleSelect={(selectedIndex) => setHighlightedIndex(selectedIndex)}
                  >
                    {
                      dropdownItems.map((item, index) => (
                        <ListItem
                          {...getItemProps({ item })}
                          key={index}
                        >
                          {item.icon ? <ListItemGraphic graphic={<MaterialIcon icon={item.icon} />} /> : <span />}
                          <ListItemText primaryText={item.query} secondaryText={item.suggestions ? item.suggestions : ' '} />
                          <ListItemMeta meta={highlightedIndex === index && item.query !== inputValue ? 'Enter' : ' '}/>
                        </ListItem>
                      ))
                    }
                  </List>
                </div>
              </div>
            ) : null}
          </div>
        )}
      </Downshift>
    )
  }
}
FilterSuggest.propTypes = {
  controlledItems: PropTypes.array,
  dropdownOptions: PropTypes.object,
  inputValue: PropTypes.string.isRequired,
  label: PropTypes.string,
  loading: PropTypes.bool,
  onInputValueChange: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
}
FilterSuggest.defaultProps = {
  controlledItems: [],
  dropdownOptions: {},
  label: 'Start typing...',
}

export default FilterSuggest