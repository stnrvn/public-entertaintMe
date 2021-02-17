import { useEffect, useState } from 'react'
import { useQuery, gql } from '@apollo/client'
import { Container, Row, Button, Popover, OverlayTrigger } from 'react-bootstrap'
import CardList from '../components/CardList'
import ModalCreate from '../components/ModalCreate'
import { GET_MOVIES } from '../queries/query'
import NavigatorBar from '../components/NavigatorBar'

export default function Movies () {
  const { data:movies, loading, error } = useQuery(GET_MOVIES)

  if (loading) return (
    <h1>Loading..</h1>
  )

  return (
    <>
    <NavigatorBar />
    <Container fluid>
      <ModalCreate/>
      <Row>
        {
          movies.movies.map(listMovie => {
            return <CardList key={ listMovie._id } data={ listMovie } urlName={ Object.keys(movies) }/>
          })
        }
      </Row>
    </Container>
    </>
  )
}