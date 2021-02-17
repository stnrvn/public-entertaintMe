import { useParams } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'
import { GET_SERIES_DETAIL } from '../queries/query'
import NavigatorBar from '../components/NavigatorBar'


export default function DetailSeries () {
  const { id } = useParams()
  const { data:series, loading, error} = useQuery(GET_SERIES_DETAIL, {
    variables: {
      seriesId: id
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
                <img src={ series.seriesById.poster_path } className="card-img" alt={ series.seriesById.title } />
                </div>
          </div>
          <div className="col-lg-9 mt-2">
              <h2>{ series.seriesById.title }</h2>
              <h4 className="text-muted pt-3">Description:</h4>
              <h6>{ series.seriesById.overview }</h6>
              <h4 className="text-muted text-justify pt-3">Popularity:</h4>
              <h6>{ series.seriesById.popularity } %</h6>
          </div>
        </div>
      </div>
    </>
  )
}