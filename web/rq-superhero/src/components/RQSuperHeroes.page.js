import { useQuery } from 'react-query'
import axios from 'axios'

const fetchSuperHeroes = () => {
  return axios.get('http://localhost:4000/superheroes')
}

// useQuery
// 1st arg: unique key to identify query
// 2nd arg: function returns a promise
export const RQSuperHeroesPage = () => {
  const { isLoading, data } = useQuery('superheroes', fetchSuperHeroes)

  if (isLoading) {
    return <h2>Loading...</h2>
  }

  return (
    <>
      <h2>React Query Super Heroes Page</h2>
      {data?.data.map(hero => {
        return <div>{hero.name}</div>
      })}
    </>
  )
}
