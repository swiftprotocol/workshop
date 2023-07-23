import { UsersIcon } from '@heroicons/react/20/solid'
import { useCallback, useState } from 'react'

export default function Register({
  onSubmit,
}: {
  onSubmit: (email: string) => void
}) {
  const [email, setEmail] = useState<string>('')
  const onSubmitForm = useCallback(() => {
    if (!email) return
    onSubmit(email)
  }, [email])
  return (
    <div>
      <label
        htmlFor="email"
        className="block text-sm font-medium leading-6 text-white"
      >
        Register for notifications
      </label>
      <div className="flex mt-2 rounded-md shadow-sm">
        <div className="relative flex items-stretch flex-grow focus-within:z-10">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <UsersIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
          </div>
          <input
            type="email"
            name="email"
            id="email"
            className="block w-full bg-gray-900 rounded-none rounded-l-md border-0 py-1.5 pl-10 text-white ring-1 ring-inset ring-white/25 placeholder:text-gray-200 focus:ring-2 focus:ring-inset focus:ring-primary-900 sm:text-sm sm:leading-6"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.currentTarget.value)
            }
            placeholder="Your email"
          />
        </div>
        <button
          type="button"
          onClick={onSubmitForm}
          className="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold text-white ring-1 ring-inset ring-gray-300 hover:bg-white/25"
        >
          Register
        </button>
      </div>
    </div>
  )
}
