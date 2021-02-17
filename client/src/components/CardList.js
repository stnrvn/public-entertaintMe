import { useState } from 'react'
import { Container, Row, Col, Card, Button, Popover, OverlayTrigger, Modal } from 'react-bootstrap'
import { useQuery, gql, useMutation } from '@apollo/client'
import { Link } from 'react-router-dom'
import { DELETE_MOVIE, GET_MOVIES, GET_MOVIE_DETAIL } from '../queries/query'
import { ModalUpdate, modalUpdate } from '../components/ModalUpdate'

export default function CardList (props) {
  const data = props.data
  const [show, setShow] = useState(false)
  const handleShow = () => setShow(true)
  const handleClose = () => setShow(false)

  const { data:movies, loading, error} = useQuery(GET_MOVIE_DETAIL, {
    variables: {
      movieId: data._id
    }
  })

  const [deleteMovie, { movie }] = useMutation(DELETE_MOVIE, {
    refetchQueries: [{
      query: GET_MOVIES
    }]
  })

  const popover = (id) => (
    <Popover id="popover-basic">
      <Popover.Content>
        <Link to={`/${ props.urlName }/${ data._id}`} className="btn btn-link text-decoration-none text-muted mb-2 mt-2">Detail</Link>
        <p><button onClick={handleShow} className="btn btn-link text-decoration-none text-muted">Edit</button></p>
        <p><button className="btn btn-link text-decoration-none text-muted" onClick={() => deleteHandler(id) }>Delete</button></p>
      </Popover.Content>
    </Popover>
  )

  const deleteHandler = (id) => {
    console.log(id)
    deleteMovie({
      variables: { 
        movieId: id
       }
    })
  }

  return (
    <Col lg="2" className="mt-3">
      <Card className="border-0">
      <Card.Img variant="top" className="rounded" src={ data.poster_path } style={{ width: '100%', height: '20vh', objectFit: 'contain' }}/>
      <Card.Body className="pl-0 pr-0">
      <Card.Title>{ data.title }</Card.Title>
      <Card.Text>
          { data.popularity }
      </Card.Text>
      <Button variant="primary">Favorite</Button>
      <OverlayTrigger trigger="click" rootClose data-trigger="focus" placement="bottom" overlay={popover(data._id)}>
        <Button
          className="float-right"
          variant="success"
          >Click me to see</Button>
      </OverlayTrigger>
      </Card.Body>
      </Card>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ModalUpdate id={ data._id } data={ movies }/>
          <Button variant="secondary" onClick={handleClose} className="float-right mt-3">
              Close
          </Button>
        </Modal.Body>
      </Modal>
    </Col>
  )
}