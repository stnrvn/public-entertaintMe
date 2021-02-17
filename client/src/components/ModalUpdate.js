import { Container, Row, Button, Modal, Form } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { UPDATE_MOVIE, GET_MOVIES } from '../queries/query'

export function ModalUpdate (props) {
  const id = props.id
  const data = props.data.movie

  const [formInput, setFormInput] = useState({
    title: data.title,
    overview: data.overview,
    poster_path: data.poster_path,
    popularity: data.popularity,
    tags: data.tags
  })

  const [updateMovie, { dataUpdate }] = useMutation(UPDATE_MOVIE, {
    refetchQueries: [{
      query: GET_MOVIES
    }]
  })

  const onChange = (e) => {
    let { name, value } = e.target
    const updateMovie = { ...formInput, [name]: value}
    setFormInput(updateMovie)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    updateMovie({
      variables: {
        movieId: id,
        updateMovie: {
          title: formInput.title,
          overview: formInput.overview,
          poster_path: formInput.poster_path,
          popularity: Number(formInput.popularity),
          tags: [formInput.tags]
        }
      }
    })
  }

  return (
    <>
          <Form onSubmit={onSubmit}>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={ formInput.title }
                onChange={ onChange }
                />
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
            <Button variant="primary" type="submit" className="float-left mt-3" >
              Edit
            </Button>
            </Form>
    </>
  )
}