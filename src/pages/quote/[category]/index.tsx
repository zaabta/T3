import { useRouter } from 'next/router'
import { api } from 'y/utils/api'
import { Menu } from 'y/pages/components/menu'

const Quotes = () => {
  const router = useRouter()
  const categories = api.category.all.useQuery()
  const qoutes = api.quote.all.useQuery({ page: 2 })
  return (
    <div className="flex flex-row w-full justify-between">
      <Menu list={categories.data?.data} />
      <div className="flex flex-col align-middel justify-center gap-5  w-full  h-screen">
        <div className="flex flex-col bg-white px-8 py-6 max-w-sm mx-auto rounded-lg shadow-lg">
          <div className="flex justify-center items-center">
            <a
              className="px-2 py-1 bg-gray-600 text-sm text-green-100 rounded"
              href="#"
            >
              Laravel
            </a>
          </div>
          <div className="mt-4">
            <a className="text-lg text-gray-700 font-medium" href="#">
              Build Your New Idea with Laravel Freamwork.
            </a>
          </div>
          <div className="flex justify-between items-center mt-4">
            <div className="flex items-center">
              <img
                src="https://images.unsplash.com/photo-1502791451862-7bd8c1df43a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                className="w-8 h-8 object-cover rounded-full"
                alt="avatar"
              />
              <a className="text-gray-700 text-sm mx-3" href="#">
                Alex steve
              </a>
            </div>
            <span className="font-light text-sm text-gray-600">
              Mar 10, 2018
            </span>
          </div>
        </div>
        <div className="flex flex-col bg-white px-8 py-6 max-w-sm mx-auto rounded-lg shadow-lg">
          <div className="flex justify-center items-center">
            <a
              className="px-2 py-1 bg-gray-600 text-sm text-green-100 rounded"
              href="#"
            >
              Laravel
            </a>
          </div>
          <div className="mt-4">
            <a className="text-lg text-gray-700 font-medium" href="#">
              Build Your New Idea with Laravel Freamwork.
            </a>
          </div>
          <div className="flex justify-between items-center mt-4">
            <div className="flex items-center">
              <img
                src="https://images.unsplash.com/photo-1502791451862-7bd8c1df43a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                className="w-8 h-8 object-cover rounded-full"
                alt="avatar"
              />
              <a className="text-gray-700 text-sm mx-3" href="#">
                Alex steve
              </a>
            </div>
            <span className="font-light text-sm text-gray-600">
              Mar 10, 2018
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

Quotes.requireAuth = true

export default Quotes
