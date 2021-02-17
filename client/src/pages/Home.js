import { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import CardList from '../components/CardList'
import { GET_ENTERTAINTME } from '../queries/query'

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
            return <CardList key={ movie._id } data={ movie } urlName={ Object.keys(data.entertaintMe )[1] } />
          })
        }
      </Row>

      <h1>List Series</h1>
      <Row>
        {
          data.entertaintMe.series.map(series => {
            return <CardList key={ series._id } data={ series } urlName={ Object.keys(data.entertaintMe )[2] }/>
          })
        }
      </Row>
    </Container>
  )
}