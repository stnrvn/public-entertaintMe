import { Container, Row, Button, Modal, Form } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import { useQuery, gql, useMutation } from '@apollo/client'
import { GET_MOVIES, ADD_MOVIE } from '../queries/query'


export default function ModalCreate () {
  const [show, setShow] = useState(false)
  const handleShow = () => setShow(true)
  const handleClose = () => setShow(false)
  const [formInput, setFormInput] = useState({
    title: '',
    overview: '',
    poster_path: '',
    popularity: '',
    tags: ''
  })

  const [createMovie, { data }] = useMutation(ADD_MOVIE, {
    refetchQueries: [{
      query: GET_MOVIES
    }]
  })
  const onChange = (e) => {
    let { name, value } = e.target
    const newMovie = { ...formInput, [name]: value}
    setFormInput(newMovie)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    createMovie({
      variables: {
        newMovie: {
          title: formInput.title,
          overview: formInput.overview,
          poster_path: formInput.poster_path,
          popularity: Number(formInput.popularity),
          tags: [formInput.tags]
        }
      }
    })
    setShow(false)
  }

  return (
    <>
    <Button variant="primary" onClick={handleShow} className="mb-3 mt-3">
        Add Movie
    </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={onSubmit}>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={ formInput.title }
                onChange={ onChange }
                placeholder="Enter Title" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Overview</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="overview"
                value={ formInput.overview }
                onChange={ onChange }
                placeholder="Enter Overview" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Poster Url</Form.Label>
              <Form.Control
              type="text"
              name="poster_path"
              value={ formInput.poster_path }
              onChange={ onChange }
              placeholder="Enter Poster Url" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Popularity</Form.Label>
              <Form.Control
              type="number"
              name="popularity"
              value={ formInput.popularity }
              onChange={ onChange }
              placeholder="Enter Popularity" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Tags</Form.Label>
              <Form.Control
              type="text"
              name="tags"
              value={ formInput.tags }
              onChange={ onChange }
              placeholder="Enter Tags" />
            </Form.Group>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Add
            </Button>
            </Modal.Footer>
            </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}