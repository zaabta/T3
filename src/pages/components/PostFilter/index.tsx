import { type CategoryProps } from 'y/types'
import { useRouter } from 'next/router';
import { useState } from 'react';

const PostFilter = ({list}: CategoryProps) => {
  const router = useRouter()
  return (
    <div>
      <select value={router.asPath} onChange={(e) => router.push(e.target.value)} className="block bg-gray-300 text-gray-700 py-2 px-2 rounded-lg focus:outline-none md:py-3">
      <option value={"/quote/"}>All</option>
        {
          list?.map(item =>(
            <option key={item.id} value={`/quote/${item.name.toLowerCase()}`}>
              {item.name}
              </option>
          ))
        }
      </select>
    </div>
  )
}

export default PostFilter;
