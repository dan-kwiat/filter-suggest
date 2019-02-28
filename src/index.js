import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Downshift from 'downshift'
import TextField, { Input } from '@material/react-text-field'
import List, {
  ListItem,
  ListItemGraphic,
  ListItemText,
  ListItemMeta,
} from '@material/react-list'
import { CircularProgress } from '@rmwc/circular-progress'
import '@material/react-list/dist/list.css'
import '@material/react-text-field/dist/text-field.css'
import '@rmwc/circular-progress/circular-progress.css'
import './FilterSuggest.css'

const getFilterTypes = (filterIds, inputValue) => {
  const cleanValue = inputValue.trim()
  const idx = filterIds.indexOf(cleanValue.split(':')[0])
  if (idx !== -1 && cleanValue.indexOf(`${filterIds[idx]}:`) === 0) {
    return [filterIds[idx]]
  }
  return filterIds
}

class FilterSuggest extends Component {
  stringify = item => {
    if (!item) return
    return item.complete ? '' : item.query
  }
  getOptionMatches = ({ id, icon, staticValues }, inputValue) => {
    if (!inputValue) return []
    if (this.props.showPrefix && inputValue === ':') return [{
      query: `${id}:`,
      icon,
      complete: false,
      suggestions: ((staticValues || []).join(', ') || 'type for suggestions'),
    }]
    const isLongerThanPrefix = inputValue.length > (`${id}:`).length
    const prefixValues = isLongerThanPrefix ? (staticValues || []).map(v => `${id}:${v}`) : [`${id}:`]
    const prefixValueMatches = prefixValues.filter(x => x.toLowerCase().indexOf(inputValue.toLowerCase()) === 0)
    const valuesMatches = (staticValues || []).filter(x => x.toLowerCase().indexOf(inputValue.toLowerCase()) > -1).map(v => `${id}:${v}`)
    const allMatches = [
      ...(this.props.showPrefix ? prefixValueMatches : []),
      ...valuesMatches,
    ]
    return allMatches.map(query => ({
      filterType: id,
      value: query.substr(id.length + 1),
      query: this.props.showPrefix ? query : query.substr(id.length + 1),
      icon,
      complete: query !== `${id}:`,
      suggestions: query === `${id}:` ? ((staticValues || []).join(', ') || 'type for suggestions') : `Filter by ${id}`,
    }))
  }
  getDropdownItems = inputValue => {
    return this.props.filterTypes.reduce((agg, filterType) => ([
      ...agg,
      ...this.getOptionMatches(filterType, inputValue),
    ]), [])
  }
  render() {
    const dropdownItems = [
      ...this.getDropdownItems(this.props.inputValue),
      ...this.props.controlledItems,
    ].slice(0, this.props.maxSuggestions)
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
              label={typeof this.props.label === 'undefined' ? (
                `Search by ${getFilterTypes(this.props.filterTypes.map(x => x.id), inputValue).join(', ')}...`
              ) : this.props.label}
              style={{ width: '100%' }}
              trailingIcon={this.props.loading ? <CircularProgress /> : undefined}
            >
              <Input
                {...getInputProps()}
                className='fs-search-input'
                type='search'
                data-lpignore={true}
              />
            </TextField>
            {isOpen && dropdownItems.length > 0 ? (
              <div
                style={{ position: 'relative', }}
              >
                <div
                  {...getMenuProps()}
                  className='fs-filter-menu'
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
                          {item.icon ? <ListItemGraphic graphic={item.icon} /> : <span />}
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
  filterTypes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    icon: PropTypes.element,
    staticValues: PropTypes.arrayOf(PropTypes.string),
  })).isRequired,
  inputValue: PropTypes.string.isRequired,
  label: PropTypes.string,
  loading: PropTypes.bool,
  maxSuggestions: PropTypes.number,
  onInputValueChange: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  showPrefix: PropTypes.bool,
}
FilterSuggest.defaultProps = {
  controlledItems: [],
  maxSuggestions: 12,
  showPrefix: true,
}

export default FilterSuggest