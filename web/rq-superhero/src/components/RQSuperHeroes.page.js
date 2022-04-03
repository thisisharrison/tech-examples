import axios from 'axios'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Api } from '../constants'
import { useOptimisticAddSuperHero, useSuperHeroesData } from '../hooks/useSuperHeroesData'

export const fetchSuperHeroes = () => {
  return axios.get(Api.good)
}

export const addSuperHero = (heroData) => {
  return axios.post(Api.good, heroData)
}

const formInitial = { name: '', alterEgo: '' }
/** The RQ way of doing things */
export const RQSuperHeroesPage = () => {
  const [newHero, setNewHero] = useState(formInitial)

  const onSuccess = (data) => {
    // alert("some success side effect")
    console.log('we get the ', data)
  }

  const onError = (error) => {
    // alert("some error side effect")
    console.error('we get the ', error.message)
  }

  const { isLoading, data, isError, error, isFetching, refetch } = useSuperHeroesData(onSuccess, onError)
  // function to post data
  const { mutate, isLoading: isAdding, isError: addIsError, error: addError } = useOptimisticAddSuperHero() //useAddSuperHeroData()

  // console.log({ isLoading, isFetching })

  if (isLoading || isFetching) {
    return <h2>Loading...</h2>
  }

  if (isError) {
    return <h2>{error.message}</h2>
  }

  const handleChange = (e) => {
    setNewHero(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(newHero)
    setNewHero(formInitial)
    mutate(newHero)
  }

  return (
    <>
      <h2>React Query Super Heroes Page</h2>

      <form onSubmit={handleSubmit}>
        {addIsError && <p className='error'>{addError.message}</p>}
        <label htmlFor='name'>Name</label>
        <input type='text' name='name' value={newHero.name} onChange={handleChange} />
        <label htmlFor='alterEgo'>Alter Ego</label>
        <input type='text' name='alterEgo' value={newHero.alterEgo} onChange={handleChange} />
        <input type='submit' value='Add Hero' />
        {isAdding && <p>Adding...</p>}
      </form>

      {/* click to manually trigger the query */}
      <button onClick={refetch}>Fetch heros</button>
      {data?.data.sort((a, b) => b.id - a.id).map(hero => {
        return <div key={hero.name}><Link to={`${hero.id}`}>{hero.name}</Link></div>
      })}

      {/* after data transformation with select, we can just map */}
      {/* {data && data.map(name => <div key={name}>{name}</div>)} */}
    </>
  )
}
