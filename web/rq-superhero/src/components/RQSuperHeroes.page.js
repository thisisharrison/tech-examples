import { useQuery } from 'react-query'
import axios from 'axios'
import { Api } from '../constants'

const fetchSuperHeroes = () => {
  return axios.get(Api.good)
}

// useQuery
// 1st arg: unique key to identify query
// 2nd arg: function returns a promise
// 3rd arg: config

// every query is cached for 5min (300000), after that it will be garbage collected
// it is cached using the key and the fetch function as ID 
// background refetch will occur (isFetching flag)
// update db.json and will see it refetches in the background and update this page, without seeing isLoading

/** The RQ way of doing things */
export const RQSuperHeroesPage = () => {
  const { isLoading, data, isError, error, isFetching } = useQuery('superheroes', fetchSuperHeroes, {
    // will be garbage collected after 5s
    cacheTime: 5000
  })

  console.log({ isLoading, isFetching })

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
