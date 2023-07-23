import type { AppProps } from 'next/app'

import { ChainClient, ChainProvider } from '@interchaininfo/sdk'
import { WalletSelectProvider } from 'contexts/WalletSelect'
import { Analytics } from '@vercel/analytics/react'

import { ChainInfos } from 'config'
import { CHAIN } from 'util/constants'

import 'tailwindcss/tailwind.css'
import 'styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import { GuardProvider } from 'contexts/Guard'

export default function App({ Component, pageProps }: AppProps) {
  const client = new ChainClient({ chainInfo: ChainInfos[CHAIN] })
  return (
    <ChakraProvider>
      <WalletSelectProvider>
        <ChainProvider client={client}>
          <GuardProvider>
            <Component {...pageProps} />
            <Analytics />
          </GuardProvider>
        </ChainProvider>
      </WalletSelectProvider>
    </ChakraProvider>
  )
}
