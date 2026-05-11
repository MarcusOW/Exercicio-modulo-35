import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import InputMask from 'react-input-mask'
import * as Yup from 'yup'

import { close, remove, clear } from '../../store/reducers/cart'
import { RootState } from '../../store'
import { checkInputHasError } from '../../utils'
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
  receiver: Yup.string()
    .required('Quem irá receber é obrigatório')
    .min(5, 'Nome muito curto'),
  address: Yup.string()
    .required('Endereço é obrigatório')
    .min(5, 'Endereço muito curto'),
  city: Yup.string()
    .required('Cidade é obrigatória')
    .min(3, 'Cidade muito curta'),
  cep: Yup.string()
    .required('CEP é obrigatório')
    .matches(/^\d{5}-\d{3}$/, 'CEP inválido'),
  number: Yup.string()
    .required('Número é obrigatório')
    .matches(/^\d+$/, '"Número" deve conter apenas números'),
  complement: Yup.string().notRequired()
})

const paymentSchema = Yup.object().shape({
  name: Yup.string()
    .required('Nome no cartão é obrigatório')
    .min(3, 'Nome muito curto'),
  number: Yup.string()
    .required('Número do cartão é obrigatório')
    .matches(/^\d{4} \d{4} \d{4} \d{4}$/, 'Número do cartão inválido'),
  cvv: Yup.string()
    .required('CVV é obrigatório')
    .matches(/^\d{3}$/, 'CVV deve ter 3 dígitos'),
  month: Yup.string()
    .required('Mês é obrigatório')
    .matches(/^(0[1-9]|1[0-2])$/, 'Mês deve ter 2 dígitos'),
  year: Yup.string()
    .required('Ano é obrigatório')
    .matches(/^\d{2}$/, 'Ano deve ter 2 dígitos')
})

