import React from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'
import { Api } from '../constants'

const fetchSuperHeroes = () => axios.get(Api.good)

const fetchFriends = () => axios.get(Api.friends)

// Executed at the same to to maximize fetching concurrency
// Use alias in parallel queries to separate data variables

export const RQParallelQueryPage = () => {
    const { data: heroes } = useQuery('superheroes', fetchSuperHeroes)
    const { data: friends } = useQuery('friends', fetchFriends)

    return (
        <div>
            <h2>RQParallelQuery.page</h2>
            <pre>{JSON.stringify(heroes?.data)}</pre>
            <pre>{JSON.stringify(friends?.data)}</pre>
        </div>
    )
}
