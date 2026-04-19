import styled from 'styled-components'
import { cores } from '../../styles'
import { TagContainer } from '../Tag/styles'

export const Card = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  border: 1px solid ${cores.salmão};
  overflow: hidden;
  padding-bottom: 16px;
`
export const Title = styled.h4`
  font-size: 18px;
  font-weight: bold;
  color: ${cores.salmão};
  margin: 8px 8px 0 8px;
`
export const Image = styled.img`
  width: 100%;
  height: 216px;
  object-fit: cover;
`
export const Description = styled.p`
  font-size: 14px;
  line-height: 22px;
  color: ${cores.salmão};
  margin: 16px 8px;
`
export const Rating = styled.span`
  color: ${cores.salmão};
`
export const Infos = styled.div`
  display: flex;
  position: absolute;
  top: 16px;
  right: 16px;
  gap: 8px;
`
export const TitleRate = styled.div`
  display: flex;
  justify-content: space-between;
`
export const RateStar = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-right: 8px;
`
export const Button = styled(TagContainer).attrs({ size: 'big' })`
  margin-left: 8px;
  cursor: pointer;
  color: ${cores.brancoQuente};
`
