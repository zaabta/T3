import Link from "next/link"

type AppProps = {
  list?: { id: string; name: string }[]
}

export const Menu = ({ list }: AppProps) => {
  return (
    <div className="bg-white  rounded-md  w-5/12">
      <h1 className="text-center text-xl my-4  bg-white py-2 rounded-md border-b-2 cursor-pointer  text-gray-600">
        Category
      </h1>
      <div className="bg-white rounded-md list-none  text-center ">
        <li className="py-3 border-b-2">
          <Link href="/quote" className="list-none  hover:text-indigo-600">
            All
          </Link>
        </li>
        {list?.map((item) => {
          return (
            <li key={item.id} className="py-3 border-b-2">
              <Link href={`/quote/${item.name}`} className="list-none  hover:text-indigo-600">
                {item.name}
              </Link>
            </li>
          )
        })}
      </div>
    </div>
  )
}
