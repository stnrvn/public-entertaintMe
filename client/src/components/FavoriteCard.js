import { favouriteMovie } from '../cache'


export function FavoriteCard () {
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
      </Card.Body>
      </Card>
    </Col>
  )
}