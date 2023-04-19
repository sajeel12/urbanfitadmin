import React, { useState, useEffect, useRef } from 'react'
import { useSession, signOut } from "next-auth/react"
import { useRouter } from 'next/router';
import toaster from '../utils/toast_function';
import Logout from './modals/logout';
import Link from 'next/link';
import Button from './buttons/simple_btn';

const Option = (props) => {
    const router = useRouter()
    const route = router.pathname
    return (
        <Link className={`group w-full h-[10%] flex justify-between items-center mb-[2px] pr-3 text-sm rounded-sm bg-white transition-all `} href={props.href}><span className={`bg-gold w-2 group-hover:h-full ${route === props.href ? 'h-full' : 'h-0'} transition-all duration-300`}></span>{props.children}<i className=" arrow material-symbols-outlined text-lg text-gray-600 transition-all">chevron_right</i></Link>
    )
}

// Menu for mobile devices
const Option_sm = (props) => {
    const router = useRouter()
    const route = router.pathname
    return (
        <Link className={`h-full group flex flex-col justify-between items-center transition-all `} href={props.href}>{props.children}<span className={`bg-gold-land h-1 mt-1 rounded-lg group-hover:w-full ${route === props.href ? 'w-full' : 'w-0'} transition-all duration-300`}></span></Link>
    )
}

export default function AccountMenu(props) {
    const router = useRouter()
    const route = router.pathname

    const menuRef = useRef(null)
    useEffect(() => {
        let screen = window.screen.width
        if (route === "/user/email&password") return menuRef.current.scroll((screen / 2.1), 0)
        if (route === "/user/address") return menuRef.current.scroll((screen / 1.1), 0)
        if (route === "/user/paymentmethods") return menuRef.current.scroll((screen / 0.8), 0)
        if (route === "/user/orders/orders") return menuRef.current.scroll((screen * 1.5), 0)
    })
    // function to lohgout the user
    const logOut = () => {
        localStorage.clear()
        router.push('/')
        toaster("success", "You have been logged out successfully!")
    }

    // states and function for modals
    const [modal5, setModal5] = useState(false)
    const toggleModal = (e, name) => {
        if (name||e.target.name === "modal5") {
            if (modal5 === false) return setModal5(true)
            if (modal5 === true) return setModal5(false)
        }
    }
    return (
        <>
            <Logout logOut={logOut} modal5={modal5} toggleModal={toggleModal} />
            <div className=" w-1/3 hidden lg:block h-[87vh] relative">
                <div className="flex flex-col absolute top-[7%] right-[17%] items-center w-[60%] h-full list-none font_gotham">
                    <Option href='/user/personalinfo'>Personal Information</Option>
                    <Option href='/user/email&password'>Email & Password</Option>
                    <Option href='/user/address'>My Address</Option>
                    <Option href='/user/paymentmethods'>My Payment Methods</Option>
                    <Link className={` group w-full h-[10%] flex justify-between items-center mb-[2px] pr-3 text-sm rounded-sm bg-white transition-all `} href='/user/orders/orders'><span className={`bg-gold w-2 group-hover:h-full ${route.startsWith('/user/orders') ? 'h-full' : 'h-0'} transition-all duration-300`}></span>My Orders<i className=" arrow material-symbols-outlined text-lg text-gray-600 transition-all">chevron_right</i></Link>
                    <Button onclick={toggleModal} name="modal5" classes="w-full">Logout</Button>
                </div>
            </div>

            {/* To be displayed on the mobile devices */}
            <div ref={menuRef} className={`hide_scrollbar absolute z-10 top-[50px] left-0 w-full bg-white shadow-md text-sm md:text-base lg:hidden ${props.direction} overflow-x-scroll scroll-smooth transition-all duration-300`}>
                <div className="w-[230%] md:w-full h-full px-4 pt-8 flex justify-between">
                    <Option_sm href='/user/personalinfo'>Personal Information</Option_sm>
                    <Option_sm href='/user/email&password'>Email & Password</Option_sm>
                    <Option_sm href='/user/address'>My Address</Option_sm>
                    <Option_sm href='/user/paymentmethods'>My Payment Methods</Option_sm>
                    <Link className={`h-full group flex flex-col justify-between items-center transition-all `} href="/user/orders/orders">My Orders<span className={`bg-gold-land h-1 mt-1 rounded-lg group-hover:w-full ${route === "/user/orders/orders" ? 'w-full' : 'w-0'} transition-all duration-300`}></span></Link>
                    <button onClick={(e)=>{toggleModal(e, "modal5")}} name="modal5" className={`h-full group flex flex-col justify-between items-center transition-all `}> <span className="flex"><span className="material-symbols-rounded">logout</span>Logout</span><span className={`bg-gold-land w-0 h-1 mt-1 rounded-lg group-hover:w-full group-active:w-full group-focus:w-full transition-all duration-300`}></span></button>
                </div>
            </div>
        </>
    )
}