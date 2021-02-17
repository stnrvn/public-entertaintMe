import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'

import {
  Home,
  Movies,
  Series,
  DetailMovies,
  DetailSeries,
  Favorites
} from './pages'

import { ApolloProvider } from '@apollo/client'
import client from './config/apolloclient'

function App() {
  return (
    <ApolloProvider client={ client }>
      <Router>
        <Link to={`/favorites`} className="btn btn-link text-decoration-none text-muted mb-2 mt-2">Favorites page</Link>
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route exact path='/movies'>
            <Movies />
          </Route>
          <Route  path='/movies/:id'>
            <DetailMovies />
          </Route>
          <Route exact path='/series'>
            <Series />
          </Route>
          <Route path='/series/:id'>
            <DetailSeries />
          </Route>
          <Route exact path='/favorites'>
            <Favorites />
          </Route>
        </Switch>
      </Router>
    </ApolloProvider>
  )
}

export default App;
