import { ApolloClient, InMemoryCache } from '@apollo/client'
import favoriteMovie from '../cache/index'

const client = new ApolloClient({
    uri: 'http://localhost:4000/',
    cache: new InMemoryCache({
    typePolicies:{
      Query:{
        fields:{
          favorites:{
            read(){
              return favoriteMovie()
            }
          }
        }
      }
    }
  })
})

export default client