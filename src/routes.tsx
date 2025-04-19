import { Route, Routes as Router } from 'react-router'
import { AppLayout } from './_layouts/app'
import { NotFound } from './not-found'
import { CryptonDetails } from './pages/crypton-details'
import { Home } from './pages/home'

export function Routes() {
  return (
    <Router>
      <Route element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route path="/crypton-details/:id" element={<CryptonDetails />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Router>
  )
}
