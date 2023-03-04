import Post from '../SinglePost'
import { type SingleQuoteData } from 'y/types'

type Props = {
  list: SingleQuoteData[]
}

const PostList = ({ list }: Props) => {
  return (
    <>
      {list?.map(({ id, title, content, category, createdAt, user }) => (
        <Post
          key={id}
          title={title}
          contnet={content}
          date={createdAt}
          user={user}
          category={category}
        />
      ))}
    </>
  )
}

export default PostList;
