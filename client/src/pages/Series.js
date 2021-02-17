import { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { Container, Row } from 'react-bootstrap'
import CardList from '../components/CardList'
import { GET_SERIES } from '../queries/query'

export default function Series () {
  const { data:series, loading, error } = useQuery(GET_SERIES)

  if (loading) return (
    <h1>Loading..</h1>
  )

  return (
    <Container fluid>
        <h1>{ Object.keys(series) }</h1>
      <Row>
        {
          series.series.map(listSeries => {
            return <CardList key={ listSeries._id } data={ listSeries } urlName={ Object.keys(series) } />
          })
        }
      </Row>
    </Container>
  )
}