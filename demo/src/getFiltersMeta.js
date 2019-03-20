import React from 'react'
import MaterialIcon from '@material/react-material-icon'

const getFiltersMeta = ({ filterType, primary }) => {
  switch (filterType) {
    case 'search':
      return {
        icon: <MaterialIcon icon='search' />,
        secondary: `Search for ${primary}`,
      }
    case 'genre':
      return {
        icon: <MaterialIcon icon='category' />,
        secondary: 'Filter by genre',
      }
    case 'actor':
      return {
        icon: <MaterialIcon icon='person' />,
        secondary: 'Filter by actor',
      }
    case 'movie':
      return {
        icon: <MaterialIcon icon='movie' />,
        secondary: 'Filter by film',
      }
    default:
      return {}
  }
}

export default getFiltersMeta
