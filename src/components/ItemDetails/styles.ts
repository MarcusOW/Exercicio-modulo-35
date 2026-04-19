import styled from 'styled-components'
import { cores } from '../../styles'

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 999;
`
export const DetailsContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 1024px;
  z-index: 1000;
  padding: 32px;
  background-color: ${cores.salmão};
`
export const DetailsInfo = styled.div`
  display: flex;
  color: ${cores.branco};
  gap: 24px;
`
export const DetailsImage = styled.img`
  width: 280px;
  height: 280px;
  object-fit: cover;
`
export const CloseButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  background: transparent;
  border: none;
  color: ${cores.branco};
  cursor: pointer;
`
export const CloseButtonImg = styled.img`
  height: 16px;
  width: 16px;
`
export const Title = styled.h4`
  font-size: 18px;
  font-weight: bold;
`
export const Description = styled.p`
  font-size: 14px;
  line-height: 22px;
  margin: 16px 0;
`
export const AddToCartButton = styled.button`
  font-size: 14px;
  font-weight: bold;
  padding: 4px 8px;
  background-color: ${cores.brancoQuente};
  color: ${cores.salmão};
  border: none;
  cursor: pointer;
`
