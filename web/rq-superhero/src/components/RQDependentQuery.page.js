import React from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'
import { Api } from '../constants'

// fetching something that depends on the result of another
// do this by using the enabled option 

// ["courses", null] -> first this will run
// ["user", "demo@example.com"] -> this resolves
// ["courses", "youtube"] -> then this runs

const fetchUserByEmail = (email) => axios.get(Api.users + `/${email}`)
const fetchCoursesByChannel = (channel) => axios.get(Api.channels + `/${channel}`)

export const RQDependentQueryPage = ({ email }) => {
    const { data: user } = useQuery(['user', email], () => fetchUserByEmail(email))

    const channelId = user?.data.channelId

    const { isIdle, isLoading, data: courses } = useQuery(['courses', channelId], () => fetchCoursesByChannel(channelId), {
        // The query will not execute until the channelId exists
        enabled: !!channelId
    })

    // isIdle will be `true` until `enabled` is true and the query begins to fetch.
    // It will then go to the `isLoading` stage and hopefully the `isSuccess` stage :)

    if (isIdle) {
        return <h2>Idling...</h2>
    }

    if (isLoading) {
        return <h2>Loading...</h2>
    }

    return (
        <div>
            <h2>RQDependentQuery.page</h2>
            {courses?.data.courses.map(course => <p key={course}>{course}</p>)}
        </div>
    )
}
