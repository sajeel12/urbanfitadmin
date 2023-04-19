import React, { useState, useRef } from 'react'
import { useRouter } from 'next/router';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import LanguageModal from '@/components/modals/languagemodal';
import Accordians from '@/components/accordians/accordians';
import LinkBtn from '@/components/buttons/link_btn';
// imports for images
import Image from 'next/image';
import shirt_img from '../../public/card imgs/card img4.png'
// imports for Schema and validation
import { useFormik } from 'formik';
import * as Yup from 'yup'
import Tooltip from '@/components/tooltip';
import Link from 'next/link';

export default function Thanks(props) {
    const router = useRouter()
    console.log('Component mounted: ', Date.now());
    console.log(router.query)
    console.log('Component mounted: ', Date.now());
    // state and funciton to handle modify input fields
    const name = useRef(null)
    const email = useRef(null)
    const [readOnly, setReadOnly] = useState(true)
    const handleModify = (e) => {
        setReadOnly(false)
        let elemName = e.target.getAttribute("name")
        if (elemName === "name") return name.current.focus()
        if (elemName === "email") return email.current.focus()
    }

    // states and function for change localization modal
    const [modal3, setModal3] = useState(false)
    const toggleModal = (e) => {
        if (e.target.name === "modal3") {
            if (modal3 === false) return setModal3(true)
            if (modal3 === true) return setModal3(false)
        }
    }

    // getting data from input fields and applying validation
    const validatedSchema = Yup.object({
        title: Yup.string().required("Please enter a title"),
        firstname: Yup.string().min(2).required("Please enter your First name"),
        lastname: Yup.string().min(2).required("Please enter your Last name"),
        dateofbirth: Yup.date(),
        newsletter_sub_email: Yup.bool(),
        newsletter_sub_phone: Yup.bool()
    })
    const { values, errors, touched, handleBlur, handleChange, handleReset, handleSubmit } = useFormik({
        initialValues: { title: '', firstname: '', lastname: '', dateofbirth: '', newsletter_sub_email: false, newsletter_sub_phone: false },
        validationSchema: validatedSchema,
        onSubmit: (values) => {
            console.log(values)
            handleReset()
        }
    })

    return (
        <>
            <LanguageModal show={modal3} toggleModal={toggleModal} />
            <Navbar />
            <main className='bg-white w-full layout_height transition-all duration-700 overflow-x-hidden overflow-y-scroll'>
                <div className="w-full pb-20 flex justify-center">
                    <section className='w-full lg:w-90pr h-full flex flex-col lg:flex-row p-5 md:p-7 lg:p-0 lg:pt-9 font_gotham text-left pt-5' >
                        <section className="w-full lg:w-3/5 space-y-7 mb-3 mr-auto">
                            <h1 className="text-2xl font_gotham_medium tracking-widest">THANKS</h1>
                            <span className="font_gotam_light">Thank you for doing business with us. We have emailed you the purchases <br /> receipt for the transaction.</span>
                            <h4 className='font_gotham_medium tracking-widest'>BY ADMIN</h4>
                            <span className="w-4/5 font_gotam_light">Payment to be made upon delivery. <br /> Order status changed from Pending payment to processing. 03-12-2021 05:35 PM </span>
                            <div className="w-full py-8 text-sm border-y border-y-gray-400 flex flex-col justify-start">
                                <h3 className="text-xl font_gotham_medium tracking-widest mb-4">SHIPPING DETIALS</h3>
                                <span>Muhammad Bilawal Ashraf</span>
                                <span>Dubai Creek Club Street</span>
                                <span>Port Saeed</span>
                                <span>+1 (559) 5540082</span>
                            </div>
                            <div>
                                <h4 className="text-xl font_gotham_medium tracking-widest mb-5">ITESM(S) ON THIS ORDER</h4>
                                <div className="w-full flex justify-between items-center">
                                    <div className="w-1/4">
                                        <Image width={640} height={853} src={shirt_img} alt="Urban images" className="w-full h-full rounded-lg md:rounded-xl object-cover object-top" ></Image>
                                    </div>
                                    <span className="">
                                        <h1 className="text-2xl font_gotham_medium tracking-widest">{'Product Title Here'.toUpperCase()}</h1>
                                        <span className="font_gotam_light space-x-5"> <small>Qty:1</small> <small>$30</small> </span>
                                    </span>
                                </div>
                                <h4 className="text-xl font_gotham_medium tracking-widest my-5">PRICE DETIALS</h4>
                                <div className="w-full h-auto my-5 md:my-3">
                                    <span key={1} className="w-full mx-auto flex justify-between"><small>Price</small> <small>null</small></span>
                                    <span key={2} className="w-full mx-auto flex justify-between"><small>Discount</small> <small>null</small></span>
                                    <span key={3} className="w-full mx-auto flex justify-between"><small>Shipping Fee</small> <small>null</small></span>
                                    <span key={5} className="w-full mx-auto flex justify-between"><small>Total Amount</small> <small>$null</small></span>
                                </div>
                                <div className="relative w-full pt-2 flex flex-col border-t border-t-gray-400">
                                    <h4 className="text-lg my-4">Tracking Details</h4>
                                    <span><small className=''>Order No:</small> #656755832</span>
                                    <span><small className=''>Tracking No:</small> #6332253454234266</span>
                                    <LinkBtn my="my-0" classes="hidden md:block px-5 absolute bottom-0 right-0" >TRACK YOUR ORDER</LinkBtn>
                                </div>
                                <LinkBtn classes="md:hidden px-5" >TRACK YOUR ORDER</LinkBtn>
                            </div>
                        </section>
                        <div className="w-full lg:w-[31%]">
                            <Accordians />
                        </div>
                    </section>
                </div>
            <Footer />
            </main >
        </>
    )
}
