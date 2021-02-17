import { useParams } from 'react-router-dom'


export default function DetailSeries () {
  const { id } = useParams()

  return (
    <h1>{ id }</h1>
  )
}