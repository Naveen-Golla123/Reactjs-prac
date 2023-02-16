import React, { useState } from 'react'
import Heyy from '../img/Logo.jpg'
import { MdShoppingBasket, MdAdd, MdLogout } from "react-icons/md";
import Avatar from '../img/avatar.png'
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reducer';
import { useGoogleLogin } from '@react-oauth/google'


const Header = () => {

    const [{ user, cartItemCount }, dispatch] = useStateValue();
    const [isMenu, setMenu] = useState(false);
    console.log(user)


    const loginButtonClicked = ()=> {
        if(user){
            setMenu(!isMenu)
            return
        }
        login();
    }

    const login = useGoogleLogin({
        onSuccess: codeResponse => loginSuccess(codeResponse),
        flow: 'implicit'
    });

    const loginSuccess = (codeResponse) => {
        console.log(codeResponse)
        //Site loader Starts
        // login API call.
        var body = {
            accessToken: codeResponse.access_token
        }
        fetch("http://localhost:3000/api/Auth", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }).then(res => res.json()).then(res => {
            console.log(res)
            dispatch({
                type: actionType.SET_USER,
                user: { ...res.userInfo, accessToken: res.accessToken }
            })
            localStorage.setItem("userInfo", JSON.stringify({ ...res.userInfo, accessToken: res.accessToken }))
            console.log(user)
        }).catch(err => {
            console.log("Login failed");
        })
        //Site loader ends

        dispatch({
            type: actionType.SET_USER,
            user: codeResponse.access_token
        })
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
        <header className='fixed w-screen py-6 px-6 bg-primary z-[100]'>
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
                            <p className='text-xs text-white font-semibold'>{cartItemCount}</p>
                        </div>
                    </div>
                    <div>
                        <motion.img src={user ? user.profileImageUrl : Avatar} whileTap={{ scale: 0.6 }}
                            className="relative w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl rounded-full" alt="userprofile"
                            onClick={loginButtonClicked}/>
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
                                    <p className='flex items-center px-5 py-2 gap-3 cursor-pointer hover:bg-slate-200 transition-all duration-100 ease-in-out text-textColor text-base' onClick={logOut}>Log out<MdLogout /></p>
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
                        <p className='text-xs text-white font-semibold'>{cartItemCount}</p>
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

// "eyJhbGciOiJSUzI1NiIsImtpZCI6IjI3NDA1MmEyYjY0NDg3NDU3NjRlNzJjMzU5MDk3MWQ5MGNmYjU4NWEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJuYmYiOjE2NzU3Mzk0ODEsImF1ZCI6Ijc5OTcwMzc5Njg4MS12aXVjazhlMzdwNzFhNWJpbTg4b2Y2Z3BwdmoxNjZ2dC5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsInN1YiI6IjEwNjQ5MTAwNjA5NDkxMTAxOTgzOCIsImVtYWlsIjoibmF2ZWVuZ29sbGExMjNAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF6cCI6Ijc5OTcwMzc5Njg4MS12aXVjazhlMzdwNzFhNWJpbTg4b2Y2Z3BwdmoxNjZ2dC5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsIm5hbWUiOiJOQVZFRU4gR09MTEEiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUVkRlRwN2tiQmNhMUtjNmFfcGdxdTVLamVpZThoLXl4c0lWX0pRSFBISHlIOEk9czk2LWMiLCJnaXZlbl9uYW1lIjoiTkFWRUVOIiwiZmFtaWx5X25hbWUiOiJHT0xMQSIsImlhdCI6MTY3NTczOTc4MSwiZXhwIjoxNjc1NzQzMzgxLCJqdGkiOiIwNmY5ZTA0NTI2NzNiYTI2NzE3YTQ2NWUwMmVhOGM5OWE2ZGJkZTY3In0.Rq0qzLUYaRziwcKebK4TLd7CL3L4MLk2UiF-M4XVZNtlI7hifkT35t680T-ANHCgCt2-4nfDAV3AxLIwo6nX8M1XGiY3Z6TCNLkgUpd0yzUeT3nx1LozBdZdJOWRxaUjgEMHLFYuLXvc5nAj7eBtNr42rNqdszgeMsS59I8mbyAulLxvJvxaAxgwSJ8wZ8P_yo5VTxg9IL44UoL6ShrN5vtnTD-9lhqTm-365FSffeU-QLeP-Yiy0hEQ-qjNAR1CBE25f_XFRhNZOeDwe1eN67BOFDxwGUWHtofEzrXmPycV_EH3eZFurHLr6kmnuyQx1W0dfR4iWdN_7a7pqTiq0Q"