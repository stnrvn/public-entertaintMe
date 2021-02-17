import { Col, Card } from 'react-bootstrap'

export default function OnlyCard (props) {
  const data = props.data

  return (
    <Col lg="2" className="mt-3">
      <Card className="border-0">
      <Card.Img variant="top" className="rounded" src={ data.poster_path } style={{ backgroundSize: 'cover', maxHeight: '30vh', objectFit: 'contain'}}/>
      <Card.Body className="pl-0 pr-0">
      <Card.Title><h6>{ data.title }</h6></Card.Title>
      <Card.Text classname="inline-block">
          <i class="bi bi-star-fill pb-5 k"></i>
          <span>{ data.popularity }</span>
      </Card.Text>
      </Card.Body>
      </Card>
    </Col>
  )
}