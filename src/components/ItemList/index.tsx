import { MenuItem } from '../../models/RestaurantModel'
import ItemCard from '../ItemCard'
import { ItemContainer } from './styles'

type Props = {
  items: MenuItem[]
  onItemClick?: (item: MenuItem) => void
}

const ItemList = ({ items, onItemClick }: Props) => (
  <div className="container">
    <ItemContainer>
      {items.map((item) => (
        <li key={item.id}>
          <ItemCard item={item} onItemClick={() => onItemClick?.(item)} />
        </li>
      ))}
    </ItemContainer>
  </div>
)

export default ItemList
