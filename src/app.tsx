import { ErrorBoundary, LocationProvider, Route, Router } from 'preact-iso'
import { Home } from './components/Home'
import { Navbar } from './components/Navbar'
import { Genres } from './components/Genres'
import { Countries } from './components/Countries'
import { NotFound } from './components/NotFound'

export function App() {
  return (
    <>
      <h1 class={"my-3"}>Movie API client</h1>
      <Navbar />
      <LocationProvider>
        <ErrorBoundary>
          <Router>
            <Route path="/" component={Home} />
            <Route path="/genres" component={Genres} />
            <Route path="/countries" component={Countries} />
            <Route component={NotFound} default />
          </Router>
        </ErrorBoundary>
      </LocationProvider>
    </>
  )
}
