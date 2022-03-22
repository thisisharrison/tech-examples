import { useState, useEffect } from 'react'
import axios from 'axios'
import { Api } from '../constants'

/** The traditional way of doing things */
export const SuperHeroesPage = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    axios.get(Api.good).then(res => {
      setData(res.data)
      setIsLoading(false)
    }).catch(err => {
      setError(err.message)
      setIsLoading(false)
    })
  }, [])

  if (isLoading) {
    return <h2>Loading...</h2>
  }

  if (error) {
    return <h2>{error}</h2>
  }

  return (
    <>
      <h2>Super Heroes Page</h2>
      {data.map(hero => {
        return <div key={hero.name}>{hero.name}</div>
      })}
    </>
  )
}
