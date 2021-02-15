import { Container, Row, Col, Card, Button } from 'react-bootstrap'


export default function CardList (props) {
  const data = props.data

  return (
    <Col lg="2" className="mt-3">
      <Card className="border-0">
      <Card.Img variant="top" className="rounded" src={ data.poster_path } style={{ width: '100%', height: '20vh', objectFit: 'contain' }}/>
      <Card.Body>
      <Card.Title>{ data.title }</Card.Title>
      <Card.Text>
          { data.popularity }
      </Card.Text>
      <Button variant="primary">Detail</Button>
      </Card.Body>
      </Card>
    </Col>
  )
}