import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./index.css"; 
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Provider } from "react-redux"
import store from './store/store.js'
import Home from './pages/Home.jsx'
 import EditPost from './pages/EditPosts.jsx'
import AddPost from './pages/AddPost.jsx'
import SignUp from './pages/SignUp.jsx'
import Login from './pages/Login.jsx'
import AllPosts from './pages/AllPosts.jsx'
import Protected from './components/AuthLayout.jsx'
import Post from "./pages/Post";

const BrowserRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />, // Use lowercase 'element'
    children: [
      {
        path: '/',
        element: <Home /> // Use lowercase 'element'
      },
      {
        path: '/login',
        element:(
          <Protected authentication = {false}>
            <Login/>
          </Protected>
        )
      },
      {
        path: '/signup',
        element:(
          <Protected authentication = {false}>
            <SignUp/>
          </Protected>
        )
      },
      {
        path: '/all-posts',
        element:(
          <Protected authentication>
            <AllPosts/>
          </Protected>
        )
      },
      {
        path: '/add-post',
        element:(
          <Protected authentication>
            <AddPost/>
          </Protected>
        )
      },
      {
        path: '/Edit-post/:slug',
        element:(
          <Protected authentication>
            <EditPost/>
          </Protected>
        )
      },
      {
        path: "/post/:slug",
        element: <Post />,
    },
      
    ]
  }
]);

createRoot(document.getElementById('root')).render(

    <Provider store={store}>
   <RouterProvider router = {BrowserRouter}/>  
    </Provider>
 ,
)
