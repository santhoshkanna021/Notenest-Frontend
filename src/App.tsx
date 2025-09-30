import React from 'react'
import Signup from './pages/Signup'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Dashboard from './pages/Dashboard'


const router = createBrowserRouter([
  {path:"/" , element:<Signup/>},
  {path:"/homepage" , element:<Dashboard/>}
])


const App: React.FC = () => {
  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App
