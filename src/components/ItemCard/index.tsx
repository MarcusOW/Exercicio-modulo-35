import { Button, Card, Description, Image, Title } from './styles'

type Props = {
  image: string
  title: string
  description: string
  longDescription: string
  button: string
  price: number
  onItemClick: () => void
}

const ItemCard = ({
  image,
  title,
  description,
  button,
  onItemClick
}: Props) => (
  <Card>
    <Image src={image} alt={title} />
    <Title>{title}</Title>
    <Description>{description}</Description>
    <Button onClick={onItemClick}>{button}</Button>
  </Card>
)

export default ItemCard
