import './index.css'
import NavBar from './components/NavBar/NavBar'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//Page Import
import AppRoutes from './routes/AppRoute';

function App() {

  

  return (
    <>
        <Router>
              <NavBar />
              <div className='pt-20'>
              <AppRoutes />
              </div>
            </Router>

      </> 
  )
}

export default App