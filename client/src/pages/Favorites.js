import { GET_FAVORITES } from '../queries/query'
import { useQuery } from '@apollo/client'

export default function Favorites () {
  const {data:favorites,loading,error} = useQuery(GET_FAVORITES)

  if (loading){
    return <h1>Loading</h1>
  }

  return(
   <h1>{ JSON.stringify(favorites) }</h1>
  )
}