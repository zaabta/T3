import { api } from 'y/utils/api'
import { useState } from 'react'
import { quoteInput } from 'y/types'
import { toast } from 'react-hot-toast'
import { PostFilter } from '../components/PostFilter'
import { Post } from '../components/SinglePost'
import { Pagination } from '../components/Pagination'
import { UserList } from '../components/UserList'
import { CategoryList } from '../components/CategoryList'
import { RecentPost } from '../components/RecentPost'
import { CreatePost } from '../components/CreatePost'
import { PostList } from '../components/PostList'

const Quotes = () => {
  const [ page, setPage] = useState<number>(1)
  const categories = api.category.all.useQuery()

  const quotes = api.quote.all.useQuery({page})

  return (
    <div className="bg-gray-100 px-6 py-8">
      <div className="flex justify-between container mx-auto">
        <div className="w-full lg:w-8/12">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-700 md:text-2xl">
              Quote
            </h1>
            <PostFilter />
          </div>
          <div className="mt-16">
            <CreatePost categoryList={categories?.data?.data} />
          </div>
          <div className="mt-16">
            <PostList list={quotes.data?.data.quotes} />
          </div>
          <div className="mt-8">
            <Pagination
              currentPage={quotes.data?.data.mate.currentPage}
              pageCount={quotes.data?.data.mate.totalPageCount}
              handleOnChangePage={setPage}
            />
          </div>
        </div>
        {/*Right side*/}
        <div className="-mx-8 w-4/12 hidden lg:block">
          <div className="px-8">
            <h1 className="mb-4 text-xl font-bold text-gray-700">Authors</h1>
            <UserList />
          </div>
          <div className="mt-10 px-8">
            <h1 className="mb-4 text-xl font-bold text-gray-700">Categories</h1>
            <CategoryList list={categories?.data?.data} />
          </div>
          <div className="mt-10 px-8">
            <h1 className="mb-4 text-xl font-bold text-gray-700">
              Recent Post
            </h1>
            <RecentPost />
          </div>
        </div>
      </div>
    </div>
  )
}

Quotes.requireAuth = true

export default Quotes
