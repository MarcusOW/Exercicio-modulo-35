import { createGlobalStyle } from 'styled-components'

export const cores = {
  salmão: '#E66767',
  brancoQuente: '#FFEBD9',
  branco: '#FFFFFF',
  red: '#d31616'
}

export const breakpoints = {
  desktop: '1023px',
  tablet: '767px'
}

export const GlobalCss = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Roboto, sans-serif;
    list-style: none;
    text-decoration: none;
  }

  .container {
    max-width: 1024px;
    width: 100%;
    margin: 0 auto;

    @media (max-width: ${breakpoints.desktop}) {
      max-width: 80%;
    }
  }

  body {
    color: ${cores.salmão};

    a {
      color: ${cores.salmão};
    }
  }
`
