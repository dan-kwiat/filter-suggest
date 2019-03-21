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
import '@rmwc/circular-progress/circular-progress.css'
import './filter-suggest.css'

const FilterSuggest = ({
  textFieldClassName,
  inputValue,
  label,
  loading,
  maxSuggestions,
  menuClassName,
  onInputValueChange,
  onSelect,
  items,
}) => {
  return (
    <Downshift
      selectedItem={null}
      inputValue={inputValue}
      onInputValueChange={x => onInputValueChange(x || '')}
      itemToString={item => item ? item.primary : ''}
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
            className={`fs-search-text-field ${textFieldClassName}`}
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
                className={`fs-filter-menu ${menuClassName}`}
              >
                <List
                  twoLine
                  singleSelection
                  selectedIndex={highlightedIndex}
                  handleSelect={(selectedIndex) => setHighlightedIndex(selectedIndex)}
                >
                  {items.slice(0, maxSuggestions).map((item, index) => {
                    return (
                      <ListItem
                        {...getItemProps({ item })}
                        key={item.id}
                      >
                        {item.icon ? <ListItemGraphic graphic={item.icon} /> : <span />}
                        <ListItemText primaryText={item.primary} secondaryText={item.secondary || ' '} />
                        <ListItemMeta meta={highlightedIndex === index ? 'Enter' : ' '}/>
                      </ListItem>
                    )
                  })}
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
  textFieldClassName: PropTypes.string,
  inputValue: PropTypes.string.isRequired,
  label: PropTypes.string,
  loading: PropTypes.bool,
  maxSuggestions: PropTypes.number,
  menuClassName: PropTypes.string,
  onInputValueChange: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    icon: PropTypes.element,
    primary: PropTypes.string.isRequired,
    secondary: PropTypes.string,
  })).isRequired,
}
FilterSuggest.defaultProps = {
  label: 'Start typing...',
  maxSuggestions: 12,
}

export default FilterSuggest
