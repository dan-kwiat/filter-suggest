import actors from './actors'
import genres from './genres'
import movies from './movies'

const filterOptions = [
  ...actors.map(x => ({
    id: `actor-${x.name}`,
    filterType: 'actor',
    value: x.name,
    label: x.alternative_name,
  })),
  ...genres.map(x => ({
    id: `genre-${x}`,
    filterType: 'genre',
    value: x,
    label: null,
  })),
  ...movies.map(x => ({
    id: `movie-${x.title}`,
    filterType: 'movie',
    value: x.title,
    label: null,
  })),
]

export default filterOptions
