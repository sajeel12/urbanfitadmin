import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router';
import jwt from 'jsonwebtoken';
import Navbar from '@/components/navbar';
import Loader from '@/components/loader';
import Footer from '@/components/footer';
import countryCodes from '@/static data/countryCodes';
import LanguageModal from '@/components/modals/languagemodal';
import Accordians from '@/components/accordians/accordians';
import ifExists from '@/utils/if_exists';
import toaster from '@/utils/toast_function';
// imports for images
import Image from 'next/image';
import shirt_img from '../../public/card imgs/card img4.png'
// imports for Schema and validation
import { useFormik } from 'formik';
import * as Yup from 'yup'
import Tooltip from '@/components/tooltip';
import Button from '@/components/buttons/simple_btn';

export default function Checkout1(props) {
    const router = useRouter()
    // loader and billing form state
    const [loader, setLoader] = useState(null)
    const [billingForm, setBillingForm] = useState(null)
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
    const addressFieldsValidation = {
        firstname: Yup.string().min(2).required("Please enter your First name"),
        lastname: Yup.string().min(2).required("Please enter your Last name"),
        address_title: Yup.string().required("Please enter your address title"),
        address: Yup.string().min(2).required("Please enter your address"),
        apt_suite: Yup.string(),
        city: Yup.string().required("Please enter your city"),
        country: Yup.string().required("Please enter your country"),
        phone_prefix: Yup.string().required("Please enter your phone prefix"),
        phone_number: Yup.string().min(9).required("Please enter your phone number")
    }
    const addressFieldsValues = {
        address_title: '',
        firstname: '',
        lastname: '',
        address: '',
        apt_suite: '',
        city: '',
        country: 'Country',
        phone_prefix: 'Select Country Code',
        phone_number: ''
    }
    const { values, errors, touched, handleBlur, handleChange, handleReset, handleSubmit, setValues, getFieldMeta } = useFormik({
        initialValues: {
            name: '',
            email: '',
            delivery_option: 'express',
            shipping_address: addressFieldsValues,
            billing_address: addressFieldsValues
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().min(2).required("Please enter your Full Name"),
            email: Yup.string().email().required("Please enter your email address"),
            delivery_option: Yup.string().required("Please select your prefered language"),
            shipping_address: Yup.object().shape(addressFieldsValidation),
            billing_address: Yup.object().shape(addressFieldsValidation)
        }),
        onSubmit: (values) => {
            console.log(values)
            // router.push('/chceckout/step2')
        }
    })

    const getValuesToBeSet = (obj) => {
        return {
            address_title: !obj ? '' : obj.address_title,
            firstname: !obj ? '' : obj.firstname,
            lastname: !obj ? '' : obj.lastname,
            address: !obj ? '' : obj.address,
            apt_suite: !obj ? '' : obj.apt_suite,
            city: !obj ? '' : obj.city,
            country: !obj ? 'Country' : obj.country,
            phone_prefix: !obj ? 'Select Country Code' : obj.phone_prefix,
            phone_number: !obj ? '' : obj.phone_number
        }
    }
    const getAddressToken = async (user_id) => {
        let response = await (await fetch(`${process.env.HOST}/api/user/addresses/get?user_id=${user_id}`)).json()
        localStorage.setItem('addressToken', response.payload)
        return jwt.decode(response.payload)
    }

    useEffect(() => {
        return async () => {
            try {
                setLoader(<Loader />)
                const userData = jwt.decode(localStorage.getItem("authToken"))
                if (!userData) return
                let userAddress = jwt.decode(localStorage.getItem("addressToken"))
                if (!userAddress) userAddress = await getAddressToken(userData._doc._id)

                let shippingAddress = userAddress._doc.addresses.filter(address => { return address.tag === 'shipping' })[0]
                let billingAddress = userAddress._doc.addresses.filter(address => { return address.tag === 'billing' })[0]
                setValues({
                    name: ifExists(userData._doc.firstname) + ' ' + ifExists(userData._doc.lastname),
                    email: ifExists(userData._doc.email),
                    delivery_option: 'express',
                    shipping_address: getValuesToBeSet(shippingAddress),
                    billing_address: getValuesToBeSet(billingAddress)
                })
                setLoader(null)
            }
            catch (error) {
                console.error(error)
                setLoader(null)
            }
        }
    }, [])

    const toggleBillingForm = (e) => {
        let state = e.target.checked
        if (state) {
            setBillingForm('h-0')
            return setValues({
                ...values, billing_address: getValuesToBeSet(values.shipping_address)
            })
        }
        if (!state) {
            setValues({
                ...values, billing_address: getValuesToBeSet(null)
            })
            return setBillingForm(null)
        }
    }
    const onFormSubmit = (errors) => {
        if (errors.shipping_address || errors.billingAddress || errors === {}) return toaster('error', 'Please fill up all your details')
        else return
    }

    return (
        <>
            {loader}
            <LanguageModal show={modal3} toggleModal={toggleModal} />
            <Navbar />
            <main className={`bg-white w-full layout_height transition-all duration-700 overflow-x-hidden overflow-y-scroll`}>
                <div className="w-full pb-20 flex justify-center">
                    <section className='w-full lg:w-[90%] h-full flex flex-col lg:flex-row p-5 md:p-7 lg:p-0 lg:pt-9 font_gotham text-left pt-5' >
                        <div className="w-full lg:w-[60%] mb-3 mr-auto">
                            <form className="w-full" onSubmit={handleSubmit} onReset={handleReset} >
                                <div className="w-full border-b border-b-gray-300 mb-5"><button onClick={router.back}><i className="fa-solid fa-arrow-left mr-2"></i>Back</button></div>
                                <span className=" mb-7 flex justify-between text-2xl"> <h1>1. Contact Informaton</h1> <i className="fa-solid fa-circle-check"></i> </span>
                                <span className="flex flex-col mb-6">
                                    <label htmlFor="name">Name</label>
                                    <div className=" w-full data_field flex justify-between items-center border-b border-b-gray-400 focus:border-yellow-700 hover:border-yellow-600 transition py-2 mb-4">
                                        <input className="w-full bg-transparent outline-none border-none" onBlur={() => { setReadOnly(true) }} onChange={handleChange} value={values.name} readOnly={readOnly} ref={name} type="text" name="name" id="name" placeholder="John Doe" /><button onClick={handleModify} ><i className="material-symbols-outlined" title='Edit' name="name">edit_square</i></button>
                                    </div>
                                </span>
                                <span className="flex flex-col">
                                    <label htmlFor="email">Email</label>
                                    <div className=" w-full data_field flex justify-between items-center border-b border-b-gray-400 focus:border-yellow-700 hover:border-yellow-600 transition py-2 mb-4">
                                        <input className="w-full bg-transparent outline-none border-none" onBlur={() => { setReadOnly(true) }} onChange={handleChange} value={values.email} readOnly={readOnly} ref={email} type="email" name="email" id="email" placeholder="John Doe" /><button onClick={handleModify} ><i className="material-symbols-outlined" title='Edit' name="email">edit_square</i></button>
                                    </div>
                                </span>
                                <span className=" my-7 flex justify-between text-2xl"> <h1>2. Shipping Imformation</h1> <i className="fa-solid fa-circle-check"></i> </span>
                                <div className="flex flex-col mb-6">
                                    <label className='w-full border-b border-b-gray-400 pb-3' htmlFor="delivery_options">Delivery Option</label>
                                    {touched.delivery_option && errors.delivery_option ? <Tooltip classes="form-error" content={errors.delivery_option} /> : null}
                                    <div id="delivery_options" className="w-full py-3 flex justify-between">
                                        <span className="flex">
                                            <input className='rounded mx-2 translate-y-1' type="radio" id="express" name="delivery_option" defaultChecked value="express" onBlur={handleBlur} onChange={handleChange} /><label className='flex flex-col cursor-pointer text-xs lg:text-base' htmlFor="express">Express Delivery <p className="font_gotam_light text-xs">2-4 working days</p></label>
                                        </span>
                                        <span className="flex">
                                            <input className='rounded mx-2 translate-y-1' type="radio" id="standard" name="delivery_option" value="standard" onBlur={handleBlur} onChange={handleChange} /><label className='flex flex-col cursor-pointer text-xs lg:text-base' htmlFor="standard">Standard Delivery <p className="font_gotam_light text-xs">3-5 working days</p></label>
                                        </span>
                                        <span className="flex">
                                            <input className='rounded mx-2 translate-y-1' type="radio" id="free" name="delivery_option" value="free" onBlur={handleBlur} onChange={handleChange} /><label className='flex flex-col cursor-pointer text-xs lg:text-base' htmlFor="free">Free Delivery <p className="font_gotam_light text-xs">5-7 working days</p></label>
                                        </span>
                                    </div>
                                    <h1 className=" my-7 text-2xl">Enter Your Shipping Address</h1>
                                    <section className="w-full space-y-10">
                                        <div className="relative w-full data_field flex items-center border-b border-b-gray-400 focus:border-yellow-700 hover:border-yellow-600 transition py-2 mb-4">
                                            {touched.shipping_address && touched.shipping_address.address_title && errors.shipping_address && errors.shipping_address.address_title ? <Tooltip classes="form-error" content={errors.shipping_address.address_title} /> : null}
                                            <input className="w-full bg-transparent outline-none border-none" type="text" name="shipping_address.address_title" id="address_title" value={values.shipping_address.address_title} onBlur={handleBlur} onChange={handleChange} placeholder="Address Title*" />
                                        </div>
                                        <div className="flex justify-between w-full ">
                                            <div className="relative w-48pr data_field flex items-center border-b border-b-gray-400 focus:border-yellow-700 hover:border-yellow-600 transition py-2 mb-4">
                                                {touched.shipping_address && touched.shipping_address.firstname && errors.firstname && errors.firstname ? <Tooltip classes="form-error" content={errors.shipping_address.firstname} /> : null}
                                                <input className="w-full bg-transparent outline-none border-none" type="text" name="shipping_address.firstname" id="firstname" value={values.shipping_address.firstname} onBlur={handleBlur} onChange={handleChange} placeholder="First Name" />
                                            </div>
                                            <div className="relative w-48pr data_field flex items-center border-b border-b-gray-400 focus:border-yellow-700 hover:border-yellow-600 transition py-2 mb-4">
                                                {touched.shipping_address && touched.shipping_address.lastname && errors.shipping_address && errors.shipping_address.lastname ? <Tooltip classes="form-error" content={errors.shipping_address.lastname} /> : null}
                                                <input className="w-full bg-transparent outline-none border-none" type="text" name="shipping_address.lastname" id="lastname" value={values.shipping_address.lastname} onBlur={handleBlur} onChange={handleChange} placeholder="Last Name" />
                                            </div>
                                        </div>
                                        <div className="relative w-full data_field flex items-center border-b border-b-gray-400 focus:border-yellow-700 hover:border-yellow-600 transition py-2 mb-4">
                                            {touched.shipping_address && touched.shipping_address.address && errors.shipping_address && errors.shipping_address.address ? <Tooltip classes="form-error" content={errors.shipping_address.address} /> : null}
                                            <input className="w-full bg-transparent outline-none border-none" type="text" name="shipping_address.address" id="address" value={values.shipping_address.address} onBlur={handleBlur} onChange={handleChange} placeholder="Address 1*" />
                                        </div>
                                        <div className="flex justify-between w-full ">
                                            <div className="relative w-48pr data_field flex items-center border-b border-b-gray-400 focus:border-yellow-700 hover:border-yellow-600 transition py-2 mb-4">
                                                {touched.shipping_address && touched.shipping_address.city && errors.shipping_address && errors.shipping_address.city ? <Tooltip classes="form-error" content={errors.shipping_address.city} /> : null}
                                                <input className="w-full bg-transparent outline-none border-none" type="text" name="shipping_address.city" id="city" value={values.shipping_address.city} onBlur={handleBlur} onChange={handleChange} placeholder="City*" />
                                            </div>
                                            <div className="relative w-48pr data_field flex items-center border-b border-b-gray-400 focus:border-yellow-700 hover:border-yellow-600 transition py-2 mb-4">
                                                {touched.shipping_address && touched.shipping_address.apt_suite && errors.shipping_address && errors.shipping_address.apt_suite ? <Tooltip classes="form-error" content={errors.shipping_address.apt_suite} /> : null}
                                                <input className="w-full bg-transparent outline-none border-none" type="text" name="shipping_address.apt_suite" id="apt_suite" value={values.shipping_address.apt_suite} onBlur={handleBlur} onChange={handleChange} placeholder="Apt or Suite (optional)" />
                                            </div>
                                        </div>
                                        <div className="relative w-full data_field flex items-center border-b border-b-gray-400 focus:border-yellow-700 hover:border-yellow-600 transition py-2 mb-4">
                                            {touched.shipping_address && touched.shipping_address.country && errors.shipping_address && errors.shipping_address.country ? <Tooltip classes="form-error" content={errors.shipping_address.country} /> : null}
                                            <select className="w-full border-none outline-none bg-transparent border-b-gray-800" name='shipping_address.country' value={values.shipping_address.country} onBlur={handleBlur} onChange={handleChange} >
                                                <option disabled >Country</option>
                                                <option value="uae">UAE</option>
                                                <option value="usa">USA</option>
                                                <option value="pk">Pakistan</option>
                                            </select>
                                        </div>
                                        <div className="flex justify-between w-full lg:w-5/6">
                                            <div className="relative w-2/5 data_field flex items-center border-b border-b-gray-400 focus:border-yellow-700 hover:border-yellow-600 transition py-2 mb-4">
                                                {touched.shipping_address && touched.shipping_address.phone_prefix && errors.shipping_address && errors.shipping_address.phone_prefix ? <Tooltip classes="form-error" content={errors.shipping_address.phone_prefix} /> : null}
                                                <select value={values.shipping_address.phone_prefix} name='shipping_address.phone_prefix' onBlur={handleBlur} className="w-full border-none outline-none bg-transparent border-b-gray-800" onChange={handleChange}>
                                                    {countryCodes.map((item) => {
                                                        if (!item.code) return <option disabled>{item.name}</option>
                                                        return <option value={item.code}>{item.name} {item.code}</option>
                                                    })}
                                                </select>
                                            </div>
                                            <div className="relative w-2/5 data_field flex items-center border-b border-b-gray-400 focus:border-yellow-700 hover:border-yellow-600 transition py-2 mb-4">
                                                {touched.shipping_address && touched.shipping_address.phone_number && errors.shipping_address && errors.shipping_address.phone_number ? <Tooltip classes="form-error" content={errors.shipping_address.phone_number} /> : null}
                                                <input className="w-full bg-transparent outline-none border-none" type="tel" name="shipping_address.phone_number" id="phone_number" size="15" maxLength={15} value={values.shipping_address.phone_number} onBlur={handleBlur} onChange={handleChange} placeholder="Phone Number" />
                                            </div>
                                        </div>
                                    </section>
                                    <div className="w-full my-7 flex flex-col">
                                        <h1 className=" text-2xl">Enter Your Billing Address</h1>
                                        <div className="flex">
                                            Use same details for Billing Address <label className="switch w-11 md:w-11 h-6 ml-5 "><input type="checkbox" name='same_details_as_shipping' checked={values.newsletter_sub_email} value={true} onChange={toggleBillingForm} /><span className="slider"></span></label>
                                        </div>
                                    </div>
                                    <section className={`w-full ${billingForm} overflow-hidden space-y-10`}>
                                        <div className="relative w-full data_field flex items-center border-b border-b-gray-400 focus:border-yellow-700 hover:border-yellow-600 transition py-2 mb-4">
                                            {touched.billing_address && touched.billing_address.address_title && errors.billing_address && errors.billing_address.address_title ? <Tooltip classes="form-error" content={errors.billing_address.address_title} /> : null}
                                            <input className="w-full bg-transparent outline-none border-none" type="text" name="billing_address.address_title" id="address_title" value={values.billing_address.address_title} onBlur={handleBlur} onChange={handleChange} placeholder="Address Title*" />
                                        </div>
                                        <div className="flex justify-between w-full ">
                                            <div className="relative w-48pr data_field flex items-center border-b border-b-gray-400 focus:border-yellow-700 hover:border-yellow-600 transition py-2 mb-4">
                                                {touched.billing_address && touched.billing_address.firstname && errors.firstname && errors.firstname ? <Tooltip classes="form-error" content={errors.billing_address.firstname} /> : null}
                                                <input className="w-full bg-transparent outline-none border-none" type="text" name="billing_address.firstname" id="firstname" value={values.billing_address.firstname} onBlur={handleBlur} onChange={handleChange} placeholder="First Name" />
                                            </div>
                                            <div className="relative w-48pr data_field flex items-center border-b border-b-gray-400 focus:border-yellow-700 hover:border-yellow-600 transition py-2 mb-4">
                                                {touched.billing_address && touched.billing_address.lastname && errors.billing_address && errors.billing_address.lastname ? <Tooltip classes="form-error" content={errors.billing_address.lastname} /> : null}
                                                <input className="w-full bg-transparent outline-none border-none" type="text" name="billing_address.lastname" id="lastname" value={values.billing_address.lastname} onBlur={handleBlur} onChange={handleChange} placeholder="Last Name" />
                                            </div>
                                        </div>
                                        <div className="relative w-full data_field flex items-center border-b border-b-gray-400 focus:border-yellow-700 hover:border-yellow-600 transition py-2 mb-4">
                                            {touched.billing_address && touched.billing_address.address && errors.billing_address && errors.billing_address.address ? <Tooltip classes="form-error" content={errors.billing_address.address} /> : null}
                                            <input className="w-full bg-transparent outline-none border-none" type="text" name="billing_address.address" id="address" value={values.billing_address.address} onBlur={handleBlur} onChange={handleChange} placeholder="Address 1*" />
                                        </div>
                                        <div className="flex justify-between w-full ">
                                            <div className="relative w-48pr data_field flex items-center border-b border-b-gray-400 focus:border-yellow-700 hover:border-yellow-600 transition py-2 mb-4">
                                                {touched.billing_address && touched.billing_address.city && errors.billing_address && errors.billing_address.city ? <Tooltip classes="form-error" content={errors.billing_address.city} /> : null}
                                                <input className="w-full bg-transparent outline-none border-none" type="text" name="billing_address.city" id="city" value={values.billing_address.city} onBlur={handleBlur} onChange={handleChange} placeholder="City*" />
                                            </div>
                                            <div className="relative w-48pr data_field flex items-center border-b border-b-gray-400 focus:border-yellow-700 hover:border-yellow-600 transition py-2 mb-4">
                                                {touched.billing_address && touched.billing_address.apt_suite && errors.billing_address && errors.billing_address.apt_suite ? <Tooltip classes="form-error" content={errors.billing_address.apt_suite} /> : null}
                                                <input className="w-full bg-transparent outline-none border-none" type="text" name="billing_address.apt_suite" id="apt_suite" value={values.billing_address.apt_suite} onBlur={handleBlur} onChange={handleChange} placeholder="Apt or Suite (optional)" />
                                            </div>
                                        </div>
                                        <div className="relative w-full data_field flex items-center border-b border-b-gray-400 focus:border-yellow-700 hover:border-yellow-600 transition py-2 mb-4">
                                            {touched.billing_address && touched.billing_address.country && errors.billing_address && errors.billing_address.country ? <Tooltip classes="form-error" content={errors.billing_address.country} /> : null}
                                            <select className="w-full border-none outline-none bg-transparent border-b-gray-800" name='billing_address.country' value={values.billing_address.country} onBlur={handleBlur} onChange={handleChange} >
                                                <option disabled >Country</option>
                                                <option value="uae">UAE</option>
                                                <option value="usa">USA</option>
                                                <option value="pk">Pakistan</option>
                                            </select>
                                        </div>
                                        <div className="flex justify-between w-full lg:w-5/6">
                                            <div className="relative w-2/5 data_field flex items-center border-b border-b-gray-400 focus:border-yellow-700 hover:border-yellow-600 transition py-2 mb-4">
                                                {touched.billing_address && touched.billing_address.phone_prefix && errors.billing_address && errors.billing_address.phone_prefix ? <Tooltip classes="form-error" content={errors.billing_address.phone_prefix} /> : null}
                                                <select value={values.billing_address.phone_prefix} name='billing_address.phone_prefix' onBlur={handleBlur} className="w-full border-none outline-none bg-transparent border-b-gray-800" onChange={handleChange}>
                                                    {countryCodes.map((item) => {
                                                        if (!item.code) return <option disabled>{item.name}</option>
                                                        return <option value={item.code}>{item.name} {item.code}</option>
                                                    })}
                                                </select>
                                            </div>
                                            <div className="relative w-2/5 data_field flex items-center border-b border-b-gray-400 focus:border-yellow-700 hover:border-yellow-600 transition py-2 mb-4">
                                                {touched.billing_address && touched.billing_address.phone_number && errors.billing_address && errors.billing_address.phone_number ? <Tooltip classes="form-error" content={errors.billing_address.phone_number} /> : null}
                                                <input className="w-full bg-transparent outline-none border-none" type="tel" name="billing_address.phone_number" id="phone_number" size="15" maxLength={15} value={values.billing_address.phone_number} onBlur={handleBlur} onChange={handleChange} placeholder="Phone Number" />
                                            </div>
                                        </div>
                                    </section>
                                    <span className="flex justify-end"> <Button onclick={() => { onFormSubmit(errors) }} disabled={errors} type="submit" classes="px-8" >Continue to Payment</Button> </span>
                                </div>
                            </form>
                        </div>
                        <div className="details w-full lg:w-[31%] m-0 space-y-3">
                            <h3 className="text-2xl mb-5">Order Summary</h3>
                            <div className=" hidden lg:flex relative mb-3 p-5 pt-10 bg-white card_boxshadow w-full h-64 md:h-[21.5rem] flex-col justify-between items-center rounded-xl md:rounded-3xl">
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
                                <div className="w-full py-2 mb-4 flex justify-between border-t border-t-gray-400">
                                    <h4 className="text-lg">Total</h4>
                                    <h4 className="text-lg">$89.78</h4>
                                </div>
                            </div>
                            <Accordians />
                        </div>
                    </section>
                </div>
                <Footer />
            </main >
        </>
    )
}
