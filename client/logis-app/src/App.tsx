
import './index.css'
import NavBar from './components/NavBar/NavBar'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//Page Import
import Home from './pages/Home';
import Login from './pages/Login';





function App() {


  return (
    <>
        <Router>
              <NavBar />
              <div className='pt-20'>
              <Routes>
                <Route path="/" element={<Home />} /> 
                <Route path="/logins" element={<Login />} /> 
              </Routes>
              </div>
            </Router>

      </> 
  )
}

export default App
