import { useQuery } from 'react-query'
import axios from 'axios'
import { Api } from '../constants'

const fetchSuperHero = ({ queryKey }) => {
    // use the default params that get passed
    const id = queryKey[1]
    return axios.get(Api.good + `/${id}`)
}

// include id to the key by using array. RQ will remain separate query for each hero.

export const useSuperHeroData = (id) => {
    // No need for arrow function, RQ auto pass param to the fetcher function
    // return useQuery(['superhero', id], () => fetchSuperHero(id))
    return useQuery(['superhero', id], fetchSuperHero)
}