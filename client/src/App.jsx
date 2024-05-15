
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home'
import Login from './components/Login/Login';
import Todos from './components/Todos/Todos'
import Eyeglasses from './components/Eyeglasses/Eyeglasses'
import singleEyeglasses from "./components/SingleEyeglasses";
import Register from "./components/Register/Register";

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/eyeglasses' element={<Eyeglasses />} />
          <Route path="/" element={<Login />} /> 
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="home/users/:id" element={<Home />}>
            <Route path="eyeglasses">
              <Route index element={<Eyeglasses />} />
              <Route path=":eyeglassesModel" element={<singleEyeglasses />} />
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
