import React from 'react';
import { useQuery } from 'react-query';
import Planet from './Planet'

/** obj will have queryKey
{
"queryKey": [
    "planets",
    "hello world"
],
    "signal": { }
}
 */
const fetchPlanets = async (page) => {
    const res = await fetch(`https://swapi.dev/api/planets/?page=${page}`)
    if (res.ok) {
        return res.json()
    }
}

const config = {
    // only refetch stale data
    // staleTime: 0,
    // if we shorten the cacheTime, we'll see "loading" every time. If we cached it, then react query will use cached result
    // cacheTime: 10,
    // this is by default
    // refetchOnMount: true
    // if saleTime is 0, we keep fetching and onSuccess will be called multiple times
    // onSuccess: () => alert("data fetched")
}

const Planets = () => {
    const [page, setPage] = React.useState(1)
    // status -> loading, success
    const { data, status } = useQuery(['planets', page], () => fetchPlanets(page), config);


    console.log('data', data)
    console.log('status', status)

    return (
        <div>
            <h2>Planets</h2>
            {/* <p>{status}</p> */}

            {status === 'error' && (
                <div>Error fetching data</div>
            )}

            {status === 'loading' && (
                <div>Loading data...</div>
            )}

            {status === 'success' && (
                <>
                    <button onClick={() => setPage(old => Math.max(1, old - 1))} disabled={page === 1}>Prev page</button>
                    <span>{page}</span>
                    {/* if we don't have data or data does not have next property then stay on the old page, otherwise add 1 */}
                    <button onClick={() => setPage(old => (!data || !data.next) ? old : old + 1)} disabled={!data || !data.next}>Next page</button>
                    <div>
                        {data.results.map(planet => (
                            <Planet key={planet.name} planet={planet} />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

export default Planets;