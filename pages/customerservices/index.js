import React, { useEffect, useState } from 'react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import Link from 'next/link'
import { useRouter } from 'next/router'

const MenuLink = (props) => {
    const path = useRouter().pathname
    return <Link href={`/customerservices${props.href}`} className={`${path.includes(props.href) ? 'underline active' : ''} ${props.submenu ? 'lg:ml-7' : null} flex lg:block justify-center items-center px-4 py-1 mx-2 lg:m-0 lg:p-0 whitespace-nowrap bg-gray-200 lg:bg-transparent rounded-full lg:rounded-none text-sm 2xl:text-base hover:underline text-black`}>{props.children}</Link>
}

export default function CutomerServices(props) {

    useEffect(() => {
        if (window.matchMedia('(max-width: 1000px)').matches) {
            let activeLink = document.querySelector('#menu_container .active')
            activeLink.scrollIntoView()
        }
    }, [])
    return (
        <>
            <Navbar />
            <main className='w-full p-5 lg:p-10 lg:pt-16 2xl:p-14 flex flex-col lg:flex-row lg:justify-between bg-white'>
                <section className={`max-w-[2000px] lg:w-1/4 lg:h-auto lg:max-h-none rounded-2xl lg:rounded-none transition-all duration-500 overflow-x-scroll overflow-y-hidden lg:overflow-visible hide_scrollbar`}>
                    <div id='menu_container' className="lg:sticky lg:top-16 lg:left-0 lg:right-0 w-auto lg:w-full py-8 2xl:py-10 lg:px-7 gap-y-4 flex lg:flex-col lg:bg-gray-50 font_gotham rounded-2xl">
                        <h1 className="hidden lg:block mb-3 2xl:mb-5 font_gotham_bold tracking-widest">CUSTOMER SERVICES</h1>
                        <MenuLink href='/returns&refund' >Returns & Refund</MenuLink>
                        <MenuLink href='/orderinfo' >Order Information</MenuLink>
                        <MenuLink href='/payment' >Payment</MenuLink>
                        <MenuLink href='/delivery' >Delivery</MenuLink>
                        <MenuLink href='/productinfo' >Product Information</MenuLink>
                        <MenuLink href='/myaccount' >My Account</MenuLink>
                        <MenuLink href='/sizeguide' >Size Guide</MenuLink>
                        <MenuLink href='/sizeguide/women' submenu >Women</MenuLink>
                        <MenuLink href='/sizeguide/men' submenu >Men</MenuLink>
                        <MenuLink href='/sizeguide/kids' submenu >Kids</MenuLink>
                        <MenuLink href='/cfproducts' >Counterfeit Products</MenuLink>
                        <MenuLink href='/sitemap' >Sitemap</MenuLink>
                        <MenuLink href='/companyinfo' >Company Information</MenuLink>
                    </div>
                </section>
                <section className="w-full lg:w-[70%]">
                    {props.children}
                </section>
            </main>
            <Footer />
        </>
    )
}