const Cart = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isOpen, items } = useSelector((state: RootState) => state.cart)

  const [step, setStep] = useState<'cart' | 'address' | 'payment'>('cart')
  const [orderCompleted, setOrderCompleted] = useState(false)
  const [orderNumber, setOrderNumber] = useState<number | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const addressFormik = useFormik({
    initialValues: {
      receiver: '',
      address: '',
      city: '',
      cep: '',
      number: '',
      complement: ''
    },
    validationSchema: addressSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: () => setStep('payment')
  })

  const paymentFormik = useFormik({
    initialValues: {
      name: '',
      number: '',
      cvv: '',
      month: '',
      year: ''
    },
    validationSchema: paymentSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: () => finalizeOrder()
  })

  const total = items.reduce((acc, item) => acc + item.price, 0)

  const finalizeOrder = async () => {
    if (isSubmitting) return
    setIsSubmitting(true)
    if (!addressFormik.isValid || !paymentFormik.isValid) {
      if (!addressFormik.isValid) setStep('address')
      else if (!paymentFormik.isValid) setStep('payment')
      return
    }

    const orderData = {
      products: items.map((item) => ({ id: item.id, price: item.price })),
      delivery: {
        receiver: addressFormik.values.receiver,
        address: {
          description: addressFormik.values.address,
          city: addressFormik.values.city,
          zipCode: addressFormik.values.cep.replace(/\D/g, ''),
          number: Number(addressFormik.values.number),
          complement: addressFormik.values.complement || ''
        }
      },
      payment: {
        card: {
          name: paymentFormik.values.name,
          number: paymentFormik.values.number.replace(/\s/g, ''),
          code: Number(paymentFormik.values.cvv),
          expires: {
            month: Number(paymentFormik.values.month),
            year: Number(paymentFormik.values.year)
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
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      const result = await response.json()
      const newOrderNumber = result.orderId || Date.now()
      setOrderNumber(newOrderNumber)
      setOrderCompleted(true)
      dispatch(clear())
    } catch (error) {
      console.error(error)
      alert('Falha ao processar o pedido. Tente novamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const concluded = () => {
    dispatch(close())
    navigate('/')
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
      <AddressContainer as="form" onSubmit={addressFormik.handleSubmit}>
        <label htmlFor="receiver">Quem irá receber</label>
        <input
          type="text"
          id="receiver"
          name="receiver"
          value={addressFormik.values.receiver}
          onChange={addressFormik.handleChange}
          onBlur={addressFormik.handleBlur}
          required
        />
        {checkInputHasError(addressFormik, 'receiver') && (
          <ErrorText>{addressFormik.errors.receiver}</ErrorText>
        )}

        <label htmlFor="address">Endereço</label>
        <input
          type="text"
          id="address"
          name="address"
          value={addressFormik.values.address}
          onChange={addressFormik.handleChange}
          onBlur={addressFormik.handleBlur}
          required
        />
        {checkInputHasError(addressFormik, 'address') && (
          <ErrorText>{addressFormik.errors.address}</ErrorText>
        )}

        <label htmlFor="city">Cidade</label>
        <input
          type="text"
          id="city"
          name="city"
          value={addressFormik.values.city}
          onChange={addressFormik.handleChange}
          onBlur={addressFormik.handleBlur}
          required
        />
        {checkInputHasError(addressFormik, 'city') && (
          <ErrorText>{addressFormik.errors.city}</ErrorText>
        )}

        <AddressNumberContainer>
          <div>
            <label htmlFor="cep">CEP</label>
            <InputMask
              mask="99999-999"
              type="text"
              id="cep"
              name="cep"
              value={addressFormik.values.cep}
              onChange={addressFormik.handleChange}
              onBlur={addressFormik.handleBlur}
              required
            >
              {(inputProps) => <input {...inputProps} />}
            </InputMask>
            {checkInputHasError(addressFormik, 'cep') && (
              <ErrorText>{addressFormik.errors.cep}</ErrorText>
            )}
          </div>
          <div>
            <label htmlFor="number">Número</label>
            <input
              type="text"
              id="number"
              name="number"
              inputMode="numeric"
              pattern="\d*"
              value={addressFormik.values.number}
              onChange={(e) => {
                const numericValue = e.target.value.replace(/\D/g, '')
                addressFormik.setFieldValue('number', numericValue)
              }}
              onBlur={addressFormik.handleBlur}
              required
            />
            {checkInputHasError(addressFormik, 'number') && (
              <ErrorText>{addressFormik.errors.number}</ErrorText>
            )}
          </div>
        </AddressNumberContainer>

        <label htmlFor="complement">Complemento (opcional)</label>
        <input
          type="text"
          id="complement"
          name="complement"
          value={addressFormik.values.complement}
          onChange={addressFormik.handleChange}
          onBlur={addressFormik.handleBlur}
        />

        <ButtonsContainer>
          <FormButton type="submit" disabled={!addressFormik.isValid}>
            Continuar com o pagamento
          </FormButton>
          <FormButton type="button" onClick={() => setStep('cart')}>
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
        <form onSubmit={paymentFormik.handleSubmit}>
          <div>
            <label htmlFor="name">Nome no cartão</label>
            <input
              type="text"
              id="name"
              name="name"
              value={paymentFormik.values.name}
              onChange={paymentFormik.handleChange}
              onBlur={paymentFormik.handleBlur}
              required
            />
            {checkInputHasError(paymentFormik, 'name') && (
              <ErrorText className="payment">
                {paymentFormik.errors.name}
              </ErrorText>
            )}
          </div>
          <PaymentCardRow>
            <div>
              <label htmlFor="number">Número do cartão</label>
              <InputMask
                mask="9999 9999 9999 9999"
                type="text"
                id="number"
                name="number"
                value={paymentFormik.values.number}
                onChange={paymentFormik.handleChange}
                onBlur={paymentFormik.handleBlur}
                required
              >
                {(inputProps) => <input {...inputProps} />}
              </InputMask>
              {checkInputHasError(paymentFormik, 'number') && (
                <ErrorText className="payment">
                  {paymentFormik.errors.number}
                </ErrorText>
              )}
            </div>
            <div>
              <label htmlFor="cvv">CVV</label>
              <InputMask
                mask="999"
                type="text"
                id="cvv"
                name="cvv"
                value={paymentFormik.values.cvv}
                onChange={paymentFormik.handleChange}
                onBlur={paymentFormik.handleBlur}
                required
              >
                {(inputProps) => <input {...inputProps} />}
              </InputMask>
              {checkInputHasError(paymentFormik, 'cvv') && (
                <ErrorText className="payment">
                  {paymentFormik.errors.cvv}
                </ErrorText>
              )}
            </div>
          </PaymentCardRow>
          <PaymentDateRow>
            <div>
              <label htmlFor="month">Mês de vencimento</label>
              <InputMask
                mask="99"
                type="text"
                id="month"
                name="month"
                value={paymentFormik.values.month}
                onChange={paymentFormik.handleChange}
                onBlur={paymentFormik.handleBlur}
                required
              >
                {(inputProps) => <input {...inputProps} />}
              </InputMask>
              {checkInputHasError(paymentFormik, 'month') && (
                <ErrorText className="payment">
                  {paymentFormik.errors.month}
                </ErrorText>
              )}
            </div>
            <div>
              <label htmlFor="year">Ano de vencimento</label>
              <InputMask
                mask="99"
                type="text"
                id="year"
                name="year"
                value={paymentFormik.values.year}
                onChange={paymentFormik.handleChange}
                onBlur={paymentFormik.handleBlur}
                required
              >
                {(inputProps) => <input {...inputProps} />}
              </InputMask>
              {checkInputHasError(paymentFormik, 'year') && (
                <ErrorText className="payment">
                  {paymentFormik.errors.year}
                </ErrorText>
              )}
            </div>
          </PaymentDateRow>
          <ButtonsContainer>
            <FormButton
              type="submit"
              disabled={!paymentFormik.isValid || isSubmitting}
            >
              {isSubmitting ? 'Processando...' : 'Finalizar pagamento'}
            </FormButton>
            <FormButton type="button" onClick={() => setStep('address')}>
              Voltar para a edição de endereço
            </FormButton>
          </ButtonsContainer>
        </form>
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
