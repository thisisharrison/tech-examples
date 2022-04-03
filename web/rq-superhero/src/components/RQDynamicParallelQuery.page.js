import React, { useState } from 'react'
import { useQueries } from 'react-query'
import { fetchSuperHero } from '../api'

// number of queries to execute is dynamic from render to render 
// cannot use manual querying as it violates the rules of hook
// rule: Don’t call Hooks inside loops, conditions, or nested functions. 
// https://reactjs.org/docs/hooks-rules.html#explanation

// React relies on the order in which hooks are called to know which state corresponds to which hook call
// Order of the hook calls is the same on every render

// useQueries execute many queries in parallel by using array of option object and returns array of results

export const RQDynamicParallelQueryPage = () => {
    const [heroIds, setHeroIds] = useState(['1'])

    // bad: 
    // const resultData = []
    // for (const id in heroIds) {
    //     const result = useQuery(['superheroes', id], () => fetchSuperHero(id))
    //     resultData.push(result)
    //     /**React Hook "useQuery" may be executed more than once. 
    //      * Possibly because it is called in a loop. 
    //      * React Hooks must be called in the exact same order in every component render. */
    // }

    // good:
    const resultData = useQueries(
        heroIds.map((id) => ({
            queryKey: ['superheroes', id],
            queryFn: () => fetchSuperHero(id)
        }))
    )

    const handleClick = (e) => {
        const id = e.target.value
        const isExist = heroIds.includes(id)
        console.log('isExist', isExist)
        if (isExist) {
            console.log('here')
            setHeroIds(prev => prev.filter(i => i !== id))
        } else {
            setHeroIds(prev => [...prev, id])
        }
    }

    return (
        <div>
            <h2>RQDynamicParallelQuery</h2>
            <div>
                {['1', '2', '3'].map(id => (
                    <div key={id}>
                        <label htmlFor={id}>{id}</label>
                        <input type='checkbox' value={id} onChange={handleClick} checked={heroIds.includes(id)} />
                    </div>
                ))}
            </div>
            <h3>Results: {resultData?.length}</h3>
            <pre>{JSON.stringify(resultData, undefined, 2)}</pre>
        </div>
    )
}
