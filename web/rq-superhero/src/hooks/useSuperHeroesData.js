import { useQuery } from 'react-query'
import { fetchSuperHeroes } from '../components/RQSuperHeroes.page'

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

// enabled: fire on mount, default true. used for user driven fetching

// refetch: function to manually trigger the query

// onSuccess, onError: perform side effect when query completes

// select: data transformation before rendering

export const _useSuperHeroesData = (onSuccess, onError, enabled) => {
    return useQuery('superheroes', fetchSuperHeroes, {
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
        refetchIntervalInBackground: false,
        // false to not fire the get request on mount
        enabled,
        // callbacks and side effects for success and error 
        onSuccess,
        // will perform query 3 times before it calls onError
        onError,
        // data transformation will take data as arg
        select: (data) => data.data.map(hero => hero.name)
    })
}

export const useSuperHeroesData = (onSuccess, onError) => {
    return useQuery('superheroes', fetchSuperHeroes, {
        onSuccess,
        onError,
    })
}