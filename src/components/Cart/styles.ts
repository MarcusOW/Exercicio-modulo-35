import styled from 'styled-components'
import { cores } from '../../styles'

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 999;
`
export const CartContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 360px;
  height: 100%;
  background-color: ${cores.salmão};
  padding: 32px 16px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  animation: slideIn 0.3s ease-out;

  @keyframes slideIn {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }
`
export const CloseButton = styled.button`
  border: none;
  cursor: pointer;
  align-self: flex-end;
`
export const CartItem = styled.div`
  display: flex;
  position: relative;
  background-color: ${cores.brancoQuente};
  padding: 8px;
  margin-bottom: 16px;
`
export const CartItemImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
`
export const CartItemInfo = styled.div`
  flex: 1;
  padding-left: 8px;
`
export const CartItemTitle = styled.h4`
  font-size: 18px;
  font-weight: bold;
  margin-top: 8px;
  margin-bottom: 16px;
`
export const RemoveButton = styled.button`
  border: none;
  cursor: pointer;
  position: absolute;
  bottom: 8px;
  right: 8px;
  width: 16px;
  height: 16px;
  fill: ${cores.salmão};
  background-color: ${cores.brancoQuente};
`
export const TotalContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
  margin-bottom: 16px;
  color: ${cores.brancoQuente};
`
export const CheckoutButton = styled.button`
  padding: 4px;
  border: none;
  cursor: pointer;
  width: 100%;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  background-color: ${cores.brancoQuente};
  color: ${cores.salmão};
`
export const Hollow = styled.p`
  color: ${cores.branco};
  text-align: center;
  margin: auto;
`

export const AddressContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 8px;
  color: ${cores.brancoQuente};
  font-size: 14px;
  font-weight: bold;
`
export const AddressTitle = styled.h3`
  font-size: 16px;
  font-weight: bold;
  color: ${cores.brancoQuente};
  margin-bottom: 16px;
`
export const FormInput = styled.input`
  width: 100%;
  font-size: 14px;
  font-weight: bold;
  background-color: ${cores.brancoQuente};
  border: none;
  padding: 8px;
`
export const AddressNumberContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 34px;

  div {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
`
export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 24px;
`
export const FormButton = styled.button`
  font-size: 14px;
  font-weight: bold;
  padding: 4px;
  background-color: ${cores.brancoQuente};
  color: ${cores.salmão};
  border: none;
  cursor: pointer;
`

export const PaymentContainer = styled(AddressContainer)`
  label {
    display: block;
    margin-bottom: 8px;
  }
`
export const PaymentTitle = styled.h3`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 16px;
`
export const PaymentCardRow = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 34px;
  margin-bottom: 16px;
`
export const PaymentDateRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 34px;
  margin-bottom: 16px;
`

export const SuccessMessage = styled.p`
  font-size: 14px;
  line-height: 22px;
  color: ${cores.brancoQuente};
  margin-top: 16px;
  margin-bottom: 24px;
`
export const SuccessTitle = styled.h3`
  font-size: 16px;
  font-weight: bold;
  color: ${cores.brancoQuente};
`
