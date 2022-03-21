import React from 'react';
import { useQuery } from 'react-query';
import Person from './Person'

const fetchPeople = async () => {
    const res = await fetch('http://swapi.dev/api/people')
    if (res.ok) {
        return res.json()
    }
}

const People = () => {
    // status -> loading, success
    // we're using cached data and in the background useQuery will fetch 
    const { data, status } = useQuery('people', fetchPeople);

    console.log(data, status)

    return (
        <div>
            <h2>People</h2>
            {/* <p>{status}</p> */}

            {status === 'error' && (
                <div>Error fetching data</div>
            )}

            {status === 'loading' && (
                <div>Loading data...</div>
            )}

            {status === 'success' && (
                <div>
                    {data.results.map(person => (
                        <Person key={person.name} person={person} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default People;