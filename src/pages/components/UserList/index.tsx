import { api } from 'y/utils/api'
import { author } from 'y/types'

const UserList = () => {
  const users = api.user.authors.useQuery()
  return (
    <div className="flex flex-col bg-white max-w-sm px-6 py-4 mx-auto rounded-lg shadow-md">
      <ul className="-mx-4">
        {users.data?.data?.map(({ id, name, avatar, quotes }: author) => (
          <li key={id} className="flex items-center my-4">
            <img
              className="w-10 h-10 object-cover rounded-full mx-4"
              src={
                avatar ||
                'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=731&q=80'
              }
              alt="avatar"
            />
            <p>
              <a
                className="text-gray-700 font-bold mx-1 hover:underline"
                href="#"
              >
                {name}
              </a>
              <span className="text-gray-700 text-sm font-light">
                {quotes !== 1 ? `created ${quotes} quotes` : 'quote'}
              </span>
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default UserList
