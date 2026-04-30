import botao_x from '../../assets/image/botao-x.png'
import { MenuItem } from '../../models/RestaurantModel'

import {
  AddToCartButton,
  CloseButton,
  CloseButtonImg,
  Description,
  DetailsContainer,
  DetailsImage,
  DetailsInfo,
  Overlay,
  Title
} from './styles'

type Props = {
  isOpen: boolean
  onClose: () => void
  item: MenuItem | null
  onAddToCart: (item: MenuItem) => void
}

const ItemDetails = ({ isOpen, onClose, item, onAddToCart }: Props) => {
  if (!isOpen || !item) return null

  const addToCart = () => {
    onAddToCart(item)
    onClose()
  }

  return (
    <>
      <Overlay onClick={onClose} />
      <DetailsContainer>
        <CloseButton onClick={onClose}>
          <CloseButtonImg src={botao_x} alt="Fechar" />
        </CloseButton>
        <DetailsInfo>
          <DetailsImage src={item.image} alt={item.name} />
          <div>
            <Title>{item.name}</Title>
            <Description>
              {item.description} <br /> <br />
              Serve de: {item.portion}
            </Description>
            <AddToCartButton onClick={addToCart}>
              Adicionar ao carrinho - R$ {item.price.toFixed(2)}
            </AddToCartButton>
          </div>
        </DetailsInfo>
      </DetailsContainer>
    </>
  )
}

export default ItemDetails
