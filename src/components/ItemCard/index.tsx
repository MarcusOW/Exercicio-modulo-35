import { MenuItem } from '../../models/RestaurantModel'
import { Button, Card, Description, Image, Title } from './styles'

type Props = {
  item: MenuItem
  onItemClick: () => void
}

const ItemCard = ({ item, onItemClick }: Props) => (
  <Card>
    <Image src={item.image} alt={item.name} />
    <Title>{item.name}</Title>
    <Description>{item.description}</Description>
    <Button onClick={onItemClick}>Comprar o produto</Button>
  </Card>
)

export default ItemCard
