import { useQuery, useQueryClient } from 'react-query'
import axios from 'axios'
import { Api } from '../constants'

const fetchSuperHero = ({ queryKey }) => {
    // use the default params that get passed
    const id = queryKey[1]
    return axios.get(Api.good + `/${id}`)
}

// include id to the key by using array. RQ will remain separate query for each hero.
// similar to redux's selector. we can set initial data by selecting data from the store

export const useSuperHeroData = (id) => {
    // queryClient has QueryClient cache
    const queryClient = useQueryClient()
    // No need for arrow function, RQ auto pass param to the fetcher function
    // return useQuery(['superhero', id], () => fetchSuperHero(id))
    return useQuery(['superhero', id], fetchSuperHero, {
        initialData: () => {
            // use the cache and get data by the query key
            // we may not have it yet, so optional chain to get `data`
            // data might not exist yet, so optional chain to `find`
            const heroes = queryClient.getQueryData("superheroes")
            const hero = heroes?.data?.find(hero => hero.id === parseInt(id))

            if (hero) {
                // return the same structure as before (see RQSuperHero.page)
                return {
                    data: hero
                }
            } else {
                return undefined
            }
        }
    })
}