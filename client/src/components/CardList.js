import { useState } from 'react'
import { Col, Card, Button, Popover, OverlayTrigger, Modal } from 'react-bootstrap'
import { useQuery, useMutation } from '@apollo/client'
import { Link } from 'react-router-dom'
import { DELETE_MOVIE, GET_MOVIES, GET_MOVIE_DETAIL, GET_FAVORITES } from '../queries/query'
import { ModalUpdate } from './ModalUpdate'
import favoriteMovie from '../cache/index'

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

  const onClickHandler = () => {
    favoriteMovie([...favoriteMovie(), data])
  }

  const deleteHandler = (id) => {
    deleteMovie({
      variables: { 
        movieId: id
       }
    })
  }

  
  return (
    <Col lg="2" className="mt-3">
      <Card className="border-0">
      <Card.Img variant="top" className="rounded"  src={ data.poster_path } style={{ backgroundSize: 'cover', maxHeight: '30vh', objectFit: 'contain'}}/>
      <Card.Body className="pl-0 pr-0">
      <Card.Title><h6>{ data.title }</h6></Card.Title>
      <Card.Text classname="inline-block">
          <i class="bi bi-star-fill pb-5 k"></i>
          <span>{ data.popularity }</span>
      </Card.Text>
      <button className="btn btn-link"onClick={onClickHandler}><i class="bi bi-heart"></i></button>
      <OverlayTrigger trigger="click" rootClose data-trigger="focus" placement="top" overlay={popover(data._id)}>
        <button className="btn btn-link float-right"><i class="bi bi-three-dots-vertical"></i></button>
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