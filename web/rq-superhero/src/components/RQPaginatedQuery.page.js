import React, { useState } from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'
import { Api } from '../constants'

const fetchColors = (pageNumber) => axios.get(Api.colors + `?_limit=2&_page=${pageNumber}`)

// Objective: display 2 colors per page
// url for json server is like: localhost:4000/colors?_limit=2&_page=1

export const RQPaginatedQueryPage = () => {
    const [pageNumber, setPageNumber] = useState(1)
    const { isLoading, isError, error, data, isFetching } = useQuery(['colors', pageNumber], () => fetchColors(pageNumber), {
        // Set this to`true` to keep the previous `data` when fetching based on a new query key
        keepPreviousData: true
    })

    // without keepPreviousData, we show Loading layout and previous page's data is gone
    // we can see Loading in <p> with isFetching
    if (isLoading) {
        return <h2>Loading...</h2>
    }

    if (isError) {
        return <h2>{error.message}</h2>
    }

    return (
        <div>
            <h2>RQPaginatedQuery.page</h2>
            {data?.data.map(color => (
                <div key={color.id}>
                    <h2 style={{ color: color.label }}>{color.id}. {color.label}</h2>
                </div>
            ))}

            <p>{isFetching && 'Loading'}</p>

            <button onClick={() => setPageNumber(prev => prev !== 1 ? prev - 1 : prev)} disabled={pageNumber === 1}>Prev</button>
            <span>Page {pageNumber}</span>
            <button onClick={() => setPageNumber(prev => prev !== 4 ? prev + 1 : prev)} disabled={pageNumber === 4}>Next</button>
        </div>
    )
}
