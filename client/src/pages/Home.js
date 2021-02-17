import { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import CardList from '../components/CardList'
import OnlyCard from '../components/OnlyCard'
import NavigatorBar from '../components/NavigatorBar'
import { GET_ENTERTAINTME } from '../queries/query'

export default function Home () {
  const { data, loading, error } = useQuery(GET_ENTERTAINTME)

  if (loading) return (
    <h1>Loading..</h1>
  )
  
  return (
    <>
    <NavigatorBar />
    <Container fluid className="mt-4">
      <h3>List Movies</h3>
      <Row>
        {
          data.entertaintMe.movies.map(movie => {
            return <CardList key={ movie._id } data={ movie } urlName={ Object.keys(data.entertaintMe )[1] } />
          })
        }
      </Row>

      <h3>List Series</h3>
      <Row>
        {
          data.entertaintMe.series.map(series => {
            return <OnlyCard key={ series._id } data={ series } urlName={ Object.keys(data.entertaintMe )[2] }/>
          })
        }
      </Row>
    </Container>
    </>
  )
}