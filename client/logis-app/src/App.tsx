
import './index.css'
import NavBar from './components/NavBar/NavBar'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//Page Import
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductList from './components/ProductList/ProductList';
import AdminPage from './pages/AdminPage';
import AdminLogin from './pages/AdminLogin';
import Inventory from './pages/Inventory';
import Transaction from './pages/Transaction';





function App() {


  return (
    <>
        <Router>
              <NavBar />
              <div className='pt-20'>
              <Routes>
                <Route path="/" element={<Home />} /> 
                <Route path="/logins" element={<Login />} /> 
                <Route path="/admins" element={<AdminPage />} /> 
                <Route path="/register" element={<Register />} /> 
                <Route path="/products" element={<ProductList />} /> 
                <Route path="/logins/admin" element={<AdminLogin />} /> 
                <Route path="/admins/inventory" element={<Inventory />} /> 
                <Route path="/admins/transaction" element={<Transaction />} /> 
              </Routes>
              </div>
            </Router>

      </> 
  )
}

export default App
