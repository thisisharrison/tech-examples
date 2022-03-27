import React, { useState, useRef, useEffect, useLayoutEffect } from 'react'
import { useInfiniteQuery } from 'react-query'
import axios from 'axios'
import { Api } from '../constants'

// destructure pageParam which is the args we get in the fetch fn when using useInfiniteQuery. The rest args are meta, queryKey, signal
// default to first page
const fetchColors = ({ pageParam = 1, ...rest }) => {
    console.log({ pageParam, rest })
    return axios.get(Api.colors + `?_limit=2&_page=${pageParam}`)
}


export const RQInfiniteQueryPage1 = () => {
    const { isLoading, isError, error, data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery(['colors'], fetchColors, {
        getNextPageParam: (lastPage, allPages) => {
            if (allPages.length < 4) {
                // It should return a single variable that will be passed as the last optional parameter to your query function.
                return allPages.length + 1
            } else {
                // Return undefined to indicate there is no next page available.
                return undefined
            }
        }
    })

    if (isLoading) {
        return <h2>Loading...</h2>
    }

    if (isError) {
        return <h2>{error.message}</h2>
    }

    return (
        <div>
            <h2>RQInfiniteQuery.page</h2>
            {/* useInfinite returns `pages` */}
            {data?.pages.map((group, i) => {
                // eslint-disable-next-line no-lone-blocks
                {/* each group is a query itself, so it's an object with data key */ }
                console.log({ group, index: i })
                return group.data.map((color) =>
                    <div key={color.id}>
                        <h2 style={{ color: color.label }}>{color.id}. {color.label}</h2>
                    </div>
                )
            })}

            <p>{isFetchingNextPage && 'Loading'}</p>

            {/* cancelRefetch */}
            {/* calling fetchNextPage repeatedly won't have any effect until the first invocation has resolved */}
            {/* keep pressing the button and it keeps fetching, unless cancelRefetch */}
            <button disabled={!hasNextPage} onClick={() => fetchNextPage({ cancelRefetch: true })}>Load more</button>
        </div>
    )
}

const fetchWords = ({ pageParam = 1, }) => {
    return axios.get(Api.words + `?_limit=10&_page=${pageParam}`)
}

export const RQInfiniteQueryPage2 = () => {
    const { data, hasNextPage, isFetchingNextPage, isLoading, fetchNextPage } = useInfiniteQuery(['words'], fetchWords, {
        getNextPageParam: (lastPage, allPages) => {
            if (allPages.length < Math.round(2309 / 10)) {
                return allPages.length + 1
            } else {
                console.log('returned undefined')
                return undefined
            }
        },
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false
    })

    const ref = useRef(null)

    const handleScroll = (e) => {
        const { clientHeight, scrollTop, scrollHeight } = e.currentTarget
        console.log(({ clientHeight, scrollTop, scrollHeight, diff: scrollHeight - scrollTop - clientHeight }))
        // when the difference is close enough fetch next page
        if (scrollHeight - scrollTop - clientHeight <= 1) {
            fetchNextPage({ cancelRefetch: false })
        }
    }

    // scroll bottom to see loading text
    useLayoutEffect(() => {
        if (isFetchingNextPage) {
            ref.current.scrollTop = ref.current.scrollHeight
        }
    }, [isFetchingNextPage])

    return (
        <div style={{ height: '200px', width: '200px', border: '1px solid black', overflowX: 'scroll', padding: 0 }} ref={ref} onScroll={handleScroll}>
            {data?.pages.map((group, i) => {
                return group.data.map((word) =>
                    <p style={{ padding: 0, margin: 0, fontSize: '20px' }} key={word}>{word}</p>
                )
            })}

            <div style={{ textAlign: 'center' }}>
                {isLoading || isFetchingNextPage ? <b>Loading</b> : !hasNextPage ? <b>You've reached bottom</b> : null}
            </div>

        </div>
    )
}


export const RQInfiniteQueryPage = () => (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
        <RQInfiniteQueryPage1 />
        <RQInfiniteQueryPage2 />
    </div>
)