import { api } from 'y/utils/api'
import { Menu } from 'y/pages/components/menu'
import { Dropdown } from '../components/Dropdown'
import { QuoteList } from '../components/QuoteList'
import { useState } from 'react'
import { quoteInput } from 'y/types'
import { toast } from 'react-hot-toast'

const Quotes = () => {
  const [newQuoteData, setQuoteData] = useState<{categoryId?: string, content?: string}>()
  const categories = api.category.all.useQuery()
  const trpc = api.useContext()
  const quotes = api.quote.all.useQuery({ page: 1 })
  const { mutate } = api.quote.create.useMutation({
    onSettled: async() => {
      await trpc.quote.all.invalidate()
      setQuoteData({categoryId: "0", content: ""})
    },
    onSuccess: (res)=> {
      toast.success(res.messages)
    }
  })

  const createQuote = async () => {
    const input  = await quoteInput.safeParse(newQuoteData)
    if(input.success) {
      mutate(input.data)
    }
    else input.error.errors.map(err => toast.error(err.message))
  }
  
  const handleOnChangeCategory = (id: string): void => {
    setQuoteData({...newQuoteData, categoryId: id})
  }

  return (
    <div className="flex flex-row w-full justify-between">
      <Menu list={categories.data?.data}/>
      <div className="flex flex-col align-middel justify-center gap-5  w-full  h-screen">
        <div className="flex flex-col bg-white px-8 py-6 w-96 mx-auto rounded-lg shadow-lg">
          <div className="flex justify-center items-center">
            <Dropdown selecteItem={newQuoteData?.categoryId} categories={categories.data?.data}  onChange={handleOnChangeCategory}/>
          </div>
          <div className="mt-4">
            <textarea className="text-lg text-gray-700 font-medium pl-2 border border-stone-700 rounded-md focus:outline-none h-32 w-full  resize-none"
            value={newQuoteData?.content}
            onChange={(e) => setQuoteData({...newQuoteData, content: e.target.value})}
             />
          </div>
          <div className="flex justify-between items-center mt-4">
            <div className="flex items-center">
              <input
                type="button"
                value={'create'}
                onClick={createQuote}
                className="uppercase inline-block mt-2 text-sm bg-slate-500 py-2 px-4 rounded font-semibold cursor-pointer hover:bg-indigo-100"
              />
            </div>
            <span className="font-light text-sm text-gray-600">
              {Date().toString().substring(0, 10)}
            </span>
          </div>
        </div>
        <QuoteList
          quotes={quotes.data?.data}
        />
      </div>
    </div>
  )
}

Quotes.requireAuth = true

export default Quotes
