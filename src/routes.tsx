import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import RestaurantItems from './pages/RestaurantItems'
import LayoutComHeader from './layouts/LayoutComHeader'

const Rotas = () => (
  <Routes>
    <Route
      path="/"
      element={
        <LayoutComHeader>
          <Home />
        </LayoutComHeader>
      }
    />
    <Route path="/restaurante/:id" element={<RestaurantItems />} />
  </Routes>
)

export default Rotas
