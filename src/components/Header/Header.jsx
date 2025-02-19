import React from 'react'
import {Container} from '../Container/Container'
import {Logo} from '../Logo/Logo'
import Link from 'react-router-dom'
import {LogoutBtn} from '../LogoutBtn/LogoutBtn'
import {useNavigator} from 'react-router-dom'
import { useSelector } from 'react-redux'

function Header() {
    const authStatus = useSelector((state)=> state.auth.status);
    const navigate = useNavigate();
    const navItem = [
        {
            name: 'Home',
            slug: '/',
            active: true
        },
        {
            name: 'Login',
            slug: '/login',
            active: !authStatus
        },
        {
            name: 'SignUp',
            slug: '/signup',
            active: !authStatus
        },
        {
            name: 'All Posts',
            slug: '/all-posts',
            active: true
        },
        {
            name: 'Add Posts',
            slug: '/add-posts',
            active: true
        },
        
    ]
  return (
    <Header className="py-3 shadow bg-gray-500">
        <Container>
           <nav className="flex">
            <div className='mr-4'>
                <Link to='/'>
                    <Logo />
                </Link>
            </div>
            <ul className='flex margin-left-auto'>
                {
                    navItem.map((item)=> item.active? (
                        <li key={item.name}>
                            <button onClick={()=>navigate(item.slug) } className='text-white hover:text-gray-200'>{item.name}
                            {item.name}
                            </button>
                        </li>
                    ): null)
                }
                    {authStatus && <li>
                        <LogoutBtn /></li>}
            </ul>
           </nav>
        </Container>
    </Header>
  )
}

export default Header
