import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import PostAuthor from "./PostAuthor"
import TimeAgo from "./TimeAgo"
import ReactionButtons from "./ReactionButtons"
import { fetchPosts, selectAllPosts } from "./postsSlice"
import { Spinner } from "../../components/Spinner"
import { useEffect } from "react"

function PostExcerpt({ post }) {
  return (
    <article className="post-excerpt" key={post.id}>
      <h3>{post.title}</h3>
      <div>
        <PostAuthor userId={post.user} />
        <TimeAgo timestamp={post.date} />
      </div>
      <p className="post-content">{post.content.substring(0, 100)}</p>
      <Link to={`/post/${post.id}`} className="button muted-button">View post</Link>
      <ReactionButtons post={post} />
    </article>
  )
}

export default function PostsList() {
  const dispatch = useDispatch()

  const posts = useSelector(selectAllPosts)
  const postStatus = useSelector(state => state.posts.status)
  const error = useSelector(state => state.posts.error)

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts())
    }
  }, [postStatus, dispatch])

  let content

  if (postStatus === 'loading') {
    content = <Spinner text="正在拼命加载中……"/>
  }
  else if (postStatus === 'succeeded') {
    // 根据日期对文章进行倒序排序
    const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))
    content = orderedPosts.map(post => (
      <PostExcerpt key={post.id} post={post} />
    ))
  }
  else if (postStatus === 'failed') {
    content = <div>{error}</div>
  }

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {content}
    </section>
  )
}