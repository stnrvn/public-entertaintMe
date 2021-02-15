import { useEffect, useState } from 'react'
import { useQuery, gql } from '@apollo/client'
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import CardList from '../components/CardList'

const GET_ENTERTAINTME = gql`
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

export default function Home () {
  const { data, loading, error } = useQuery(GET_ENTERTAINTME)

  if (loading) return (
    <h1>Loading..</h1>
  )
  
  return (
    <Container fluid>
      <h1>List Movies</h1>
      <Row>
        {
          data.entertaintMe.movies.map(movie => {
            return <CardList key={ movie.id } data={ movie } />
          })
        }
      </Row>

      <h1>List Series</h1>
      <Row>
        {
          data.entertaintMe.series.map(series => {
            return <CardList key={ series.id } data={ series } />
          })
        }
      </Row>
    </Container>
  )
}