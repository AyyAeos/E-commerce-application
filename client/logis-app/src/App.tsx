
import './index.css'
import { Button } from './components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card"




function App() {


  return (
    <>
        <div className="5xl p-10 bg-blue-500 text-white text-center text-2xl rounded-lg">
      Tailwind is working! 🎉
    </div>

    <div>
      <Button>Click me</Button>
    </div>

    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-96">
        <CardHeader>
          <CardTitle>ShadCN Card</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This is a simple card component using ShadCN.</p>
        </CardContent>
      </Card>
    </div>

    </>
  )
}

export default App
