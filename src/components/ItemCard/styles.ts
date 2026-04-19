import styled from 'styled-components'
import { cores } from '../../styles'

export const Card = styled.div`
  padding: 8px;
  background-color: ${cores.salmão};
  color: ${cores.branco};
`
export const Image = styled.img`
  width: 100%;
  height: 167px;
  object-fit: cover;
`
export const Title = styled.h4`
  font-size: 16px;
  font-weight: bold;
  color: ${cores.brancoQuente};
`
export const Description = styled.p`
  font-size: 14px;
  color: ${cores.brancoQuente};
  margin: 8px 0;
`
export const Button = styled.button`
  display: block;
  width: 100%;
  background-color: ${cores.brancoQuente};
  color: ${cores.salmão};
  font-weight: bold;
  padding: 4px 84px;
  border: none;
  cursor: pointer;
`
