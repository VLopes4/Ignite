import { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '../styles/theme'
import { ReactQueryDevtools } from 'react-query/devtools'
import { SidebarDrawerProvider } from '../contexts/SidebarDrawer'
import { makeServer } from '../services/mirage'
import { QueryClientProvider } from 'react-query'
import { queryClient } from '../services/reactQuery'

if(process.env.NODE_ENV === 'development') {
  makeServer();
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <SidebarDrawerProvider>
          <Component {...pageProps} />
        </SidebarDrawerProvider>
        <ReactQueryDevtools/>
      </QueryClientProvider>
    </ChakraProvider>
  )
}

export default MyApp