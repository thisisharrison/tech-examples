import { useQuery } from 'react-query'
import axios from 'axios'
import { Api } from '../constants'

const fetchSuperHeroes = () => {
  return axios.get(Api.good)
}

// useQuery
// 1st arg: unique key to identify query
// 2nd arg: function returns a promise

/** The RQ way of doing things */
export const RQSuperHeroesPage = () => {
  const { isLoading, data, isError, error } = useQuery('superheroes', fetchSuperHeroes)

  if (isLoading) {
    return <h2>Loading...</h2>
  }

  if (isError) {
    return <h2>{error.message}</h2>
  }

  return (
    <>
      <h2>React Query Super Heroes Page</h2>
      {data?.data.map(hero => {
        return <div key={hero.name}>{hero.name}</div>
      })}
    </>
  )
}
