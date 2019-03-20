import React from 'react'
import PropTypes from 'prop-types'
import { ChipSet, Chip } from '@material/react-chips'
import MaterialIcon from '@material/react-material-icon'
import getFiltersMeta from './getFiltersMeta'

const Chips = ({ labels, setLabels }) => (
  <div style={{ width: '100%' }}>
    <ChipSet
      input
      updateChips={chips => {
        setLabels(chips.map(x => x.id))
      }}
    >
      {labels.map(label =>
        <Chip
          className='filter-chip'
          id={label}
          key={label}
          label={label.split('-').slice(2).join('-')}
          title={label.split('-').slice(2).join('-')}
          leadingIcon={getFiltersMeta(label.split('-')[0]).icon}
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