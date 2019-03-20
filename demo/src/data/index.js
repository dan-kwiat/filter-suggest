import actors from './actors'
import genres from './genres'
import movies from './movies'

const filterOptions = [
  ...actors.map((x, i) => ({
    id: `actor-${i}-${x.name}`,
    filterType: 'actor',
    value: x.name,
    label: x.alternative_name,
  })),
  ...genres.map((x, i) => ({
    id: `genre-${i}-${x}`,
    filterType: 'genre',
    value: x,
    label: null,
  })),
  ...movies.map((x, i) => ({
    id: `movie-${i}-${x.title}`,
    filterType: 'movie',
    value: x.title,
    label: null,
  })),
]

export default filterOptions
