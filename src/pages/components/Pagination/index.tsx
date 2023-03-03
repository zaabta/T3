type PaginationProps = {
  pageCount: number
  currentPage: number
  handleOnChangePage: (page: number) => void
}


export const Pagination = ({
  pageCount,
  currentPage,
  handleOnChangePage,
}: PaginationProps) => {
  return (
    <ul className="flex">
      <li
        className="mx-1 px-3 py-2 bg-gray-200 text-gray-500 rounded-lg cursor-pointer hover:bg-gray-700 hover:text-gray-200"
        onClick={() => {
          currentPage - 1 > 0 && handleOnChangePage(currentPage - 1)
        }}
      >
        <label className="flex items-center font-bold cursor-pointer">
          previous
        </label>
      </li>
      {Array.from({ length: pageCount }, (_, i) => i + 1).map((count) =>
        currentPage !== count ? (
          <li
            key={count}
            onClick={() => handleOnChangePage(count)}
            className="mx-1 px-3 py-2 bg-gray-200 text-gray-700 hover:bg-gray-700 hover:text-gray-200 rounded-lg cursor-pointer"
          >
            <label className="font-bold cursor-pointer">{count}</label>
          </li>
        ) : (
          <li
            key={count}
            className="mx-1 px-3 py-2 bg-gray-700 text-gray-200 rounded-lg cursor-pointer"
          >
            <label className="font-bold cursor-pointer">{count}</label>
          </li>
        ),
      )}
      <li
        className="mx-1 px-3 py-2 bg-gray-200 text-gray-700 hover:bg-gray-700 hover:text-gray-200 rounded-lg cursor-pointer"
        onClick={() => {
          currentPage + 1 <= pageCount && handleOnChangePage(currentPage + 1)
        }}
      >
        <label className="flex items-center font-bold cursor-pointer">
          Next
        </label>
      </li>
    </ul>
  )
}


