import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import { Avatar } from './personalinfo';
import Head from 'next/head';
import ifExists from '@/utils/if_exists';
import storeAddress from '@/utils/get_address';
import toaster from '@/utils/toast_function';
import Navbar from '../../components/navbar';
import jwt from 'jsonwebtoken';
import countryCodes from '@/static data/countryCodes';
import Button from '../../components/buttons/simple_btn';
import AccountMenu from '../../components/accountmenu'
import Loader from '@/components/loader';
// imports for the schema and validation
import { useFormik } from 'formik';
import * as Yup from 'yup'
import Tooltip from '../../components/tooltip';

const AddressForm = (props) => {
    const router = useRouter()
    const { tag } = props
    // getting data from input fields andrelative  applying validation
    const { values, errors, touched, handleChange, handleReset, handleBlur, handleSubmit, setValues } = useFormik({
        initialValues: {
            tag: props.tag,
            address_title: '',
            firstname: '',
            lastname: '',
            address: '',
            apt_suite: '',
            city: '',
            country: 'Country',
            phone_prefix: 'Select Country Code',
            phone_number: ''
        },
        validationSchema: Yup.object({
            tag: Yup.string().required(),
            address_title: Yup.string().required("Please enter your address title"),
            firstname: Yup.string().min(2).max(30).required("Please enter your firstname"),
            lastname: Yup.string().min(2).max(30).required("Please enter your lastname"),
            address: Yup.string().min(2).required("Please enter your address"),
            apt_suite: Yup.string(),
            city: Yup.string().required("Please enter your city"),
            country: Yup.string().required("Please enter your country"),
            phone_prefix: Yup.string().required("Please enter your phone prefix"),
            phone_number: Yup.string().min(9).required("Please enter your phone number"),
        }),
        onSubmit: props.onsubmit
    })
    useEffect(() => {
        let userAddress = jwt.decode(localStorage.getItem("addressToken"))
        if (userAddress) {
            let addressObj = userAddress._doc
            if (addressObj.addresses.length === 0) return
            let address = addressObj.addresses.filter((address) => {
                return address.tag === tag
            })
            if (address.length === 0) return
            setValues(address[0])
        }
        else return router.push('/access denied')
    }, [])

    return (
        <form className="mt-10 font_gotham space-y-10 overflow-hidden" onReset={handleReset} onSubmit={handleSubmit} >
            <h1 className='text-xl' >{props.heading}</h1>
            <div className="relative w-full data_field flex items-center border-b border-b-gray-400 focus:border-yellow-700 hover:border-yellow-600 transition py-2 mb-4">
                {touched.address_title && errors.address_title ? <Tooltip classes="form-error" content={errors.address_title} /> : null}
                <input className="w-full bg-transparent outline-none border-none" type="text" name="address_title" id="address_title" value={values.address_title} onBlur={handleBlur} onChange={handleChange} placeholder="Address Title*" />
            </div>
            <div className="flex justify-between w-full ">
                <div className="relative w-48pr data_field flex items-center border-b border-b-gray-400 focus:border-yellow-700 hover:border-yellow-600 transition py-2 mb-4">
                    {touched.firstname && errors.firstname ? <Tooltip classes="form-error" content={errors.firstname} /> : null}
                    <input className="w-full bg-transparent outline-none border-none" type="text" name="firstname" id="firstname" value={values.firstname} onBlur={handleBlur} onChange={handleChange} placeholder="First Name" />
                </div>
                <div className="relative w-48pr data_field flex items-center border-b border-b-gray-400 focus:border-yellow-700 hover:border-yellow-600 transition py-2 mb-4">
                    {touched.lastname && errors.lastname ? <Tooltip classes="form-error" content={errors.lastname} /> : null}
                    <input className="w-full bg-transparent outline-none border-none" type="text" name="lastname" id="lastname" value={values.lastname} onBlur={handleBlur} onChange={handleChange} placeholder="Last Name" />
                </div>
            </div>
            <div className="relative w-full data_field flex items-center border-b border-b-gray-400 focus:border-yellow-700 hover:border-yellow-600 transition py-2 mb-4">
                {touched.address && errors.address ? <Tooltip classes="form-error" content={errors.address} /> : null}
                <input className="w-full bg-transparent outline-none border-none" type="text" name="address" id="address" value={values.address} onBlur={handleBlur} onChange={handleChange} placeholder="Address 1*" />
            </div>
            <div className="flex justify-between w-full ">
                <div className="relative w-48pr data_field flex items-center border-b border-b-gray-400 focus:border-yellow-700 hover:border-yellow-600 transition py-2 mb-4">
                    {touched.city && errors.city ? <Tooltip classes="form-error" content={errors.city} /> : null}
                    <input className="w-full bg-transparent outline-none border-none" type="text" name="city" id="city" value={values.city} onBlur={handleBlur} onChange={handleChange} placeholder="City*" />
                </div>
                <div className="relative w-48pr data_field flex items-center border-b border-b-gray-400 focus:border-yellow-700 hover:border-yellow-600 transition py-2 mb-4">
                    {touched.apt_suite && errors.apt_suite ? <Tooltip classes="form-error" content={errors.apt_suite} /> : null}
                    <input className="w-full bg-transparent outline-none border-none" type="text" name="apt_suite" id="apt_suite" value={values.apt_suite} onBlur={handleBlur} onChange={handleChange} placeholder="Apt or Suite (optional)" />
                </div>
            </div>
            <div className="relative w-full data_field flex items-center border-b border-b-gray-400 focus:border-yellow-700 hover:border-yellow-600 transition py-2 mb-4">
                {touched.country && errors.country ? <Tooltip classes="form-error" content={errors.country} /> : null}
                <select className="w-full border-none outline-none bg-transparent border-b-gray-800" name='country' value={values.country} onBlur={handleBlur} onChange={handleChange} >
                    <option disabled >Country</option>
                    <option value="uae">UAE</option>
                    <option value="usa">USA</option>
                    <option value="pk">Pakistan</option>
                </select>
            </div>
            <div className="flex justify-between w-full lg:w-5/6">
                <div className="relative w-2/5 data_field flex items-center border-b border-b-gray-400 focus:border-yellow-700 hover:border-yellow-600 transition py-2 mb-4">
                    {touched.phone_prefix && errors.phone_prefix ? <Tooltip classes="form-error" content={errors.phone_prefix} /> : null}
                    <select value={values.phone_prefix} name='phone_prefix' onBlur={handleBlur} className="w-full border-none outline-none bg-transparent border-b-gray-800" onChange={handleChange}>
                        {countryCodes.map((item) => {
                            if (!item.code) return <option disabled>{item.name}</option>
                            return <option value={item.code}>{item.name} {item.code}</option>
                        })}
                    </select>
                </div>
                <div className="relative w-2/5 data_field flex items-center border-b border-b-gray-400 focus:border-yellow-700 hover:border-yellow-600 transition py-2 mb-4">
                    {touched.phone_number && errors.phone_number ? <Tooltip classes="form-error" content={errors.phone_number} /> : null}
                    <input className="w-full bg-transparent outline-none border-none" type="tel" name="phone_number" id="phone_number" size="15" maxLength={15} value={values.phone_number} onBlur={handleBlur} onChange={handleChange} placeholder="Phone Number" />
                </div>
            </div>
            <div className="w-full flex justify-end space-x-4">
                <Button type="reset" bg="bg-gray-200" text="black" classes="w-full md:w-1/3" >Cancel</Button>
                <Button type="submit" classes="w-full md:w-1/3" >Save</Button>
            </div>
        </form>
    )
}

