import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

import {
  Home,
  Movies
} from './pages'

import { ApolloProvider } from '@apollo/client'
import client from './config/apolloclient'

function App() {
  return (
    <ApolloProvider client={ client }>
      <Router>
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route path='/movies'>
            <Movies />
          </Route>
        </Switch>
      </Router>
    </ApolloProvider>
  )
}

export default App;
