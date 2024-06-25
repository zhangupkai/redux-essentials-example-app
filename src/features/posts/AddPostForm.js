import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addNewPost } from "./postsSlice"

export default function AddPostForm() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [userId, setUserId] = useState('')
  const [addRequestStatus, setAddRequestStatus] = useState('idle')

  const canSave = title && content && userId && addRequestStatus === 'idle'

  const users = useSelector(state => state.users)
  const dispatch = useDispatch()

  function handleTitleChange(e) {
    setTitle(e.target.value)
  }

  function handleContentChange(e) {
    setContent(e.target.value)
  }

  function handleAuthorChange(e) {
    setUserId(e.target.value)
  }

  async function handleSavePost() {
    if (canSave) {
      try {
        setAddRequestStatus('loading')
        /* .unwrap() 函数，它将返回一个新的 Promise，
          这个 Promise 在 fulfilled 状态时返回实际的 action.payload 值，
          或者在 rejected 状态下抛出错误。
          这让我们可以使用正常的“try/catch”逻辑处理组件中的成功和失败。
        */
        await dispatch(addNewPost({title, content, user: userId})).unwrap()
        setTitle('')
        setContent('')
        setUserId('')
      } catch (err) {
        console.log('Failed to save the post: ', err)
      } finally {
        setAddRequestStatus('idle')
      }
    }
  }

  const usersOptions = users.map(user => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ))

  return (
    <section>
      <h2>添加新文章</h2>
      <form>
        <label htmlFor="postTitle">文章标题:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={handleTitleChange}
        />
        <label htmlFor="postAuthor">作者:</label>
        <select id="postAuthor" value={userId} onChange={handleAuthorChange}>
          <option value=""></option>
          {usersOptions}
        </select>
        <label htmlFor="postContent">内容：</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={handleContentChange}
        />
        <button type="button" onClick={handleSavePost} disabled={!canSave}>保存文章</button>
      </form>
    </section>
  )
}