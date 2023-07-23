import { createContext, ReactNode, useContext, useState, Fragment } from 'react'

import { Dialog, Transition } from '@headlessui/react'

// Context to handle choosing between Keplr & Leap when both are available

const WalletSelectModal = ({
  onAgree,
}: {
  onAgree: (walletType: 'keplr' | 'leap' | 'cosmostation') => void
}) => {
  return (
    <Transition.Root show={true} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => {}}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative px-4 pt-5 pb-4 overflow-hidden text-left transition-all transform rounded-lg shadow-xl text-surface-900 bg-neutral-900 font-commons sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                <div>
                  <Dialog.Title as="h1" className="text-xl font-bold font-neue">
                    Select a wallet
                  </Dialog.Title>
                  <Dialog.Description as="p" className="mt-1 text-sm">
                    There is more than one wallet type active on your system, so
                    you are required to select between the following wallet
                    types.
                  </Dialog.Description>
                </div>

                <div className="flex flex-col mt-4 space-y-2">
                  <button
                    onClick={() => onAgree('keplr')}
                    className="flex flex-row items-center w-full p-3 border rounded-md border-neutral-700 bg-neutral-800 hover:bg-neutral-800/75"
                  >
                    <img src="/keplr.svg" className="w-10 h-10" alt="Keplr" />
                    <p className="mt-1 ml-4 text-lg">Keplr Wallet</p>
                  </button>
                  <button
                    onClick={() => onAgree('leap')}
                    className="flex flex-row items-center w-full p-3 border rounded-md border-neutral-700 bg-neutral-800 hover:bg-neutral-800/75"
                  >
                    <img src="/leap.svg" className="w-10 h-10" alt="Leap" />
                    <p className="mt-1 ml-4 text-lg">Leap Wallet</p>
                  </button>
                  <button
                    onClick={() => onAgree('cosmostation')}
                    className="flex flex-row items-center w-full p-3 border rounded-md border-neutral-700 bg-neutral-800 hover:bg-neutral-800/75"
                  >
                    <img src="/keplr.svg" className="w-10 h-10" alt="Leap" />
                    <p className="mt-1 ml-4 text-lg">Cosmostation</p>
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export interface WalletSelectContext {
  select: () => Promise<'keplr' | 'leap' | 'cosmostation'>
}

export const WalletSelect = createContext<WalletSelectContext>({
  select: async () => 'keplr',
})

export const WalletSelectProvider = ({ children }: { children: ReactNode }) => {
  const [modal, setModal] = useState<JSX.Element | undefined>(undefined)

  const select = () => {
    // mount modal with a callback
    return new Promise<'keplr' | 'leap' | 'cosmostation'>((resolve) => {
      mountModal((walletType) => {
        setModal(undefined)
        resolve(walletType)
      })
    })
  }

  function mountModal(
    handleAgree: (walletType: 'keplr' | 'leap' | 'cosmostation') => void
  ) {
    const mounted = <WalletSelectModal onAgree={handleAgree} />
    setModal(mounted)
  }

  return (
    <WalletSelect.Provider value={{ select }}>
      <>
        {modal}
        {children}
      </>
    </WalletSelect.Provider>
  )
}

export const useWalletSelect = (): WalletSelectContext =>
  useContext(WalletSelect)
