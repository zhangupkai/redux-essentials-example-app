import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { postUpdated, selectPostById } from "./postsSlice"
import PostAuthor from "./PostAuthor"
import TimeAgo from "./TimeAgo"

export default function EditPostForm() {
  const params = useParams()
  const postId = params.postId

  const post = useSelector(state => selectPostById(state, postId))
  const dispatch = useDispatch()

  if (!post) {
    return (
      <section>
        <h2>404 Not Found</h2>
      </section>
    )
  }

  const [title, setTitle] = useState(post.title)
  const [content, setContent] = useState(post.content)
  const navigate = useNavigate()

  function handleTitleChange(e) {
    setTitle(e.target.value)
  }

  function handleContentChange(e) {
    setContent(e.target.value)
  }

  function handleSavePost(e) {
    if (title && content) {
      dispatch(postUpdated({
        postId,
        title,
        content
      }))
      navigate(`/post/${postId}`)
    }
  }

  return (
    <section>
      <h2>编辑文章</h2>
      <form>
        <label htmlFor="postTitle">文章标题:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={handleTitleChange}
        />
        <div>
          <PostAuthor userId={post.user} />
          <TimeAgo timestamp={post.date} />
        </div>
        <label htmlFor="postContent">内容：</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={handleContentChange}
        />
        <button type="button" onClick={handleSavePost}>保存文章</button>
      </form>
    </section>
  )
}