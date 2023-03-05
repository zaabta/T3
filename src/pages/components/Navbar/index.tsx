import Link from 'next/link'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { signOut } from 'next-auth/react'
import { toast } from 'react-hot-toast'

const Navbar = () => {
  const { status } = useSession()
  const [isOpen, serIsOpen] = useState<boolean>(false)
  return (
    <nav className="bg-white px-6 py-4 shadow">
      <div className="flex flex-col container mx-auto md:flex-row md:items-center md:justify-between">
        <div className="flex justify-between items-center">
          <div>
            <a className="text-gray-800 text-xl font-bold md:text-2xl" href="#">
              Meraki <span className="text-blue-500">UI</span>
            </a>
          </div>
          <div>
            <button
              type="button"
              onClick={() => serIsOpen((prev) => !prev)}
              className="block text-gray-800 hover:text-gray-600 focus:text-gray-600 focus:outline-none md:hidden"
            >
              <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                <path d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z" />
              </svg>
            </button>
          </div>
        </div>
        <div
          className={`flex flex-col md:flex-row md:-mx-4 ${
            isOpen ? 'block' : 'hidden md:block'
          }`}
        >
          <Link
            className="my-1 text-gray-800 hover:text-blue-500 md:mx-4 md:my-0"
            href="/home"
          >
            Home
          </Link>
          <Link
            className="my-1 text-gray-800 hover:text-blue-500 md:mx-4 md:my-0"
            href="/quote"
          >
            Quote
          </Link>
          <Link
            className="my-1 text-gray-800 hover:text-blue-500 md:mx-4 md:my-0"
            href="/register"
          >
            Register
          </Link>
          {status === 'authenticated' ? (
            <Link
              className="my-1 text-gray-800 hover:text-blue-500 md:mx-4 md:my-0"
              href="/"
              onClick={() => signOut().then(() => {
                toast.success("log out")
              })}
            >
              Log Out
            </Link>
          ) : (
            <Link
              className="my-1 text-gray-800 hover:text-blue-500 md:mx-4 md:my-0"
              href="/"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
