import efoodLogo from '../../assets/image/logo.png'
import imagemDeFundo from '../../assets/image/imagem-de-fundo.png'

import {
  BannerFoodType,
  BannerImage,
  BannerRestaurantTitle,
  ContainerItemsVar,
  Image,
  Logo,
  Title
} from './styles'
import RestaurantModel from '../../models/RestaurantModel'

type Props = {
  variante?: 'padrão' | 'items'
  mostrarCarrinho?: boolean
  onCartClick?: () => void
  cartQuantity?: number
  restaurant?: RestaurantModel
}

const Header = ({
  variante = 'padrão',
  mostrarCarrinho = false,
  onCartClick,
  cartQuantity,
  restaurant
}: Props) => {
  if (variante === 'padrão') {
    return (
      <Image style={{ backgroundImage: `url(${imagemDeFundo})` }}>
        <Logo src={efoodLogo} alt="Efood-logo" />
        <Title>
          Viva experiências gastronômicas <br />
          no conforto da sua casa
        </Title>
      </Image>
    )
  }
  return (
    <>
      <Image style={{ backgroundImage: `url(${imagemDeFundo})` }}>
        <ContainerItemsVar>
          <a href="/">Restaurantes</a>
          <img src={efoodLogo} alt="Efood-logo" />
          <p onClick={onCartClick} style={{ cursor: 'pointer' }}>
            {mostrarCarrinho ? `${cartQuantity} produto(s) no carrinho` : ''}
          </p>
        </ContainerItemsVar>
      </Image>
      <BannerImage style={{ backgroundImage: `url(${restaurant?.cover})` }}>
        <div className="container">
          <BannerFoodType>{restaurant?.type}</BannerFoodType>
          <BannerRestaurantTitle>{restaurant?.title}</BannerRestaurantTitle>
        </div>
      </BannerImage>
    </>
  )
}

export default Header
