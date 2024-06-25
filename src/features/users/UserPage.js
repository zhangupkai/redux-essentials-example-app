import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { selectUserById } from "./usersSlice";
import { selectPostsByUser } from "../posts/postsSlice";

export default function UserPage() {
  const params= useParams()
  const userId = params.userId

  const user = useSelector(state => selectUserById(state, userId))
  const postsForUser = useSelector(state => selectPostsByUser(state, userId))

  const renderPostTitles = postsForUser.map(post => (
    <li key={post.id}>
      <Link to={`/post/${post.id}`}>{post.title}</Link>
    </li>
  ))

  return (
    <section>
      <h2>{user.name}</h2>
      <ul>{renderPostTitles}</ul>
    </section>
  )
}