
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home'
import Login from './components/Login/Login';
import Todos from './components/Todos/Todos'
import Posts from './components/Posts/Posts'
import Comments from "./components/comments/Comments";
import Info from "./components/Info/Info";

import Register from "./components/Register/Register";

function App() {
  return (
    <Router>
        <Routes>
          
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="home/users/:id" element={<Home />}>
            <Route path="posts">
              <Route index element={<Posts />} />
              <Route path=':postId/comments' element={<Comments />} />
              <Route path="search/:field/:data" element={<Posts />} />
            </Route>
            <Route path="todos">
              <Route index element={<Todos />} />
              <Route path=":todoId" element={<Todos />} />
              <Route path="search" element={<Todos />} />
              <Route path="?sortBy" element={<Todos/>}/>
            </Route>
            <Route path="info" element={<Info />} />   
            <Route path='*' element={<p>not found</p>}/>        
          </Route>
        </Routes>
    </Router>
  )
}
export default App