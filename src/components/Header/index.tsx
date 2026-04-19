import efoodLogo from '../../assets/image/logo.png'
import imagemDeFundo from '../../assets/image/imagem-de-fundo.png'
import imagemDeFundoItems from '../../assets/image/imagem-de-fundo-items.png'

import {
  BannerFoodType,
  BannerImage,
  BannerRestaurantTitle,
  ContainerItemsVar,
  Image,
  Logo,
  Title
} from './styles'

type Props = {
  variante?: 'padrão' | 'items'
  mostrarCarrinho?: boolean
  onCartClick?: () => void
  cartQuantity?: number
  children?: React.ReactNode
}

const Header = ({
  variante = 'padrão',
  mostrarCarrinho = false,
  onCartClick,
  cartQuantity
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
      <BannerImage style={{ backgroundImage: `url(${imagemDeFundoItems})` }}>
        <div className="container">
          <BannerFoodType>Italiana</BannerFoodType>
          <BannerRestaurantTitle>La Dolce Vita Trattoria</BannerRestaurantTitle>
        </div>
      </BannerImage>
    </>
  )
}

export default Header
