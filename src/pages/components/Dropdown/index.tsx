type AppProps = {
  categories?: { id: string; name: string }[]
  onChange: (id:string)=> void
  selecteItem?: string 
}

export const Dropdown = ({ categories, onChange, selecteItem}: AppProps) => {
  return (
    <div className="relative m-auto w-fit lg:max-w-sm">
      <select  value={selecteItem} onChange={(e)=> onChange(e.target.value)} className="p-2.5 w-fit text-black bg-slate-500 border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600">
      <option value={"0"}>
              {"choose the your quote category"}
      </option>
        {categories?.map((category) => {
          return (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          )
        })}
      </select>
    </div>
  )
}
