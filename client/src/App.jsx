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
import LoginManager from './components/LoginManger/LoginManager.jsx';
import Dashboard from './components/Dashboard/Dashbord.jsx';
import PrivateRoute from './router/PrivateRoute';
import AuthProvider from './hook/AuthProvider';

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/loginManager" element={<LoginManager />} />
            <Route element={<PrivateRoute />}>
              <Route path="dashboard" element={<Dashboard />} />
            </Route>
            <Route path="/" element={<Main />}>
              <Route index element={<Home />} />
              <Route path="my-account" element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="shoppingCart" element={<ShoppingCart />} />
              <Route path="paymentForm" element={<PaymentForm />} />
              <Route path="eyeglasses">
                <Route index element={<Eyeglasses />} />
                <Route path=":eyeglassesModel" element={<SpecificInfo />} />
              </Route>
            </Route>
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;