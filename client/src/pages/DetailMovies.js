import { useParams } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'
import { GET_MOVIE_DETAIL } from '../queries/query'
import NavigatorBar from '../components/NavigatorBar'

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
    <>
    <NavigatorBar />
    <div className="container-fluid">
        <div className="row">
          <div className="col-lg-3 mt-3">
            <div className="card bg-light border-light shadow text-white">
                <img src={ movies.movie.poster_path } className="card-img" alt={ movies.movie.title } />
                </div>
          </div>
          <div className="col-lg-9 mt-2">
              <h2>{ movies.movie.title }</h2>
              <h4 className="text-muted pt-3">Description:</h4>
              <h6>{ movies.movie.overview }</h6>
              <h4 className="text-muted text-justify pt-3">Popularity:</h4>
              <h6>{ movies.movie.popularity } %</h6>
          </div>
        </div>
      </div>
    </>
  )
}