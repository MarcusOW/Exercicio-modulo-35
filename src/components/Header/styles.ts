import styled from 'styled-components'
import { cores } from '../../styles'

export const Image = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-repeat: no-repeat;
  background-size: cover;
  align-items: center;
`
export const Logo = styled.img`
  width: 125px;
  margin-top: 64px;
`
export const Title = styled.h1`
  margin-top: 136px;
  margin-bottom: 40px;
  font-size: 36px;
  font-weight: bold;
  text-align: center;
`

export const ContainerItemsVar = styled.div`
  display: flex;
  align-items: center;
  max-width: 1024px;
  width: 100%;
  margin: 64px 0 64px 84px;
  justify-content: space-between;
  font-size: 18px;
  font-weight: bold;
`
export const BannerImage = styled.div`
  width: 100%;
  height: 280px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  position: relative;
`
export const BannerFoodType = styled.h3`
  font-size: 32px;
  font-weight: 100;
  color: ${cores.branco};
  padding-top: 25px;
`
export const BannerRestaurantTitle = styled.h2`
  font-size: 32px;
  font-weight: bold;
  color: ${cores.branco};
  padding-top: 156px;
`
