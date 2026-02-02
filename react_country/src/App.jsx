import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Country } from './pages/Country';
import { Home } from './pages/Home';
import { AppLayout } from './components/Layout/AppLayout';
import { ErrorPage } from './pages/ErrorPage';
import { CountryDetails } from './components/Layout/CountryDetails';

const router=createBrowserRouter([
  {
    path:"/",
    element:<AppLayout/>,
    errorElement:<ErrorPage/>,
    children:[
       {
    path:"/",
    element:<Home/>
  },
  {
    path:"/about",
    element:<About/>
  },
  {
    path:"/contact",
    element:<Contact/>
  },
  {
    path:"/country",
    element:<Country/>
  },
  {
    path:"/country/:id",
    element:<CountryDetails/>
  }
    ]
  }
 
])

const App=()=>{
  return <RouterProvider router={router}></RouterProvider>
}
export default App;