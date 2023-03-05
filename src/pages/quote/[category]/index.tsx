import { api } from 'y/utils/api'
import PostFilter from 'y/pages/components/PostFilter'
import CreatePost  from 'y/pages/components/CreatePost'
import PostList  from 'y/pages/components/PostList'
import CategoryList from 'y/pages/components/CategoryList'
import { useRouter } from 'next/router'
import UserList from 'y/pages/components/UserList'

const Quotes = () => {
  const router = useRouter()
  let name = ""
  if(typeof router.query["category"] == "string"){
    name = router.query["category"]
  }
  const quotes = api.quote.getByCategoryName.useQuery({ name })
  const categories = api.category.all.useQuery()
  return (
    <div className="bg-gray-100 px-6 py-8">
    <div className="flex justify-between container mx-auto">
      <div className="w-full lg:w-8/12">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-700 md:text-2xl">
            Quote
          </h1>
          <PostFilter list={categories?.data?.data} />
        </div>
        <div className="mt-16">
          <CreatePost categoryList={categories?.data?.data} />
        </div>
        <div className="mt-16">
          <PostList list={quotes?.data?.data} />
        </div>
      </div>
      {/*Right side*/}
      <div className="-mx-8 w-4/12 hidden lg:block">
      <div className="mt-10 px-8">
          <h1 className="mb-4 text-xl font-bold text-gray-700">Categories</h1>
          <UserList/>
        </div>  
        <div className="mt-10 px-8">
          <h1 className="mb-4 text-xl font-bold text-gray-700">Categories</h1>
          <CategoryList list={categories?.data?.data} />
        </div>
      </div>
    </div>
  </div>
  )
}

Quotes.requireAuth = true

export default Quotes
