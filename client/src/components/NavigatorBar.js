import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Banner from './Banner'

export default function NavigatorBar () {
  return (
    <Container fluid className="pl-0 pr-0">
      <Navbar collapseOnSelect expand="lg" variant="dark" style={{ backgroundColor: '#2f98ed'}}>
        <Navbar.Brand href="#home">E-Movies</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link as={Link} to={`/`} className="text-light">Home</Nav.Link>
            <Nav.Link as={Link} to={`/movies`} className="text-light">Movies</Nav.Link>
            <Nav.Link as={Link} to={`/series`} className="text-light">Series</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Banner />
    </Container>
  )
}