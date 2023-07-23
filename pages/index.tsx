import { SyntheticEvent, useCallback, useState } from 'react'

import { useWallet, useChain } from '@interchaininfo/sdk'
import copy from 'copy-to-clipboard'

import { MetaTags } from 'components'
import { useWalletSelect } from 'contexts/WalletSelect'

import {
  ArrowRightOnRectangleIcon as LogoutIcon,
  CheckIcon,
  ClipboardIcon as DuplicateIcon,
} from '@heroicons/react/24/outline'

import { CHAIN } from 'util/constants'
import { truncateAddress } from 'util/wallet'
import { classNames } from 'util/css'
import { ChainInfos } from 'config'
import Swap from 'components/Swap'
import { useGuard } from 'contexts/Guard'
import Register from 'components/Register'

const Action = ({
  icon,
  name,
  action,
  active,
}: {
  icon: React.ReactElement<any, any>
  name: string
  action: (e?: SyntheticEvent<Element | Event, Event>) => void
  active?: boolean
}) => (
  <a
    onClick={action}
    data-tip={name}
    className={classNames(
      'cursor-pointer w-7 h-7 rounded p-1.5 text-surface-900',
      !active && 'hover:bg-neutral-700'
    )}
  >
    {icon}
  </a>
)

const WalletButton = () => {
  const { login, logout, wallet } = useWallet()
  const { select } = useWalletSelect()

  const [copied, setCopied] = useState<boolean>(false)

  const handleCopy = useCallback(
    (e: SyntheticEvent<Element | Event, Event> | undefined) => {
      e?.preventDefault()
      if (!wallet?.address) return

      copy(wallet?.address)
      setCopied(true)
      setTimeout(() => setCopied(false), 3000)
    },
    [wallet?.address]
  )

  return wallet ? (
    <div className="flex flex-row items-center space-x-2 divide-x divide-neutral-700">
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={`https://www.mintscan.io/juno/account/${wallet?.address}`}
        className="pr-2 mt-0.5 text-sm font-bold text-surface-900 hover:text-surface-900/75"
      >
        {truncateAddress(wallet.address)}
      </a>
      <div className="flex flex-row items-center pl-2 space-x-1">
        <Action
          icon={copied ? <CheckIcon /> : <DuplicateIcon />}
          name={copied ? 'Copied!' : 'Copy Address'}
          action={handleCopy}
        />
        <Action icon={<LogoutIcon />} name="Disconnect" action={logout} />
      </div>
    </div>
  ) : (
    <a
      className="font-bold text-primary-900 hover:text-primary-800 transition duration-150 ease-in-out text-[18px] cursor-pointer"
      onClick={async () => {
        let walletType: 'keplr' | 'leap' | 'cosmostation'

        function twoOfThree(a: boolean, b: boolean, c: boolean) {
          return a ? b || c : b && c
        }

        if (
          twoOfThree(
            'keplr' in window,
            'leap' in window,
            'cosmostation' in window
          )
        ) {
          walletType = await select()
        } else if ('keplr' in window) {
          walletType = 'keplr'
        } else if ('leap' in window) {
          walletType = 'leap'
        } else if ('cosmostation' in window) {
          walletType = 'cosmostation'
        } else {
          return
        }

        login(walletType, ChainInfos[CHAIN].stakeCurrency.coinMinimalDenom)
      }}
    >
      Connect wallet
    </a>
  )
}

export default function Page() {
  const { wallet } = useWallet()
  const { guard, refreshGuard } = useGuard()

  const register = useCallback(
    async (email: string) => {
      // @TODO #1: Register user for notifications.
    },
    [wallet, guard]
  )

  const onSwap = useCallback(
    ({
      swapFrom,
      swapInto,
    }: {
      swapFrom: { name: string; amount: number }
      swapInto: { name: string; amount: number }
    }) => {
      if (!wallet) return

      // swap(swapFrom, swapInto)

      // @TODO #3: Notify user of swap.
    },
    [wallet]
  )

  return (
    <main className="w-screen min-h-screen bg-black">
      <MetaTags
        description="Swap your tokens" // Modify description
        image="" // Add image here!
        ogImage=""
        title="TokenSwap"
        url=""
      />
      <nav className="flex border-b border-[#D9D9D9]/10 flex-row items-center justify-between w-screen px-8 py-3 bg-black">
        <p className="text-lg text-white">TokenSwap</p>
        <WalletButton />
      </nav>
      <div className="flex items-center justify-center mt-4">
        {wallet && <Register onSubmit={register} />}
      </div>
      <div className="flex items-center justify-center max-w-3xl mx-auto mt-2">
        <Swap onSwap={onSwap} />
      </div>
    </main>
  )
}
