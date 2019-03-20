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
import './filter-suggest.css'

const FilterSuggest = ({
  inputValue,
  label,
  loading,
  maxSuggestions,
  onInputValueChange,
  onSelect,
  options,
}) => {
  const items = options.slice(0, maxSuggestions)
  return (
    <Downshift
      selectedItem={null}
      inputValue={inputValue}
      onInputValueChange={x => onInputValueChange(x || '')}
      itemToString={item => item.primary}
      defaultHighlightedIndex={0}
      onStateChange={(changes, downshift) => {
        if (changes.hasOwnProperty('selectedItem')) {
          if (changes.selectedItem.primary) {
            return onSelect(changes.selectedItem)
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
            label={label}
            trailingIcon={loading ? <CircularProgress /> : undefined}
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
                      const val = item.primary
                      const query = item.prefix ? `${item.prefix}:${val}` : val
                      return (
                        <ListItem
                          {...getItemProps({ item })}
                          key={item.id}
                        >
                          {item.icon ? <ListItemGraphic graphic={item.icon} /> : <span />}
                          <ListItemText primaryText={query} secondaryText={item.prompt || ' '} />
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
FilterSuggest.propTypes = {
  inputValue: PropTypes.string.isRequired,
  label: PropTypes.string,
  loading: PropTypes.bool,
  maxSuggestions: PropTypes.number,
  onInputValueChange: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    primary: PropTypes.string.isRequired,
    icon: PropTypes.element,
    prefix: PropTypes.string,
    prompt: PropTypes.string,
  })).isRequired,
}
FilterSuggest.defaultProps = {
  label: 'Start typing to search filters...',
  maxSuggestions: 12,
}

export default FilterSuggest
