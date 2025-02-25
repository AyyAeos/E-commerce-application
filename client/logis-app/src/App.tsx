
import './index.css'
import { Button } from './components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card'
import NavBar from './components/NavBar/NavBar'
import axios from 'axios'
import { log } from 'console'
import Admin from './components/Admin/Admin'




function App() {
   const  fetch = async ( ) => {
    const adminList = await axios.get('http://localhost:8080/admins/selection/admin');
    console.log(adminList);
    
  } 

  return (
  
    <>
        <div className="5xl p-10 bg-blue-500 text-white text-center text-2xl rounded-lg">
      Tailwind is working! 🎉
    </div>

    <div>
      <Button onClick={fetch}>Click me</Button>
      <NavBar />

    </div>

    <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <Admin />
    </div>

    </>
  )
}

export default App
