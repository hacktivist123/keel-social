// pages/_app.tsx

import { AppProps } from 'next/app';
import { createGlobalStyle, ThemeProvider } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  /* Add global styles here */
  body {
    margin: 0;
    font-family: 'Arial', sans-serif;
  }
`;

const theme = {
  /* Define your theme variables here */
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
