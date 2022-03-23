import axios from 'axios'
import { Link } from 'react-router-dom'
import { Api } from '../constants'
import { useSuperHeroesData } from '../hooks/useSuperHeroesData'

export const fetchSuperHeroes = () => {
  return axios.get(Api.good)
}

/** The RQ way of doing things */
export const RQSuperHeroesPage = () => {
  const onSuccess = (data) => {
    // alert("some success side effect")
    console.log('we get the ', data)
  }

  const onError = (error) => {
    // alert("some error side effect")
    console.error('we get the ', error.message)
  }

  const { isLoading, data, isError, error, isFetching, refetch } = useSuperHeroesData(onSuccess, onError)

  console.log({ isLoading, isFetching })

  if (isLoading || isFetching) {
    return <h2>Loading...</h2>
  }

  if (isError) {
    return <h2>{error.message}</h2>
  }

  return (
    <>
      <h2>React Query Super Heroes Page</h2>
      {/* click to manually trigger the query */}
      <button onClick={refetch}>Fetch heros</button>
      {data?.data.map(hero => {
        return <div key={hero.name}><Link to={`${hero.id}`}>{hero.name}</Link></div>
      })}

      {/* after data transformation with select, we can just map */}
      {/* {data && data.map(name => <div key={name}>{name}</div>)} */}
    </>
  )
}
