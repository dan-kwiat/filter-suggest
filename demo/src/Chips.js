import React from 'react'
import PropTypes from 'prop-types'
import { ChipSet, Chip } from '@material/react-chips'
import MaterialIcon from '@material/react-material-icon'

const Chips = ({ labels, setLabels }) => (
  <div style={{ width: '100%' }}>
    <ChipSet
      input
      updateChips={chips => {
        setLabels(chips.map(x => x.label))
      }}
    >
      {labels.map(label =>
        <Chip
          className='filter-chip'
          id={`chip-${label}`}
          key={`chip-${label}`}
          label={label}
          title={label}
          removeIcon={<MaterialIcon icon='cancel' />}
        />
      )}
    </ChipSet>
  </div>
)
Chips.propTypes = {
  labels: PropTypes.arrayOf(PropTypes.string).isRequired,
  setLabels: PropTypes.func.isRequired,
}

export default Chips