import { useParams } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'
import { GET_MOVIE_DETAIL } from '../queries/query'

export default function DetailMovies () {
  const { id } = useParams()
  const { data:movies, loading, error} = useQuery(GET_MOVIE_DETAIL, {
    variables: {
      movieId: id
    }
  })

  if (loading) return (
    <h1>Loading..</h1>
  )

  return (
    <h1>{ movies.movie.title }</h1>
  )
}