import Restaurant from '../Restaurant'
import RestaurantModel from '../../models/RestaurantModel'
import { List, ListItem } from './styles'

type Props = {
  restaurants: RestaurantModel[]
}

const RestaurantsList = ({ restaurants }: Props) => (
  <div>
    <List>
      {restaurants.map((restaurant) => (
        <ListItem key={restaurant.id}>
          <Restaurant
            image={restaurant.image}
            title={restaurant.title}
            description={restaurant.description}
            infos={restaurant.infos}
            rating={restaurant.rating}
            button={restaurant.button}
          />
        </ListItem>
      ))}
    </List>
  </div>
)

export default RestaurantsList
