import { Link } from 'react-router-dom'
import estrela from '../../assets/image/estrela.png'
import Tag from '../Tag'
import {
  Button,
  Card,
  Description,
  Image,
  Infos,
  RateStar,
  Rating,
  Title,
  TitleRate
} from './styles'
import RestaurantModel from '../../models/RestaurantModel'

type Props = {
  restaurant: RestaurantModel
}

const Restaurant = ({ restaurant }: Props) => {
  const tags = []
  if (restaurant.highlighted) tags.push('Destaque da semana')
  tags.push(restaurant.type)

  return (
    <Card>
      <Image src={restaurant.cover} alt={restaurant.title} />
      <Infos>
        {tags.map((info) => (
          <Tag key={info}>{info}</Tag>
        ))}
      </Infos>
      <TitleRate>
        <Title>{restaurant.title}</Title>
        <RateStar>
          <Rating>{restaurant.rating}</Rating>
          <img src={estrela} alt="estrela" />
        </RateStar>
      </TitleRate>
      <Description>{restaurant.description}</Description>
      <Button as={Link} to={`/restaurante/${restaurant.id}`}>
        Ver cardápio
      </Button>
    </Card>
  )
}

export default Restaurant
