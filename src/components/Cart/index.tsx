import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import lixeira from '../../assets/image/lixeira-de-reciclagem.svg'

import {
  FormButton,
  ButtonsContainer,
  AddressContainer,
  AddressNumberContainer,
  AddressTitle,
  CartContainer,
  CartI,
  CartItemImage,
  CartItemInfo,
  CartItemTitle,
  CheckoutButton,
  FormInput,
  Hollow,
  Overlay,
  PaymentCardRow,
  PaymentContainer,
  PaymentDateRow,
  PaymentTitle,
  RemoveButton,
  TotalContainer,
  SuccessMessage,
  SuccessTitle
} from './styles'
import { CartItem } from '../../models/RestaurantModel'

type Props = {
  isOpen: boolean
  onClose: () => void
  cartItems: CartItem[]
  onRemove: (cartId: number) => void
}

const Cart = ({ isOpen, onClose, cartItems, onRemove }: Props) => {
  const navigate = useNavigate()
  const [step, setStep] = useState<'cart' | 'address' | 'payment'>('cart')
  const [orderCompleted, setOrderCompleted] = useState(false)
  const [orderNumber, setOrderNumber] = useState<number | null>(null)
  const total = cartItems.reduce((acc, item) => acc + item.price, 0)

  const finalizeOrder = () => {
    const newOrderNumber = Date.now()
    setOrderNumber(newOrderNumber)
    setOrderCompleted(true)
  }

  const concluded = () => {
    onClose()
    navigate('/')
  }

  if (!isOpen) return null

  if (orderCompleted) {
    return (
      <>
        <Overlay onClick={onClose} />
        <CartContainer>
          <SuccessTitle>Pedido realizado - Ordem #{orderNumber} </SuccessTitle>
          <SuccessMessage>
            Estamos felizes em informar que seu pedido já está em processo de
            preparação e, em breve, será entregue no endereço fornecido. <br />{' '}
            <br />
            Gostaríamos de ressaltar que nossos entregadores não estão
            autorizados a realizar cobranças extras. <br /> <br /> Lembre-se da
            importância de higienizar as mãos após o recebimento do pedido,
            garantindo assim sua segurança e bem-estar durante a refeição.{' '}
            <br />
            <br />
            Esperamos que desfrute de uma deliciosa e agradável experiência
            gastronômica. Bom apetite!
          </SuccessMessage>
          <FormButton onClick={concluded}>Concluir</FormButton>
        </CartContainer>
      </>
    )
  }

  const renderCart = () => (
    <>
      {cartItems.map((item) => (
        <CartI key={item.id}>
          <CartItemImage src={item.image} alt={item.name} />
          <CartItemInfo>
            <CartItemTitle>{item.name}</CartItemTitle>
            <p>R$ {item.price.toFixed(2)}</p>
          </CartItemInfo>
          <RemoveButton onClick={() => onRemove(item.cartId)}>
            <img src={lixeira} alt="Remover" />
          </RemoveButton>
        </CartI>
      ))}
      <TotalContainer>
        <p>Valor total</p>
        <p>R$ {total.toFixed(2)}</p>
      </TotalContainer>
      <CheckoutButton onClick={() => setStep('address')}>
        Continuar com a entrega
      </CheckoutButton>
    </>
  )

  const renderAddress = () => (
    <div>
      <AddressTitle>Entrega</AddressTitle>
      <AddressContainer>
        <label htmlFor="name">Quem irá receber</label>
        <FormInput type="text" id="name" required />
        <label htmlFor="address">Endereço</label>
        <FormInput type="text" id="address" required />
        <label htmlFor="city">Cidade</label>
        <FormInput type="text" id="city" required />
        <AddressNumberContainer>
          <div>
            <label htmlFor="cep">CEP</label>
            <FormInput type="number" id="cep" required />
          </div>
          <div>
            <label htmlFor="number">Número</label>
            <FormInput type="number" id="number" required />
          </div>
        </AddressNumberContainer>
        <label htmlFor="complement">Complemento(opcional)</label>
        <FormInput type="text" id="complement" />
        <ButtonsContainer>
          <FormButton onClick={() => setStep('payment')}>
            Continuar com o pagamento
          </FormButton>
          <FormButton onClick={() => setStep('cart')}>
            Voltar para o carrinho
          </FormButton>
        </ButtonsContainer>
      </AddressContainer>
    </div>
  )

  const renderPayment = () => (
    <PaymentContainer>
      <PaymentTitle>
        Pagamento - Valor a pagar R$ {total.toFixed(2)}
      </PaymentTitle>
      <div>
        <label htmlFor="nameCard">Nome no cartão</label>
        <FormInput type="text" id="nameCard" required />
      </div>
      <PaymentCardRow>
        <div>
          <label htmlFor="numberCard">Número do cartão</label>
          <FormInput type="number" id="numberCard" required />
        </div>
        <div>
          <label htmlFor="cvv">CVV</label>
          <FormInput type="number" id="cvv" required />
        </div>
      </PaymentCardRow>
      <PaymentDateRow>
        <div>
          <label htmlFor="monthValid">Mês de vencimento</label>
          <FormInput type="number" id="monthValid" required />
        </div>
        <div>
          <label htmlFor="yearValid">Ano de vencimento</label>
          <FormInput type="number" id="yearValid" required />
        </div>
      </PaymentDateRow>
      <ButtonsContainer>
        <FormButton onClick={finalizeOrder}>Finalizar pagamento</FormButton>
        <FormButton onClick={() => setStep('address')}>
          Voltar para a edição de endereço
        </FormButton>
      </ButtonsContainer>
    </PaymentContainer>
  )
  return (
    <>
      <Overlay onClick={onClose} />
      <CartContainer>
        {cartItems.length === 0 && step === 'cart' ? (
          <Hollow>Seu carrinho está vazio</Hollow>
        ) : (
          <>
            {step === 'cart' && renderCart()}
            {step === 'address' && renderAddress()}
            {step === 'payment' && renderPayment()}
          </>
        )}
      </CartContainer>
    </>
  )
}

export default Cart
