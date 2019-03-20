import React from 'react'
import MaterialIcon from '@material/react-material-icon'

const getFiltersMeta = ({ filterType, primary }) => {
  switch (filterType) {
    case 'search':
      return {
        icon: <MaterialIcon icon='search' />,
        prompt: `Search for ${primary}`,
      }
    case 'genre':
      return {
        icon: <MaterialIcon icon='category' />,
        prompt: 'Filter by genre',
      }
    case 'actor':
      return {
        icon: <MaterialIcon icon='person' />,
        prompt: 'Filter by actor',
      }
    case 'movie':
      return {
        icon: <MaterialIcon icon='movie' />,
        prompt: 'Filter by film',
      }
    default:
      return {}
  }
}

export default getFiltersMeta
