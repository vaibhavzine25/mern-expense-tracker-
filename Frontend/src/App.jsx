import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from "./components/Login";
import Signup from './components/Signup';
import Home from './components/Home';
import { Toaster } from "@/components/ui/sonner";


const appRouter = createBrowserRouter([
  {
    path:"/",
    element:<Home/>
  },
  {
    path:"/login",
    element:<Login/>
  },
  {
    path:"/signup",
    element:<Signup/>
  }
])

function App() {

  return (
    <>
      <RouterProvider router = {appRouter}/>
      <Toaster/>
    </>
  )
}

export default App
