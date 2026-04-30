import { useEffect, useState } from 'react'
import Restaurant from '../Restaurant'
import RestaurantModel, { ApiRestaurant } from '../../models/RestaurantModel'
import { List, ListItem } from './styles'

const RestaurantsList = () => {
  const [restaurants, setRestaurants] = useState<RestaurantModel[]>([])

  useEffect(() => {
    fetch('https://api-ebac.vercel.app/api/efood/restaurantes')
      .then((res) => res.json())
      .then((data: ApiRestaurant[]) => {
        const instances = data.map((item) => new RestaurantModel(item))
        setRestaurants(instances)
      })
  }, [])

  return (
    <List>
      {restaurants.map((restaurant) => (
        <ListItem key={restaurant.id}>
          <Restaurant restaurant={restaurant} />
        </ListItem>
      ))}
    </List>
  )
}

export default RestaurantsList
