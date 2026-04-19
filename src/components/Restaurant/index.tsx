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

type Props = {
  image: string
  title: string
  description: string
  infos: string[]
  button: string
  rating: number
}

const Restaurant = ({
  image,
  title,
  description,
  infos,
  rating,
  button
}: Props) => (
  <Card>
    <Image src={image} alt={title} />
    <Infos>
      {infos.map((info) => (
        <Tag key={info}>{info}</Tag>
      ))}
    </Infos>
    <TitleRate>
      <Title>{title}</Title>
      <RateStar>
        <Rating>{rating}</Rating>
        <img src={estrela} alt="estrela" />
      </RateStar>
    </TitleRate>
    <Description>{description}</Description>
    <Button as={Link} to="/items">
      {button}
    </Button>
  </Card>
)

export default Restaurant
