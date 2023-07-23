import { Bech32Address } from '@keplr-wallet/cosmos'
import { ChainInfo } from '@keplr-wallet/types'

export interface ChainInfoWithExplorer extends ChainInfo {
  // Formed as "https://explorer.com/{txHash}"
  explorerUrlToTx: string
}

export const ChainInfos: { [key: string]: ChainInfoWithExplorer } = {
  juno: {
    rpc: 'https://rpc.juno.strange.love/',
    rest: 'https://api.juno.strange.love/',
    chainId: 'juno-1',
    chainName: 'Juno',
    stakeCurrency: {
      coinDenom: 'JUNO',
      coinMinimalDenom: 'ujuno',
      coinDecimals: 6,
      coinGeckoId: 'juno',
      coinImageUrl:
        'https://assets.coingecko.com/coins/images/19249/large/Juno_Logo_%28Salmon%29_%282%29.png',
    },
    bip44: {
      coinType: 118,
    },
    bech32Config: Bech32Address.defaultBech32Config('juno'),
    currencies: [
      {
        coinDenom: 'JUNO',
        coinMinimalDenom: 'ujuno',
        coinDecimals: 6,
        coinGeckoId: 'juno',
        coinImageUrl:
          'https://assets.coingecko.com/coins/images/19249/large/Juno_Logo_%28Salmon%29_%282%29.png',
      },
    ],
    feeCurrencies: [
      {
        coinDenom: 'JUNO',
        coinMinimalDenom: 'ujuno',
        coinDecimals: 6,
        coinGeckoId: 'juno',
        coinImageUrl:
          'https://assets.coingecko.com/coins/images/19249/large/Juno_Logo_%28Salmon%29_%282%29.png',
      },
    ],
    coinType: 118,
    features: ['stargate', 'ibc-transfer', 'no-legacy-stdTx'],
    explorerUrlToTx: 'https://www.mintscan.io/juno/txs/{txHash}',
  },
  junotestnet: {
    rpc: 'https://uni-rpc.reece.sh/',
    rest: 'https://uni-api.reece.sh/',
    chainId: 'uni-6',
    chainName: 'Juno Testnet',
    stakeCurrency: {
      coinDenom: 'JUNO',
      coinMinimalDenom: 'ujunox',
      coinDecimals: 6,
      coinGeckoId: 'juno',
      coinImageUrl:
        'https://assets.coingecko.com/coins/images/19249/large/Juno_Logo_%28Salmon%29_%282%29.png',
    },
    bip44: {
      coinType: 118,
    },
    bech32Config: Bech32Address.defaultBech32Config('juno'),
    currencies: [
      {
        coinDenom: 'JUNo',
        coinMinimalDenom: 'ujunox',
        coinDecimals: 6,
        coinGeckoId: 'juno',
        coinImageUrl:
          'https://assets.coingecko.com/coins/images/19249/large/Juno_Logo_%28Salmon%29_%282%29.png',
      },
    ],
    feeCurrencies: [
      {
        coinDenom: 'JUNO',
        coinMinimalDenom: 'ujunox',
        coinDecimals: 6,
        coinGeckoId: 'juno',
        coinImageUrl:
          'https://assets.coingecko.com/coins/images/19249/large/Juno_Logo_%28Salmon%29_%282%29.png',
      },
    ],
    coinType: 118,
    features: ['stargate', 'ibc-transfer', 'no-legacy-stdTx'],
    explorerUrlToTx: 'https://testnet.mintscan.io/juno-testnet/txs/{txHash}',
  },
}
