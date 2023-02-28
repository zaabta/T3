import Link from 'next/link'
import { type CategoryProps } from 'y/types'
import { useRouter } from 'next/router'

export const CategoryList = ({ list }: CategoryProps) => {
  const router = useRouter()
  return (
    <div className="flex flex-col bg-white px-4 py-6 max-w-sm mx-auto rounded-lg shadow-md">
      <ul className="">
        <li className='mt-2'>
          <Link
          className="text-gray-700 font-bold mx-1 hover:text-gray-600 hover:underline"
          href={`/quote`}
          >
            - All
          </Link>
        </li>
        {list?.map(({ id, name }) => (
          <li key={id} className="mt-2">
            <Link
              className="text-gray-700 font-bold mx-1 hover:text-gray-600 hover:underline"
              href={`/quote/${name}`}
            >
              - {name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
