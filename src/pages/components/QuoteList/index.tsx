import { SingleQuote } from 'y/pages/components/SingleQuote'
import { SingleQuoteData } from 'y/types'

export type QuoteListProps = {
  quotes?: SingleQuoteData[]
}

export const QuoteList = ({ quotes }: QuoteListProps) => {
  return (
    <div className='h-full overflow-y-scroll flex flex-col gap-4 over'>
      {quotes?.map(({ id, content, user, category, createdAt }) => {
        return (
          <SingleQuote
            id={id}
            key={id}
            text={content}
            category={category}
            date={createdAt}
            user={user}
          />
        )
      })}
    </div>
  )
}
