import { useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import PostAuthor from "./PostAuthor"
import TimeAgo from "./TimeAgo"
import { selectPostById } from "./postsSlice"
import ReactionButtons from "./ReactionButtons"

export default function SinglePostPage() {
  const params = useParams()
  const postId = params.postId

  const post = useSelector(state => selectPostById(state, postId))

  if(!post) {
    return (
      <section>
        <h2>404 Not Found</h2>
      </section>
    )
  }

  return (
    <section>
      <article className="post">
        <h2>{post.title}</h2>
        <div>
          <PostAuthor userId={post.user}/>
          <TimeAgo timestamp={post.date}/>
        </div>
        <p className="post-content">{post.content}</p>
        <Link to={`/editPost/${postId}`} className='button'>Edit Post</Link>
        <ReactionButtons post={post} />
      </article>
    </section>
  )
}