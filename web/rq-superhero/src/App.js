import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import './App.css'
import { HomePage } from './components/Home.page'
import { RQSuperHeroesPage } from './components/RQSuperHeroes.page'
import { SuperHeroesPage } from './components/SuperHeroes.page'
import { RQSuperHeroPage } from './components/RQSuperHero.page'
import { RQParallelQueryPage } from './components/RQParallelQuery.page'
import { RQDynamicParallelQueryPage } from './components/RQDynamicParallelQuery.page'
import { RQDependentQueryPage } from './components/RQDependentQuery.page'
import { RQPaginatedQueryPage } from './components/RQPaginatedQuery.page'
import { RQInfiniteQueryPage } from './components/RQInfiniteQuery.page'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div>
          <nav>
            <ul>
              <li>
                <Link to='/'>Home</Link>
              </li>
              <li>
                <Link to='/super-heroes'>Traditional Super Heroes</Link>
              </li>
              <li>
                <Link to='/rq-super-heroes'>RQ Super Heroes</Link>
              </li>
              <li>
                <Link to='/rq-parallel-queries'>RQ Parallel Queries</Link>
              </li>
              <li>
                <Link to='/rq-dynamic-parallel-queries'>RQ Dynamic Parallel Queries</Link>
              </li>
              <li>
                <Link to='/rq-dependent-queries'>RQ Dependent Queries</Link>
              </li>
              <li>
                <Link to='/rq-paginated-queries'>RQ Paginated Queries</Link>
              </li>
              <li>
                <Link to='/rq-infinite-queries'>RQ Infinite Queries</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path='/super-heroes' element={<SuperHeroesPage />} />
            <Route path='/rq-parallel-queries' element={<RQParallelQueryPage />} />
            <Route path='/rq-dynamic-parallel-queries' element={<RQDynamicParallelQueryPage />} />
            <Route path='/rq-dependent-queries' element={<RQDependentQueryPage email='demo@example.com' />} />
            <Route path='/rq-paginated-queries' element={<RQPaginatedQueryPage />} />
            <Route path='/rq-infinite-queries' element={<RQInfiniteQueryPage />} />
            <Route path='/rq-super-heroes' element={<RQSuperHeroesPage />} />
            <Route path='/rq-super-heroes/:heroId' element={<RQSuperHeroPage />} />
            <Route path='/' element={<HomePage />} />
          </Routes>
        </div>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
    </QueryClientProvider>
  )
}

export default App