export default function Address() {
    const router = useRouter()
    //state to handle loader component
    const [loader, setLoader] = useState(false)
    const onsubmit = async (values) => {
        setLoader(<Loader />)
        try {
            let response = await fetch(`${process.env.HOST}/api/user/addresses/update?user_id=${user._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values)
            })
            let res = await response.json()
            if (!res.success) toaster("error", res.msg)
            if (res.success) toaster("success", res.msg)
            if (!res.payload) return setLoader(null)
            localStorage.setItem("addressToken", res.payload)
            setLoader(null)
        } catch (e) { setLoader(null) }
    }
    // user data state
    const [user, setUser] = useState({})
    // determining if the scroll direction is upwards or downwards
    const [direction, setDirection] = useState('')
    const handleScroll = (e) => {
        e.target.scrollTop > 7 ? setDirection("-translate-y-20") : setDirection('translate-y-0')
    }

    useEffect(() => {
        const userData = jwt.decode(localStorage.getItem("authToken"))
        if (userData) {
            let user = userData._doc
            storeAddress(user._id)
            setUser(user)
        }
        else return router.push('/access denied')
    }, [])

    return (
        <>
            <Head>
                <title>Addresses</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            {loader}
            <Navbar lowerLogo />
            <main className={`bg-gray-100 w-full h-90vh lg_layout_height lg:fixed right-0 flex overflow-hidden font_gotham transition-all duration-700`}>
                <AccountMenu direction={direction} />
                <section onScroll={handleScroll} className='w-full lg:w-[67%] px-4 pt-24 pb-20 lg:pl-7 lg:pt-9 font_gotham text-left overflwo-x-hidden overflow-y-scroll scroll-py-10' >
                    <div className="w-full lg:w-5/6">
                        <div className="flex flex-row-reverse md:flex-row items-center gap-3">
                            <Avatar user={user} />
                            <span>
                                <h2 className="text-xl lg:text-2xl mb-4">My Account</h2>
                                <p className='text-xs lg:text-sm' >Welcome {ifExists(user.firstname)} !<br />Save your address details and phone number here for easy and fast in delivery process in the future.</p>
                            </span>
                        </div>
                        <AddressForm tag="shipping" heading="Add or Change the Shipping Address" onsubmit={onsubmit} />
                        <AddressForm tag="billing" heading="Add or Change the Billing Address" onsubmit={onsubmit} />
                    </div>
                </section>
            </main>
        </>
    )
}