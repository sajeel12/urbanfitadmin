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

export default function Checkout2(props) {
    const router = useRouter()
    console.log('Component mounted: ', Date.now());
    console.log(router.query)
    console.log('Component mounted: ', Date.now());
    // state for navbar expansion
    const [expand, setExpand] = useState(false)
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
            <Navbar setExpand={setExpand} />
            <LanguageModal show={modal3} toggleModal={toggleModal} />
            <section className={`bg-gray-100 ${expand === true ? 'lg:w-3/4' : 'w-full lg:w-[95%]'} h-full fixed right-0 transition-all duration-700 overflow-x-hidden overflow-y-scroll`}>
                <div className="w-full pb-20 flex justify-center">
                    <section className='w-full p-5 md:p-7 lg:p-0 lg:pt-9 lg:w-[90%] h-full font_gotham text-left pt-5' >
                        <div className="w-full flex flex-col lg:flex-row">
                            <div className="w-full lg:w-[60%] mb-3 mr-auto">
                                <form className="w-full">
                                    <div className="w-full border-b border-b-gray-300 mb-5"><button onClick={router.back}><i className="fa-solid fa-arrow-left mr-2"></i>Back</button></div>
                                    <span className=" mb-7 flex justify-between text-2xl"> <h1>1. Contact Informaton</h1> <i className="fa-solid fa-circle-check"></i> </span>
                                    <span className="flex flex-col mb-6">
                                        <label htmlFor="name">Name</label>
                                        <div className=" w-full data_field flex justify-between items-center border-b border-b-gray-400 focus:border-yellow-700 hover:border-yellow-600 transition py-2 mb-4">
                                            <input className="w-full bg-transparent outline-none border-none" onBlur={() => { setReadOnly(true) }} readOnly={readOnly} ref={name} type="text" name="name" id="name" placeholder="John Doe" /><button onClick={handleModify} ><i className="material-symbols-outlined" title='Edit' name="name">edit_square</i></button>
                                        </div>
                                    </span>
                                    <span className="flex flex-col">
                                        <label htmlFor="email">Email</label>
                                        <div className=" w-full data_field flex justify-between items-center border-b border-b-gray-400 focus:border-yellow-700 hover:border-yellow-600 transition py-2 mb-4">
                                            <input className="w-full bg-transparent outline-none border-none" onBlur={() => { setReadOnly(true) }} readOnly={readOnly} ref={email} type="email" name="email" id="email" placeholder="John Doe" /><button onClick={handleModify} ><i className="material-symbols-outlined" title='Edit' name="email">edit_square</i></button>
                                        </div>
                                    </span>
                                    <span className=" my-7 flex justify-between text-2xl"> <h1>2. Shipping Imformation</h1> <i className="fa-solid fa-circle-check"></i> </span>
                                    <div className="flex flex-col mb-6 space-y-6">
                                        <div className="w-full rounded-2xl bg-white p-7 space-y-3">
                                            <span className="w-full flex justify-between text-lg"><h5 className='' >Shipping Method</h5> <Link href="/checkout/stpe1" title='Modify' >Modify<i className="material-symbols-outlined text-lg mx-3" name="email">edit_square</i></Link> </span>
                                            <span>Express - {30} dollars (2-4 business days)</span>
                                        </div>
                                        <div className="w-full rounded-2xl bg-white p-7 space-y-3">
                                            <span className="w-full flex justify-between text-lg"><h5 className='' >Ship To</h5> <Link href="/checkout/stpe1" title='Modify' >Modify<i className="material-symbols-outlined text-lg mx-3" name="email">edit_square</i></Link> </span>
                                            <div className='flex flex-col' >
                                                <span>Muhammad Bilawal Ashraf</span>
                                                <span>Dubai Creek Club Street</span>
                                                <span>Port Saeed</span>
                                                <span>+1 (559) 5540082</span>
                                            </div>
                                        </div>
                                        <h1 className=" my-7 text-2xl">3. Payment Information</h1>
                                        <div id="delivery_options" className="w-full py-3 flex justify-between lg:justify-start">
                                            <span className="md:w-1/2 flex">
                                                <input className='rounded mx-2 translate-y-[2px] lg:translate-y-1' type="radio" id="express" name="payment_method" defaultChecked={true} value="cards" onBlur={null} onChange={(e)=>{console.log("i am changed")}} /><label className='cursor-pointer text-sm lg:text-base' htmlFor="express">Credit/Debit Card</label>
                                                <div className='w-1/4 md:w-1/3 ml-2 md:ml-5 flex justify-between gap-2' >
                                                    <svg width="26" height="21" viewBox="0 0 26 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M21.2927 17.4314C21.2927 17.7369 21.093 17.957 20.8066 17.957C20.5114 17.957 20.3205 17.7234 20.3205 17.4314C20.3205 17.139520.5114 16.9059 20.8066 16.9059C21.093 16.9059 21.2927 17.1395 21.2927 17.4314ZM7.80311 16.9059C7.49495 16.9059 7.317 17.1395 7.317 17.4314C7.317 17.7234 7.49495 17.957 7.80311 17.957C8.08523 17.957 8.2762 17.7369 8.2762 17.4314C8.2718617.1395 8.08523 16.9059 7.80311 16.9059ZM12.9029 16.8924C12.6686 16.8924 12.5253 17.0496 12.4906 17.2832H13.3196C13.2805 17.0271 13.1286 16.8924 12.9029 16.8924ZM17.5818 16.9059C17.2866 16.9059 17.108717.1395 17.1087 17.4314C17.1087 17.7234 17.2866 17.957 17.5818 17.957C17.8769 17.957 18.0679 17.7369 18.0679 17.4314C18.0679 17.1395 17.8769 16.9059 17.5818 16.9059ZM22.1781 18.0783C22.1781 18.0918 22.1911 18.1008 22.191118.1277C22.1911 18.1412 22.1781 18.1502 22.1781 18.1771C22.1651 18.1906 22.1651 18.1996 22.1564 18.2131C22.1434 18.2266 22.1347 18.2355 22.1087 18.2355C22.0956 18.249 22.087 18.249 22.0609 18.249C22.0479 18.249 22.0392 18.249 22.0132 18.2355C22.0002 18.2355 21.9915 18.2221 21.9785 18.2131C21.9654 18.1996 21.9568 18.1906 21.9568 18.1771C21.9437 18.1547 21.9437 18.1412 21.9437 18.1277C21.9437 18.1053 21.9437 18.0918 21.9568 18.0783C21.9568 18.0559 21.9698 18.0424 21.9785 18.0289C21.9915 18.0154 22.0002 18.0154 22.0132 18.0064C22.0349 17.993 22.0479 17.993 22.0609 17.993C22.0826 17.993 22.0956 17.993 22.1087 18.0064C22.1304 18.0199 22.1434 18.0199 22.1564 18.0289C22.1694 18.0379 22.1651 18.0559 22.1781 18.0783ZM22.0826 18.1412C22.1043 18.1412 22.1043 18.1277 22.1173 18.1277C22.1304 18.1143 22.1304 18.1053 22.1304 18.0918C22.1304 18.0783 22.1304 18.0693 22.1173 18.0559C22.1043 18.0559 22.0956 18.0424 22.0696 18.0424H22.0002V18.1996H22.0349V18.1367H22.0479L22.0956 18.1996H22.1304L22.0826 18.1412ZM25.3335 2.63867V18.4512C25.3335 19.6416 24.4003 20.6074 23.2502 20.6074H2.41683C1.26666 20.6074 0.333496 19.6416 0.333496 18.4512V2.63867C0.333496 1.44824 1.26666 0.482422 2.41683 0.482422H23.2502C24.4003 0.482422 25.3335 1.44824 25.3335 2.63867ZM3.11127 8.90977C3.11127 12.3463 5.80659 15.1314 9.12256 15.1314C10.3031 15.1314 11.462 14.7631 12.4429 14.0938C9.27881 11.4299 9.30051 6.40313 12.4429 3.73926C11.462 3.06543 10.3031 2.70156 9.12256 2.70156C5.80659 2.69707 3.11127 5.48672 3.11127 8.90977ZM12.8335 13.7973C15.8934 11.3266 15.8804 6.51094 12.83354.02676C9.78662 6.51094 9.7736 11.3311 12.8335 13.7973ZM6.65728 17.2248C6.65728 16.834 6.40988 16.5779 6.01926 16.5645C5.81961 16.5645 5.60693 16.6273 5.4637 16.8564C5.35954 16.6723 5.18159 16.5645 4.93419 16.5645C4.76926 16.5645 4.60433 16.6273 4.47412 16.807V16.6094H4.11822V18.258H4.47412C4.47412 17.409 4.36561 16.9014 4.86475 16.9014C5.30745 16.9014 5.22065 17.3596 5.22065 18.258H5.56353C5.56353 17.4359 5.45502 16.9014 5.95416 16.9014C6.39686 16.9014 6.31006 17.3506 6.31006 18.258H6.66596V17.2248H6.65728ZM8.60607 16.6094H8.26318V16.807C8.146 16.6588 7.98107 16.5645 7.75537 16.5645C7.30832 16.5645 6.96544 16.9328 6.96544 17.4314C6.96544 17.9346 7.30832 18.2984 7.75537 18.2984C7.98107 18.2984 8.146 18.2131 8.26318 18.0559V18.2625H8.60607V16.6094ZM10.3639 17.7594C10.3639 17.0855 9.36995 17.391 9.36995 17.0766C9.36995 16.8205 9.88645 16.8609 10.1729 17.0271L10.3161 16.7352C9.90815 16.4611 9.00537 16.4656 9.00537 17.1035C9.00537 17.7459 9.99929 17.4764 9.99929 17.7773C9.99929 18.0604 9.41336 18.0379 9.10086 17.8133L8.94895 18.0963C9.43506 18.4377 10.3639 18.3658 10.3639 17.7594ZM11.9003 18.1771L11.8048 17.8717C11.6399 17.966 11.2753 18.0693 11.2753 17.6875V16.9418H11.8439V16.6094H11.2753V16.1062H10.9194V16.6094H10.5896V16.9373H10.9194V17.6875C10.9194 18.4781 11.6703 18.3344 11.9003 18.1771ZM12.4776 17.5752H13.6712C13.6712 16.8475 13.35 16.56 12.916 16.56C12.4559 16.56 12.126 16.9148 12.126 17.427C12.126 18.3479 13.1069 18.5006 13.593 18.0648L13.4281 17.7953C13.0896 18.0828 12.5774 18.0559 12.4776 17.5752ZM15.0427 16.6094C14.843 16.5195 14.5392 16.5285 14.383 16.807V16.6094H14.0271V18.258H14.383V17.3281C14.383 16.807 14.7953 16.8744 14.9385 16.9508L15.0427 16.6094ZM15.5028 17.4314C15.5028 16.9193 16.0062 16.7531 16.4012 17.0541L16.5661 16.7621C16.0627 16.3533 15.1469 16.5779 15.1469 17.4359C15.1469 18.3254 16.1191 18.5051 16.5661 18.1098L16.4012 17.8178C16.0019 18.1098 15.5028 17.9346 15.5028 17.4314ZM18.3977 16.6094H18.0418V16.807C17.6816 16.3129 16.7441 16.5914 16.7441 17.4314C16.7441 18.2939 17.7163 18.541 18.0418 18.0559V18.2625H18.3977V16.6094ZM19.8604 16.6094C19.7562 16.5555 19.383 16.4791 19.2007 16.807V16.6094H18.8578V18.258H19.2007V17.3281C19.2007 16.834 19.5913 16.8654 19.7562 16.9508L19.8604 16.6094ZM21.6095 15.94H21.2667V16.807C20.9108 16.3174 19.9689 16.5779 19.9689 17.4314C19.9689 18.3029 20.9455 18.5365 21.2667 18.0559V18.2625H21.6095V15.94ZM21.9394 12.5664V12.773H21.9741V12.5664H22.0566V12.5305H21.8569V12.5664H21.9394ZM22.2259 18.1277C22.2259 18.1053 22.2259 18.0783 22.2128 18.0559C22.1998 18.0424 22.1911 18.0199 22.1781 18.0064C22.1651 17.993 22.1434 17.984 22.1304 17.9705C22.1087 17.9705 22.0826 17.957 22.0609 17.957C22.0479 17.957 22.0262 17.9705 22.0002 17.9705C21.9785 17.984 21.9654 17.993 21.9524 18.0064C21.9307 18.0199 21.9177 18.0424 21.9177 18.0559C21.9047 18.0783 21.9047 18.1053 21.9047 18.1277C21.9047 18.1412 21.9047 18.1637 21.9177 18.1906C21.9177 18.2041 21.9307 18.2266 21.9524 18.24C21.9654 18.2535 21.9741 18.2625 22.0002 18.276C22.0219 18.2895 22.0479 18.2895 22.0609 18.2895C22.0826 18.2895 22.1087 18.2895 22.1304 18.276C22.1434 18.2625 22.1651 18.2535 22.1781 18.24C22.1911 18.2266 22.1998 18.2041 22.2128 18.1906C22.2259 18.1637 22.2259 18.1412 22.2259 18.1277ZM22.3647 12.526H22.304L22.2345 12.6832L22.1651 12.526H22.1043V12.7686H22.1391V12.5844L22.2085 12.7416H22.2562L22.317 12.5844V12.7686H22.3647V12.526ZM22.5557 8.90977C22.5557 5.48672 19.8604 2.69707 16.5444 2.69707C15.3639 2.69707 14.205 3.06543 13.2241 3.73477C16.3535 6.39863 16.401211.4389 13.2241 14.0893C14.205 14.7631 15.3726 15.127 16.5444 15.127C19.8604 15.1314 22.5557 12.3463 22.5557 8.90977Z" fill="black" />
                                                    </svg>
                                                    <svg width="26" height="21" viewBox="0 0 26 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M2.41683 20.5625C1.26622 20.5625 0.333496 19.5967 0.333496 18.4062V2.59375C0.333496 1.40287 1.26622 0.4375 2.41683 0.4375H23.2502C24.4003 0.4375 25.3335 1.40287 25.3335 2.59375V2.70291H22.0566L21.3187 4.83984L20.5852 2.70291H16.3665V5.54063L15.1469 2.70291H11.7354L8.1894 10.9986H11.0453V18.3568H19.8864L21.271 16.7801L22.6555 18.3568H25.3335V18.4062C25.3335 19.5967 24.4003 20.5625 23.2502 20.5625H2.41683ZM21.2797 15.3516L19.4481 17.4314H17.2823L20.212 14.2105L17.2823 10.9537H19.5132L21.3144 13.0516L23.1373 10.9537H25.3335L22.3821 14.1926L25.3335 17.4314H23.1026L21.2797 15.3516ZM25.3335 12.3373V16.0793L23.6278 14.1971L25.3335 12.3373ZM13.6842 15.94H17.2866V17.4314H11.9915V10.9986H17.2866V12.4855H13.6842V13.4918H17.1955V14.9428H13.6842V15.9445V15.94ZM23.6538 5.54512L22.0522 10.0643H20.5592L18.962 5.55859V10.0643H17.2823V3.62695H19.9385L21.3231 7.63848L22.7206 3.62695H25.3335V10.0643H23.6538V5.54512ZM14.8517 8.775H11.9915L11.475 10.0643H9.60867L12.317 3.62695H14.5392L17.2866 10.0643H15.3726L14.8517 8.775ZM13.4194 5.22168L12.5731 7.32852H14.2614L13.4194 5.22168Z" fill="black" />
                                                    </svg>
                                                    <svg width="26" height="21" viewBox="0 0 26 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M20.7371 9.39043C20.7371 9.39043 21.067 11.0615 21.1408 11.4119H19.6911C19.8344 11.0121 20.3856 9.45781 20.3856 9.45781C20.3769 9.47129 20.5288 9.04902 20.6156 8.78848L20.7371 9.39043ZM25.3335 2.59375V18.4062C25.3335 19.5967 24.4003 20.5625 23.2502 20.5625H2.41683C1.26666 20.5625 0.333496 19.5967 0.333496 18.4062V2.59375C0.333496 1.40332 1.26666 0.4375 2.41683 0.4375H23.2502C24.4003 0.4375 25.3335 1.40332 25.3335 2.59375ZM6.95242 13.8781L9.69547 6.90625H7.85086L6.14513 11.668L5.9585 10.7021L5.35086 7.49473C5.25103 7.05 4.94287 6.92422 4.56093 6.90625H1.75277L1.72238 7.04551C2.40815 7.2252 3.02013 7.48574 3.55398 7.81367L5.1078 13.8781H6.95242ZM11.0496 13.8871L12.1434 6.90625H10.3986L9.30919 13.8871H11.0496ZM17.1217 11.6051C17.1304 10.81 16.6616 10.2035 15.659 9.70488C15.047 9.38594 14.6738 9.17031 14.6738 8.84238C14.6825 8.5459 14.9906 8.24043 15.6764 8.24043C16.245 8.22695 16.6616 8.36621 16.9741 8.50547L17.1304 8.58184L17.3691 7.07246C17.0262 6.9332 16.4793 6.77598 15.8066 6.77598C14.0835 6.77598 12.8726 7.72832 12.8639 9.08496C12.8509 10.0867 13.7319 10.6438 14.3917 10.9807C15.0644 11.3221 15.2944 11.5467 15.2944 11.8477C15.2858 12.3148 14.7476 12.5305 14.2484 12.5305C13.554 12.5305 13.1807 12.4182 12.6121 12.1576L12.3821 12.0453L12.1391 13.6131C12.547 13.8062 13.3022 13.977 14.0835 13.9859C15.9151 13.9904 17.1087 13.0516 17.1217 11.6051ZM23.2502 13.8871L21.8439 6.90625H20.4941C20.0774 6.90625 19.7606 7.03203 19.5826 7.48574L16.9915 13.8871H18.8231C18.8231 13.8871 19.1226 13.0246 19.1877 12.8404H21.4272C21.4793 13.0875 21.6356 13.8871 21.6356 13.8871H23.2502Z" fill="black" />
                                                    </svg>
                                                </div>
                                            </span>
                                            <span className="mx-4 flex">
                                                <input className='rounded mx-2 translate-y-[2px] lg:translate-y-1' type="radio" id="standard" name="payment_method" defaultChecked={true} value="paypal" onBlur={null} onChange={(e)=>{console.log("i am changed")}} /><label className='cursor-pointer text-sm lg:text-base' htmlFor="standard">PayPal</label>
                                            </span>
                                        </div>
                                        <section className="w-full space-y-10">
                                            <div className=" w-full data_field flex items-center border-b border-b-gray-400 focus:border-yellow-700 hover:border-yellow-600 transition py-2 mb-4">
                                                <input className="w-full bg-transparent outline-none border-none" type="text" name="email" id="email" onChange={handleChange} placeholder="Enter your PayPal Email or Phone number" />
                                            </div>
                                            <div className=" w-full data_field flex items-center border-b border-b-gray-400 focus:border-yellow-700 hover:border-yellow-600 transition py-2 mb-4">
                                                <select defaultValue="Account Type" className="w-full border-none outline-none bg-transparent border-b-gray-800" onChange={handleChange}>
                                                    <option disabled >Select Account Type</option>
                                                    <option id="personal" value="personal">Personal</option>
                                                    <option id="business" value="business">Business</option>
                                                </select>
                                            </div>
                                            <span className="flex justify-end"> <LinkBtn href="/checkout/thanks" type="submit" classes="px-8" >Proceed to Payment</LinkBtn> </span>
                                        </section>
                                    </div>
                                </form>
                            </div>
                            <div className="details w-full lg:w-[31%] m-0 space-y-3">
                                <h3 className="text-2xl mb-5">Order Summary</h3>
                                {/* summary here */}
                                <div className=" hidden lg:flex relative mb-3 p-5 pt-10 bg-white card_boxshadow w-full h-64 md:h-[21rem] flex-col justify-between items-center rounded-xl md:rounded-3xl">
                                    <h3 className="absolute top-[6%] left-[7%] lg:text-lg text-end">Product Title Here</h3>
                                    <div className="flex justify-between items-center">
                                        <div className=" w-[35%] md:w-1/3">
                                            <Image width={640} height={853} src={shirt_img} alt="Urban images" className="w-full h-full rounded-lg md:rounded-xl object-cover object-top" ></Image>
                                        </div>
                                        <div className="w-1/2 h-auto text-xs md:text-sm my-5 md:my-3 font_gotam_light">
                                            <span key={1} className="w-full mx-auto flex justify-between"><small className='font_gotham'>Color:</small> <small>{props.color}</small></span>
                                            <span key={2} className="w-full mx-auto flex justify-between"><small className='font_gotham'>Size:</small> <small>{props.size}</small></span>
                                            <span key={3} className="w-full mx-auto flex justify-between"><small className='font_gotham'>Quantity:</small> <small>{props.quantity}</small></span>
                                            <span key={4} className="w-full mx-auto flex justify-between"><small className='font_gotham'>Price:</small> <small>${props.price}</small></span>
                                            <span key={5} className="w-full mx-auto flex justify-between"><small className='font_gotham'>Discount:</small> <small>{props.discount ? props.discount : 0}</small></span>
                                            <span key={6} className="w-full mx-auto flex justify-between"><small className='font_gotham'>Sale Price:</small> <small>${props.price + 0}</small></span>
                                        </div>
                                    </div>
                                    <div className="w-full h-auto my-5 md:my-3">
                                        <span key={1} className="w-full mx-auto flex justify-between"><small>Color</small> <small>{props.color}</small></span>
                                        <span key={2} className="w-full mx-auto flex justify-between"><small>Size</small> <small>{props.size}</small></span>
                                        <span key={3} className="w-full mx-auto flex justify-between"><small>Quantity</small> <small>{props.quantity}</small></span>
                                        <span key={4} className="w-full mx-auto flex justify-between"><small>Price</small> <small>${props.price}</small></span>
                                    </div>
                                    <div className="w-full pt-2 flex justify-between border-t border-t-gray-400">
                                        <h4 className="text-lg">Total</h4>
                                        <h4 className="text-lg">$89.78</h4>
                                    </div>
                                </div>
                                {/* Accordian */}
                                <Accordians />
                            </div>
                        </div>
                    </section>
                </div>
                <Footer />
            </section >
        </>
    )
}
