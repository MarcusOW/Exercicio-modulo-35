import { Image } from '../Header/styles'
import efoodLogo from '../../assets/image/logo.png'
import imagemDeFundo from '../../assets/image/imagem-de-fundo.png'
import instagram from '../../assets/image/instagram.png'
import facebook from '../../assets/image/facebook.png'
import twitter from '../../assets/image/twitter.png'
import {
  FooterDescription,
  FooterLogo,
  RedesSociais,
  RedesSociaisLogo
} from './styles'

const Footer = () => (
  <Image style={{ backgroundImage: `url(${imagemDeFundo})` }}>
    <FooterLogo src={efoodLogo} alt="Efood-logo" />
    <RedesSociais>
      <li>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <RedesSociaisLogo src={instagram} alt="instagram-logo" />
        </a>
      </li>
      <li>
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <RedesSociaisLogo src={facebook} alt="facebook-logo" />
        </a>
      </li>
      <li>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <RedesSociaisLogo src={twitter} alt="twitter-logo" />
        </a>
      </li>
    </RedesSociais>
    <FooterDescription>
      A efood é uma plataforma para divulgação de estabelecimentos, a
      responsabilidade pela entrega, qualidade <br />
      dos produtos é toda do estabelecimento contratado.{' '}
    </FooterDescription>
  </Image>
)

export default Footer
