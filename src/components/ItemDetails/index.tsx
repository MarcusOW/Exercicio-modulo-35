import ItemModel from '../../models/ItemModel'
import botao_x from '../../assets/image/botao-x.png'

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
  item: ItemModel | null
  onAddToCart: (item: ItemModel) => void
}

const ItemDetails = ({ isOpen, onClose, item, onAddToCart }: Props) => {
  console.log('🔴🔴🔴 onAddToCart é:', onAddToCart, 'tipo:', typeof onAddToCart)
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
          <DetailsImage src={item.image} alt={item.title} />
          <div>
            <Title>{item.title}</Title>
            <Description>
              {item.longDescription} <br /> <br />
              Serve de: 2 a 3 pessoas
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
