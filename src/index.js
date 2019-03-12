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

class FilterSuggest extends Component {
  stringifySelection = item => {
    if (!item) return
    const val = item.label || item.value
    if (val) return
    const { prefix } = this.props.meta(item.filterType)
    if (prefix) return `${prefix}:`
    return
  }
  matches = (str, target, prefixOnly=false) => {
    const index = target.toLowerCase().indexOf(str.toLowerCase())
    return prefixOnly ? (
      index === 0
    ) : (
      index > -1
    )
  }
  getItems = () => {
    const matchingItems = this.props.options.reduce((agg, x) => {
      if (x.conditional) {
        const doesMatch = this.matches(this.props.inputValue, x.label || x.value)
        if (!doesMatch) {
          return agg
        }
      }
      return [...agg, x]
    }, [])
    return matchingItems.slice(0, this.props.maxSuggestions)
  }
  render() {
    const items = this.getItems()
    return (
      <Downshift
        selectedItem={null}
        inputValue={this.props.inputValue}
        onInputValueChange={x => this.props.onInputValueChange(x || '')}
        itemToString={this.stringifySelection}
        defaultHighlightedIndex={0}
        onStateChange={(changes, downshift) => {
          if (changes.hasOwnProperty('selectedItem')) {
            if (changes.selectedItem.value) {
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
              className='fs-search-text-field'
              label={typeof this.props.label === 'undefined' ? (
                'Start typing to search filters...'
              ) : this.props.label}
              trailingIcon={this.props.loading ? <CircularProgress /> : undefined}
            >
              <Input
                {...getInputProps()}
                className='fs-search-input'
                type='search'
                data-lpignore={true}
              />
            </TextField>
            {isOpen && items.length > 0 ? (
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
                      items.map((item, index) => {
                        const { prefix, icon, prompt } = this.props.meta(item.filterType)
                        const val = item.label || item.value
                        const query = prefix ? `${prefix}:${val}` : val
                        return (
                          <ListItem
                            {...getItemProps({ item })}
                            key={item.id}
                          >
                            {icon ? <ListItemGraphic graphic={icon} /> : <span />}
                            <ListItemText primaryText={query} secondaryText={prompt || ' '} />
                            <ListItemMeta meta={highlightedIndex === index ? 'Enter' : ' '}/>
                          </ListItem>
                        )
                      })
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
  meta: PropTypes.func,
  inputValue: PropTypes.string.isRequired,
  label: PropTypes.string,
  loading: PropTypes.bool,
  maxSuggestions: PropTypes.number,
  onInputValueChange: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    filterType: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    label: PropTypes.string,
    conditional: PropTypes.bool.isRequired,
  })).isRequired,
}
FilterSuggest.defaultProps = {
  meta: filterType => ({
    prefix: filterType,
    icon: null,
    prompt: `Filter by ${filterType}`,
  }),
  maxSuggestions: 12,
}

export default FilterSuggest
