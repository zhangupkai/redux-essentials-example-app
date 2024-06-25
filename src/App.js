import React, { Fragment } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom'

import { Navbar } from './app/Navbar'
import PostsList from './features/posts/PostsList'
import AddPostForm from './features/posts/AddPostForm'
import SinglePostPage from './features/posts/SinglePostPage'
import EditPostForm from './features/posts/EditPostForm'
import UserList from './features/users/UserList'
import UserPage from './features/users/UserPage'

function Home() {
  return (
    <Fragment>
      <AddPostForm />
      <PostsList />
    </Fragment>
  )
}

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route path='/post/:postId' element={<SinglePostPage />} />
          <Route path='/editPost/:postId' element={<EditPostForm />} />
          <Route path='/users' element={<UserList />} />
          <Route path='/user/:userId' element={<UserPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
