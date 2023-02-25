import { api } from 'y/utils/api'
import { quoteInput } from 'y/types'
import { toast } from 'react-hot-toast'
import { useState } from 'react'
import { Category } from 'y/types'

type Props = {
  categoryList?: Category[]
}

interface QuoteData {
  title: string;
  content: string;
  categoryId: string;
}

export const CreatePost = ({ categoryList }: Props) => {
  const trpc = api.useContext()
  const [quoteData, setQuoteData] = useState<QuoteData>({
    title: '',
    content: '',
    categoryId: '',
  })
  const { mutate } = api.quote.create.useMutation({
    onSettled: async () => {
      await trpc.quote.all.invalidate()
    },
    onSuccess: (res) => {
      toast.success(res.messages)
      setQuoteData({ title: '', categoryId: '', content: '' })
    },
  })
  const createQuote = async () => {
    
    const input = await quoteInput.safeParse(quoteData)
    console.log(quoteData)
    if (input.success) {
      mutate(input.data)
    } else input.error.errors.map((err) => toast.error(err.message))
  }

  return (
    <div className="max-w-4xl px-10 py-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center">
        <span className="font-light text-gray-600">
          {new Date().toString().substring(0, 10)}
        </span>
        <div>
          <select className="block bg-gray-600 text-white font-bold py-2 px-3 rounded-lg focus:outline-none md:py-3"
          value={quoteData.categoryId}
          onChange={(e) => setQuoteData({...quoteData, categoryId: e.target.value})}
          >
            <option value={""}>{"choose the category"}</option>
            {categoryList?.map(({ id, name }) => (
              <option key={id} value={id}>{name}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="mt-2">
        <input
          type={'text'}
          value={quoteData.title}
          onChange={e => setQuoteData({...quoteData, title: e.target.value})}
          placeholder="Enter Title here"
          className="w-full  h-10  text-2xl text-gray-700 font-bold hover:underline resize-none outline-none"
        />
        <textarea
          value={quoteData.content}
          onChange={e => setQuoteData({...quoteData, content: e.target.value})}
          placeholder="Enter the paragraph here....."
          className="mt-2  h-18 w-full  border-none outline-gray-100 pl-2  resize-none text-gray-600"
        ></textarea>
      </div>
      <div className="flex justify-between items-center mt-4">
        <button className="text-blue-500 hover:underline" onClick={createQuote}>Create Qoute</button>
      </div>
    </div>
  )
}
