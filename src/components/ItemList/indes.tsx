import ItemCard from '../ItemCard'
import ItemModel from '../../models/ItemModel'
import { ItemContainer } from './styles'

type Props = {
  items: ItemModel[]
  onItemClick?: (item: ItemModel) => void
}

const ItemList = ({ items, onItemClick }: Props) => (
  <div className="container">
    <ItemContainer>
      {items.map((item) => (
        <li key={item.id}>
          <ItemCard
            image={item.image}
            title={item.title}
            description={item.description}
            longDescription={item.longDescription}
            button={item.button}
            price={item.price}
            onItemClick={() => onItemClick?.(item)}
          />
        </li>
      ))}
    </ItemContainer>
  </div>
)

export default ItemList
