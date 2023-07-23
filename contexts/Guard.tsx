import { useWallet } from '@interchaininfo/sdk'
import Guard from '@swiftprotocol/guard'
import {
  createContext,
  ReactNode,
  useContext,
  useState,
  Fragment,
  useCallback,
  useEffect,
} from 'react'

export interface GuardContext {
  refreshGuard: () => void
  guard: Guard | undefined
}

export const GuardCtx = createContext<GuardContext>({
  refreshGuard: () => {},
  guard: undefined,
})

export const GuardProvider = ({ children }: { children: ReactNode }) => {
  const [guard, setGuard] = useState<Guard | undefined>(undefined)

  const { wallet } = useWallet()

  const refreshGuard = useCallback(() => {
    if (!wallet || !wallet?.type) return setGuard(undefined)

    const newGuard = new Guard({
      api: 'https://guard.swiftprotocol.zone',
      wallet: wallet.type,
    })
    setGuard(newGuard)
  }, [wallet])

  useEffect(() => {
    refreshGuard()
  }, [wallet])

  return (
    <GuardCtx.Provider value={{ guard, refreshGuard }}>
      {children}
    </GuardCtx.Provider>
  )
}

export const useGuard = (): GuardContext => useContext(GuardCtx)
