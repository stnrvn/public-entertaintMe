import { gql } from '@apollo/client'

export const GET_ENTERTAINTME = gql`
  query getEntertaintMe{
  entertaintMe{
    movies{
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
    series{
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
}
`

export const GET_MOVIES = gql`
  query getMovies{
    movies{
        _id
        title
        overview
        poster_path
        popularity
        tags
    }
  }
`

export const GET_SERIES = gql`
  query getSeries{
  series{
    _id
    title
    overview
    poster_path
    popularity
    tags
  }
}
`

export const GET_MOVIE_DETAIL = gql`
  query getMovieById($movieId: ID){
    movie(_id: $movieId){
      title
      overview
      poster_path
      popularity
      tags
    }
}
`

export const GET_SERIES_DETAIL = gql`
  query getSeriesById($seriesId: ID){
    seriesById(_id: $seriesId){
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`

export const ADD_MOVIE = gql`
  mutation createMovie($newMovie: MovieInput){
    createMovie(data: $newMovie){
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`

export const UPDATE_MOVIE = gql`
  mutation updateMovie($movieId: ID, $updateMovie: MovieInput){
  updateMovie(_id: $movieId, data: $updateMovie){
    _id
    title
    overview
    poster_path
    popularity
    tags
  }
}
`

export const DELETE_MOVIE = gql`
  mutation deleteMovie($movieId: ID){
    deleteMovie(_id: $movieId){
      _id
    }
  }
`

export const DELETE_SERIES = gql`
  mutation deleteSeries($seriesId: ID){
    deleteSeries(_id: $seriesId){
      title
    }
}
`

export const GET_FAVORITES = gql`
  query {
    favorites @client
  }
`