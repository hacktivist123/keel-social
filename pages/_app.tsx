// pages/_app.tsx

import { AppProps } from 'next/app';
import { createGlobalStyle, ThemeProvider } from 'styled-components';

import {AuthProvider} from '../components/AuthContext';

const GlobalStyle = createGlobalStyle`
  /* Add global styles here */
  body {
    margin: 0;
    font-family: 'Arial', sans-serif;
  }
`;

const theme = {
  /* Define the theme variables here */
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>

      <GlobalStyle />
      <AuthProvider>
      <Component {...pageProps} />
      </AuthProvider>

    </ThemeProvider>
  );
}

export default MyApp;
