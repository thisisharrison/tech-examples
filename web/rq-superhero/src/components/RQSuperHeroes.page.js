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

// default stale time is 0s

// refetchOnMount is default true. true | false | 'always'

// refetchOnWindowFocus is default true. true | false | 'always'

// refetchInterval: continuous refetch at that interval (polling), by default it stops polling when window loses focus
// refetchIntervalInBackground: poll data in background even when lose focus (switched tabs)

/** The RQ way of doing things */
export const RQSuperHeroesPage = () => {
  const { isLoading, data, isError, error, isFetching } = useQuery('superheroes', fetchSuperHeroes, {
    // will be garbage collected after 5s
    cacheTime: 5000,
    // how long is it okay for user to see stale data. we'll see the "fresh" flag longer now, isFetching will be false
    staleTime: 3000,
    // refetch every time component mounts. set to false, only fetches the first time
    refetchOnMount: true,
    // lose focus and gain focus, background refetch occurs 
    refetchOnWindowFocus: true,
    // fetch every 2s
    refetchInterval: 2000,
    refetchIntervalInBackground: false
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
