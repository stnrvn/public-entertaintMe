import { Container, Jumbotron } from 'react-bootstrap'

export default function Banner () {
  return (
    <Container fluid className="pl-0 pr-0">
      <Jumbotron className="rounded-0" style={{ backgroundImage: 'url(https://mir-s3-cdn-cf.behance.net/project_modules/1400/76b93774022631.5c1db81653e53.jpg)', backgroundSize: 'cover'}}>
        <h1 className="text-light">Hello!</h1>
        <h3 className="text-light">
            Many of movies, TV shows to discover.
        </h3>
      </Jumbotron>
    </Container>
  )
}