import { useEffect, useState } from 'react'
import { useQuery, gql } from '@apollo/client'
import { Container, Row } from 'react-bootstrap'
import CardList from '../components/CardList'

const GET_MOVIES = gql`
  query getMovies{
  movies{
    _id
    title
    overview
  }
}
`

export default function Movies () {
  const { data, loading, error } = useQuery(GET_MOVIES)

  return (
    <Container fluid>
      <Row>
        {
          data.movies.map(movie => {
            return <CardList key={ movie.id } data={ movie } />
          })
        }
      </Row>
    </Container>
  )
}