import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import InputMask from 'react-input-mask'
import * as Yup from 'yup'

import { close, remove, clear } from '../../store/reducers/cart'
import { RootState } from '../../store'
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
  Hollow,
  Overlay,
  PaymentCardRow,
  PaymentContainer,
  PaymentDateRow,
  PaymentTitle,
  RemoveButton,
  TotalContainer,
  SuccessMessage,
  SuccessTitle,
  ErrorText,
  RenderDiv
} from './styles'

const addressSchema = Yup.object().shape({
  receiver: Yup.string().required('Quem irá receber é obrigatório'),
  address: Yup.string().required('Endereço é obrigatório'),
  city: Yup.string().required('Cidade é obrigatória'),
  cep: Yup.string().required('CEP é obrigatório'),
  number: Yup.string().required('Número é obrigatório'),
  complement: Yup.string().notRequired()
})

const paymentSchema = Yup.object().shape({
  name: Yup.string().required('Nome no cartão é obrigatório'),
  number: Yup.string().required('Número do cartão é obrigatório'),
  cvv: Yup.string().required('CVV é obrigatório'),
  month: Yup.string().required('Mês de vencimento é obrigatório'),
  year: Yup.string().required('Ano de vencimento é obrigatório')
})

const Cart = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isOpen, items } = useSelector((state: RootState) => state.cart)

  const [step, setStep] = useState<'cart' | 'address' | 'payment'>('cart')
  const [orderCompleted, setOrderCompleted] = useState(false)
  const [orderNumber, setOrderNumber] = useState<number | null>(null)
  const [addressErrors, setAddressErrors] = useState<Record<string, string>>({})
  const [paymentErrors, setPaymentErrors] = useState<Record<string, string>>({})
  const [deliveryData, setDeliveryData] = useState({
    receiver: '',
    address: '',
    city: '',
    cep: '',
    number: '',
    complement: ''
  })
  const [paymentData, setPaymentData] = useState({
    name: '',
    number: '',
    cvv: '',
    month: '',
    year: ''
  })

  const handleDeliveryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDeliveryData({ ...deliveryData, [e.target.id]: e.target.value })
  }

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentData({ ...paymentData, [e.target.id]: e.target.value })
  }

  const total = items.reduce((acc, item) => acc + item.price, 0)

  const finalizeOrder = async () => {
    const isAddressValid = await validateAddress()
    const isPaymentValid = await validatePayment()
    if (!isAddressValid || !isPaymentValid) {
      if (!isAddressValid) setStep('address')
      else if (!isPaymentValid) setStep('payment')
      return
    }

    const orderData = {
      products: items.map((item) => ({
        id: item.id,
        price: item.price
      })),
      delivery: {
        receiver: deliveryData.receiver,
        address: {
          description: deliveryData.address,
          city: deliveryData.city,
          zipCode: deliveryData.cep,
          number: Number(deliveryData.number),
          complement: deliveryData.complement || ''
        }
      },
      payment: {
        card: {
          name: paymentData.name,
          number: paymentData.number,
          code: Number(paymentData.cvv),
          expires: {
            month: Number(paymentData.month),
            year: Number(paymentData.year)
          }
        }
      }
    }

    try {
      const response = await fetch(
        'https://api-ebac.vercel.app/api/efood/checkout',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(orderData)
        }
      )

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`HTTP ${response.status}: ${errorText}`)
      }

      const result = await response.json()
      const newOrderNumber = result.orderId || Date.now() // fallback
      setOrderNumber(newOrderNumber)
      setOrderCompleted(true)
      dispatch(clear())
    } catch (error) {
      console.error('Erro ao finalizar pedido:', error)
      const message =
        error instanceof Error ? error.message : 'Erro desconhecido'
      alert(`Falha ao processar o pedido: ${message}. Tente novamente.`)
    }
  }

  const concluded = () => {
    dispatch(close())
    navigate('/')
  }

  const validateAddress = async () => {
    try {
      await addressSchema.validate(deliveryData, { abortEarly: false })
      setAddressErrors({})
      return true
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors: Record<string, string> = {}
        err.inner.forEach((e) => {
          if (e.path) errors[e.path] = e.message
        })
        setAddressErrors(errors)
      }
      return false
    }
  }

  const validatePayment = async () => {
    try {
      await paymentSchema.validate(paymentData, { abortEarly: false })
      setPaymentErrors({})
      return true
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors: Record<string, string> = {}
        err.inner.forEach((e) => {
          if (e.path) errors[e.path] = e.message
        })
        setPaymentErrors(errors)
      }
      return false
    }
  }

  useEffect(() => {
    if (!isOpen) {
      setStep('cart')
      setOrderCompleted(false)
      setOrderNumber(null)
    }
  }, [isOpen])

  if (!isOpen) return null

  if (orderCompleted) {
    return (
      <>
        <Overlay onClick={() => dispatch(close())} />
        <CartContainer>
          <SuccessTitle>Pedido realizado - Ordem {orderNumber} </SuccessTitle>
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
      {items.map((item) => (
        <CartI key={item.cartId}>
          <CartItemImage src={item.image} alt={item.name} />
          <CartItemInfo>
            <CartItemTitle>{item.name}</CartItemTitle>
            <p>R$ {item.price.toFixed(2)}</p>
          </CartItemInfo>
          <RemoveButton onClick={() => dispatch(remove(item.cartId))}>
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
    <RenderDiv>
      <AddressTitle>Entrega</AddressTitle>
      <AddressContainer>
        <label htmlFor="receiver">Quem irá receber</label>
        <input
          type="text"
          id="receiver"
          value={deliveryData.receiver}
          onChange={handleDeliveryChange}
          required
        />
        {addressErrors.receiver && (
          <ErrorText>{addressErrors.receiver}</ErrorText>
        )}
        <label htmlFor="address">Endereço</label>
        <input
          type="text"
          id="address"
          value={deliveryData.address}
          onChange={handleDeliveryChange}
          required
        />
        {addressErrors.address && (
          <ErrorText>{addressErrors.address}</ErrorText>
        )}
        <label htmlFor="city">Cidade</label>
        <input
          type="text"
          id="city"
          value={deliveryData.city}
          onChange={handleDeliveryChange}
          required
        />
        {addressErrors.city && <ErrorText>{addressErrors.city}</ErrorText>}
        <AddressNumberContainer>
          <div>
            <label htmlFor="cep">CEP</label>
            <InputMask
              type="text"
              id="cep"
              value={deliveryData.cep}
              onChange={handleDeliveryChange}
              required
              mask="99999-999"
            />
            {addressErrors.cep && <ErrorText>{addressErrors.cep}</ErrorText>}
          </div>
          <div>
            <label htmlFor="number">Número</label>
            <input
              type="text"
              id="number"
              value={deliveryData.number}
              onChange={handleDeliveryChange}
              required
            />
            {addressErrors.number && (
              <ErrorText>{addressErrors.number}</ErrorText>
            )}
          </div>
        </AddressNumberContainer>
        <label htmlFor="complement">Complemento (opcional)</label>
        <input
          type="text"
          id="complement"
          value={deliveryData.complement}
          onChange={handleDeliveryChange}
        />
        <ButtonsContainer>
          <FormButton
            onClick={async () => {
              const isValid = await validateAddress()
              if (isValid) setStep('payment')
            }}
          >
            Continuar com o pagamento
          </FormButton>
          <FormButton onClick={() => setStep('cart')}>
            Voltar para o carrinho
          </FormButton>
        </ButtonsContainer>
      </AddressContainer>
    </RenderDiv>
  )

  const renderPayment = () => (
    <RenderDiv>
      <PaymentContainer>
        <PaymentTitle>
          Pagamento - Valor a pagar R$ {total.toFixed(2)}
        </PaymentTitle>
        <div>
          <label htmlFor="name">Nome no cartão</label>
          <input
            type="text"
            id="name"
            value={paymentData.name}
            onChange={handlePaymentChange}
            required
          />
          {paymentErrors.name && (
            <ErrorText className="payment">{paymentErrors.name}</ErrorText>
          )}
        </div>
        <PaymentCardRow>
          <div>
            <label htmlFor="number">Número do cartão</label>
            <InputMask
              type="text"
              id="number"
              value={paymentData.number}
              onChange={handlePaymentChange}
              required
              mask="9999 9999 9999 9999"
            />
            {paymentErrors.number && (
              <ErrorText className="payment">{paymentErrors.number}</ErrorText>
            )}
          </div>
          <div>
            <label htmlFor="cvv">CVV</label>
            <InputMask
              type="text"
              id="cvv"
              value={paymentData.cvv}
              onChange={handlePaymentChange}
              required
              mask="999"
            />
            {paymentErrors.cvv && (
              <ErrorText className="payment">{paymentErrors.cvv}</ErrorText>
            )}
          </div>
        </PaymentCardRow>
        <PaymentDateRow>
          <div>
            <label htmlFor="month">Mês de vencimento</label>
            <InputMask
              type="text"
              id="month"
              value={paymentData.month}
              onChange={handlePaymentChange}
              required
              mask="99"
            />
            {paymentErrors.month && (
              <ErrorText className="payment">{paymentErrors.month}</ErrorText>
            )}
          </div>
          <div>
            <label htmlFor="year">Ano de vencimento</label>
            <InputMask
              type="text"
              id="year"
              value={paymentData.year}
              onChange={handlePaymentChange}
              required
              mask="99"
            />
            {paymentErrors.year && (
              <ErrorText className="payment">{paymentErrors.year}</ErrorText>
            )}
          </div>
        </PaymentDateRow>
        <ButtonsContainer>
          <FormButton onClick={finalizeOrder}>Finalizar pagamento</FormButton>
          <FormButton onClick={() => setStep('address')}>
            Voltar para a edição de endereço
          </FormButton>
        </ButtonsContainer>
      </PaymentContainer>
    </RenderDiv>
  )
  return (
    <>
      <Overlay onClick={() => dispatch(close())} />
      <CartContainer>
        {items.length === 0 && step === 'cart' ? (
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
