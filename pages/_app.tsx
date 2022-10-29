import '../styles/globals.css'
import type { AppProps } from 'next/app'

// This file may not be needed. Need to see what this file does.
function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
