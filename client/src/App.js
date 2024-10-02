import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';


/** import all components */
import PageNotFound from './components/PageNotFound';
import Profile from './components/Profile';
import Recovery from './components/Recovery';
import Register from './components/Register';
import Reset from './components/Reset';
import AuthForm from './components/Login';
import {AuthorizeUser, ProtectRoute} from './middleware/auth'

//** Root Routes */

const router = createBrowserRouter([
    {
        path : '/',
        element : <AuthForm></AuthForm>
    },
    {
        path : '/register',
        element : <Register></Register>
    },
    {
        path : '/profile',
        element : <AuthorizeUser><Profile/></AuthorizeUser>
    },
    {
        path : '/recovery',
        element : <Recovery></Recovery>
    },
    {
        path : '/reset',
        element : <Reset></Reset>
    },
    {
        path : '*',
        element : <PageNotFound></PageNotFound  >
    }
])
export default function App() {
  return (
    <main>
        <RouterProvider router={router}>
            {/* Render your app here */}
        </RouterProvider>    
    </main>
    )
}
