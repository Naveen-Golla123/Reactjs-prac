import React, { useState } from 'react'
import Heyy from '../img/Logo.jpg'
import { MdShoppingBasket, MdAdd, MdLogout } from "react-icons/md";
import Avatar from '../img/avatar.png'
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from '../firebase.config';
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reducer';

const Header = () => {

    const [{ user }, dispatch] = useStateValue()
    const [isMenu, setMenu] = useState(false);
    console.log(user)

    const login = async () => {
        if (!user) {
            const auth = getAuth(app);
            const { user: { refreshToken, providerData } } = await signInWithPopup(auth, new GoogleAuthProvider());
            dispatch({
                type: actionType.SET_USER,
                user: providerData[0]
            })
            localStorage.setItem('user', JSON.stringify(providerData[0]))
            console.log(user)
        } else {
            setMenu(!isMenu)
        }
    }

    const logOut = () => {
        setMenu(false)
        console.log("Log Out Clicked !!")
        dispatch({
            type: actionType.SET_USER,
            user: null
        })

        localStorage.clear()
    }

    return (
        <header className='fixed w-screen z-5 py-6 px-6 bg-primary'>
            {/* desktop view */}
            <div className='md:flex hidden w-full h-full items-center justify-between'>
                <Link to={'/'} className='flex items-center gap-2'>
                    <img src={Heyy} className='w-20 object-cover' alt="logo" />
                </Link>

                <div className='flex items-center gap-8 relative'>
                    <ul className='flex items-center gap-9 ml-auto'>
                        <li className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer '>Home</li>
                        <li className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer'>Menu</li>
                        <li className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer'>About Us</li>
                        <li className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer'>Service</li>
                    </ul>
                    <div className='relative flex items-center justify-center '>
                        <MdShoppingBasket className=' text-textColor text-2xl ml-5 cursor-pointer' />
                        <div className='absolute -top-2 -right-0 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center'>
                            <p className='text-xs text-white font-semibold'>2</p>
                        </div>
                    </div>
                    <div>
                        <motion.img src={user ? user.photoURL : Avatar} whileTap={{ scale: 0.6 }} className="relative w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl rounded-full" alt="userprofile" onClick={login} />
                        {
                            isMenu && (
                                <div className='w-70 bg-primary shadow-xl rounded-lg flex flex-col absolute top-10 right-0'>

                                    {
                                        user && user.email == "naveengolla123@gmail.com" && (
                                            <Link to={'/create'}>
                                                <p className='flex items-center px-5 py-2 gap-3 cursor-pointer hover:bg-slate-200 transition-all duration-100 ease-in-out text-textColor text-base' onClick={() => setMenu(!isMenu)}>New Item <MdAdd /></p>
                                            </Link>
                                        )
                                    }
                                    <p className='flex items-center px-5 py-2 gap-3 cursor-pointer hover:bg-slate-200 transition-all duration-100 ease-in-out text-textColor text-base' onClick={logOut}>Log out<MdLogout/></p>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>

            {/* mobile view */}
            <div className='md:hidden flex justify-between w-full h-full'>

                <div className='relative flex items-center justify-center '>
                    <MdShoppingBasket className=' text-textColor text-2xl ml-5 cursor-pointer' />
                    <div className='absolute -top-2 -right-0 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center'>
                        <p className='text-xs text-white font-semibold'>2</p>
                    </div>
                </div>

                <Link to={'/'} className='flex items-center gap-2'>
                    <img src={Heyy} className='w-20 object-cover' alt="logo" />
                </Link>

                <div className='relative'>
                    <img src={user ? user.photoURL : Avatar} whileTap={{ scale: 0.6 }} className="relative w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl rounded-full" alt="userprofile" onClick={login} />
                    {
                        isMenu && (
                            <div className='w-40 bg-primary shadow-xl rounded-lg flex flex-col absolute top-10 right-0'>

                                {
                                    user && user.email === "naveengolla123@gmail.com" && (
                                        <Link to={'/create'}>
                                            <p className='flex px-5 py-2 gap-3 cursor-pointer hover:bg-slate-200 transition-all duration-100 ease-in-out text-textColor text-base' onClick={() => setMenu(!isMenu)}>New Item <MdAdd /></p>
                                        </Link>
                                    )
                                }
                                <ul className='flex flex-col'>
                                    <li className='text-base text-textColor duration-100 transition-all ease-in-out cursor-pointer py-2 hover:bg-slate-300 px-5' onClick={() => setMenu(!isMenu)}>Home</li>
                                    <li className='text-base text-textColor duration-100 transition-all ease-in-out cursor-pointer py-2 hover:bg-slate-300 px-5' onClick={() => setMenu(!isMenu)}>Menu</li>
                                    <li className='text-base text-textColor duration-100 transition-all ease-in-out cursor-pointer py-2 hover:bg-slate-300 px-5' onClick={() => setMenu(!isMenu)}>About Us</li>
                                    <li className='text-base text-textColor duration-100 transition-all ease-in-out cursor-pointer py-2 hover:bg-slate-300 px-5' onClick={() => setMenu(!isMenu)}>Service</li>
                                </ul>
                                <p className='m-2 p-2 rounded-md flex px-5 py-2 gap-3 bg-gray-200 cursor-pointer hover:bg-slate-200 transition-all duration-100 ease-in-out text-textColor text-base' onClick={logOut}>Log out <MdLogout /></p>
                            </div>
                        )
                    }
                </div>
            </div>
        </header>
    )
}

export default Header