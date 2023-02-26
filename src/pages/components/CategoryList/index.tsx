import { type CategoryProps } from 'y/types'

export const CategoryList = ({ list }: CategoryProps) => {
  return (
    <div className="flex flex-col bg-white px-4 py-6 max-w-sm mx-auto rounded-lg shadow-md">
      <ul className="">
        {list?.map(({ id, name }) => (
          <li key={id} className="mt-2">
            <a
              className="text-gray-700 font-bold mx-1 hover:text-gray-600 hover:underline"
              href="#"
            >
              - {name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
