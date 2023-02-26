import { type SingleQuoteProps } from 'y/types'

export const SingleQuote = ({
  text,
  date,
  category,
  user,
}: SingleQuoteProps) => {
  return (
    <div className="flex flex-col bg-white px-8 py-6 w-96 mx-auto rounded-lg shadow-lg">
      <div className="flex justify-center items-center">
        <a
          className="px-2 py-1 bg-gray-600 text-sm text-green-100 rounded"
          href="#"
        >
          {category.name}
        </a>
      </div>
      <div className="mt-4">
        <a className="text-lg text-gray-700 font-medium" href="#">
          {text}
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
            {user.username}
          </a>
        </div>
        <span className="font-light text-sm text-gray-600">
          {date.toJSON().substring(0, 10)}
        </span>
      </div>
    </div>
  )
}
