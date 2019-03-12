import React from 'react'
import MaterialIcon from '@material/react-material-icon'

const getFiltersMeta = filterType => {
  switch (filterType) {
    case 'genre':
      return {
        prefix: null,
        icon: <MaterialIcon icon='category' />,
        prompt: 'Filter by genre',
      }
    case 'actor':
      return {
        prefix: null,
        icon: <MaterialIcon icon='person' />,
        prompt: 'Filter by actor',
      }
    case 'movie':
      return {
        prefix: null,
        icon: <MaterialIcon icon='movie' />,
        prompt: 'Filter by film',
      }
    default:
      return {}
  }
}

export default getFiltersMeta
