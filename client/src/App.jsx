
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home'
import Login from './components/Login/Login';
// import Todos from './components/Todos/Todos'
import Eyeglasses from './components/Eyeglasses/Eyeglasses'
// import RecipeReviewCard from './components/RecipeReviewCard/RecipeReviewCard'
//import SingleEyeglasses from './components/SingleEyeglasses/SingleEyeglasses';
import Register from "./components/Register/Register";
import SpecificInfo from './components/SpecificInfo/SpecificInfo';
import Main from './components/Header/header';
import PaymentForm from './components/PaymentForm/PaymentForm';
//import ShoppingCart from '@mui/icons-material/ShoppingCart';
import ShoppingCart from './components/ShoppingCart/ShoppingCart';
import Payment from './components/PaymentForm/PaymentForm.jsx';
import { useState } from 'react';
function App() {
  const [style, setStyle] = useState("activity")
  const [login, setLogin] = useState('');
  return (
    <Router>
        <Routes>
        <Route path="/" element={<Main />} >
        <Route path="/" element={<Home />} />
        <Route path="/" element={<Login />} /> 
        <Route path="/my-account" element={<Home />} />
        <Route path="/login" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/shoppingCart" element={<ShoppingCart />}/>
        <Route path="/paymentForm" element={<PaymentForm />}/>
        
        {/* <Route path='/eyeglasses' element={<Eyeglasses />} /> */}
        <Route path="eyeglasses">
              <Route index element={<Eyeglasses />} />
              <Route path=":eyeglassesModel" element={<SpecificInfo />} />
              {/* <Route path=":1" element={<Home />} /> */}
            </Route>
        </Route>
        
        
          {/* <Route path="/" element={<Home />} />
          <Route path="/my-account" element={<Home />} />
          <Route path='/eyeglasses' element={<Eyeglasses />} />
          <Route path='/my-account/eyeglasses' element={<Eyeglasses />} />
          <Route path="/" element={<Login />} /> 
          <Route path="/login" element={<Home />} />
          <Route path="/register" element={<Register />} /> */}
           {/* <Route path="home/users/:id" element={<Home />}> */}
            {/* <Route path="eyeglasses">
              <Route index element={<Eyeglasses />} />
              <Route path=":eyeglassesModel" element={<SpecificInfo />} />
              <Route path=":1" element={<Home />} />
            </Route> */}
           {/* <Route path="todos">
              <Route index element={<Todos />} />
              <Route path=":todoId" element={<Todos />} />
              <Route path="search" element={<Todos />} />
              <Route path="?sortBy" element={<Todos/>}/>
            </Route>
            <Route path="info" element={<Info />} />   
            <Route path='*' element={<p>not found</p>}/>        
          </Route> */}
        </Routes>
    </Router>
  )
}
export default App
