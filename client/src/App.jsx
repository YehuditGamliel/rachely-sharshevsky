import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Eyeglasses from './components/Eyeglasses/Eyeglasses';
import Register from './components/Register/Register';
import SpecificInfo from './components/SpecificInfo/SpecificInfo';
import Main from './components/Header/header';
import PaymentForm from './components/PaymentForm/PaymentForm';
import ShoppingCart from './components/ShoppingCart/ShoppingCart';
import Branches from './components/Branches/Branchec.jsx';
import Instructions from './components/Instructions/Instructions.jsx';
import ListOfPurchase from './components/ListOfPurchase/ListOfPurchase.jsx'
import EditingGlassesDetails from './components/EditingGlassesDetails/EditingGlassesDetail.jsx'

function App() {
  return (
    
    <div className="App">
      <Router>
       
          <Routes>
            <Route path="/" element={<Main />}>
            <Route path="home" element={<Home />} />
              <Route index element={<Home />} />
              <Route path="my-account" element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="shoppingCart" element={<ShoppingCart />} />
              <Route path="branches" element={<Branches />} />
              <Route path="paymentForm" element={<PaymentForm />} />
              <Route path="instructions" element={<Instructions />} />
              <Route path="updateStatus" element={<ListOfPurchase />} />
              <Route path="eyeglasses">
                <Route index element={<Eyeglasses />} />
                <Route path=":eyeglassesModel" element={<SpecificInfo />} />
                <Route path="?sortBy" element={<Eyeglasses/>}/>
              </Route>
              <Route path="EditingGlasses">
                <Route index element={<Eyeglasses />} />
                <Route path=":eyeglassesModel" element={<EditingGlassesDetails />} />
              </Route>
            </Route>
            <Route path='*' element={<p>not found</p>}/> 

          </Routes>
       
      </Router>
    </div>
  //    <Route path="todos">
  //    <Route index element={<Todos />} />
  //    <Route path=":todoId" element={<Todos />} />
  //    <Route path="search" element={<Todos />} />
  //    <Route path="?sortBy" element={<Todos/>}/>
  //  </Route>
  );
}

export default App;