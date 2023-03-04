import { type PostProps } from "y/types";
import moment from "moment";

const Post = ({ title, contnet, date, user, category }: PostProps) => {
  return (
    <div className="max-w-4xl px-10 py-6 bg-white rounded-lg shadow-md  mt-5 mb-5">
      <div className="flex justify-between items-center">
        <span className="font-light text-gray-600">
          {moment(date).toString().substring(0, 10)}
        </span>
        <a
          className="px-2 py-1 bg-gray-600 text-gray-100 font-bold rounded hover:bg-gray-500"
          href="#"
        >
          {category.name}
        </a>
      </div>
      <div className="mt-2">
        <a
          className="text-2xl text-gray-700 font-bold hover:underline"
          href="#"
        >
          {title}
        </a>
        <p className="mt-2 text-gray-600">{contnet}</p>
      </div>
      <div className="flex justify-between items-center mt-4">
        <label className="text-blue-500 hover:underline cursor-pointer  ">
          Read more
        </label>
        <div>
          <a className="flex items-center" href="#">
            <img
              src={
                user?.img ||
                'https://www.nicepng.com/png/detail/933-9332131_profile-picture-default-png.png'
              }
              className="mx-4 w-10 h-10 object-cover rounded-full hidden sm:block"
              alt={user.username}
            />
            <h1 className="text-gray-700 font-bold hover:underline">
              {user.username}
            </h1>
          </a>
        </div>
      </div>
    </div>
  )
}

export default Post;