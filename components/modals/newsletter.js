import React from 'react'
import Button from '../buttons/simple_btn'
import { toast, Slide } from 'react-toastify';
// imports for validation
import Tooltip from '../tooltip';
import { useFormik } from 'formik';
import * as Yup from 'yup'

export default function Newsletter(props) {
    // function to show toast
    const toaster = (type, msg) => {
        toast(msg, {
            position: "top-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            type: type,
            progress: undefined,
            theme: "colored",
            transition: Slide
        })
    }
    
    // schema and validation with yup and fromik
    const newsLetterSchema = Yup.object({
        "email": Yup.string().email().required("Please enter your email address"),
        "gender": Yup.string().required("Please select your gender"),
        "interests": Yup.array().min(1, "Please select at least one interest")
    })
    const { values, errors, touched, handleBlur, handleChange, handleReset, handleSubmit, setFieldValue } = useFormik({
        initialValues: { "email": '', "gender": '', "interests": [] },
        validationSchema: newsLetterSchema,
        onSubmit: async () => {
            let id = "63f0eacb88ecc61447b648d3"
            let res = await fetch(`${process.env.HOST}/api/newsletter?id=${id}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({...values, user: id})
            })
            let response = await res.json()
            toaster(response.success?"success":"error", response.message)
            response.success===true?props.setModal2(false): null
        }
    })
    // function to get input from pill buttons in an array
    const onCheck = (e) => {
        if (e.target.checked) {
            setFieldValue('interests', [
                ...values.interests,
                e.target.value
            ]);
        } else {
            setFieldValue(
                'interests',
                values.interests.filter((interest) => interest !== e.target.value)
            );
        }
    }

    return (
        <>
            <div className={`w-full h-full font_gotham fixed inset-0 z-50 bg-gray-800/40 backdrop-blur flex justify-center items-center transition-all duration-500 ${props.show === false ? "opacity-0 pointer-events-none" : ''}`}>
                <div className={` ${props.show === false ? "translate-y-10" : ''} relative w-11/12 md:w-3/4 lg:w-[60rem] text-sm flex flex-col lg:flex-row bg-white rounded-2xl md:rounded-3xl overflow-hidden transition-all duration-500`}>
                <button onClick={props.toggleModal} name="modal2" className="material-symbols-rounded text-3xl absolute right-5 top-5 cursor-pointer hover:rotate-180 transition-all duration-1000">close</button>
                    <div className=" w-1/2 h-auto bg_newsletter bg-top bg-cover bg-no-repeat"></div>
                    <section className="w-full h-full p-5 pt-14 md:pt-5">
                        <div className="w-full space-y-5">
                            <h3 className="text-black text-base">Move to the Urban Fit</h3>
                            <p className='font_gotam_light' >Be in the know about what’s happening at the Parisian Maison: never miss out on the latest trend, newest collections and exciting special projects from Urban fit. </p>
                        </div>
                        <form className="mt-7 font_gotham space-y-5 md:space-y-7" onReset={handleReset} onSubmit={handleSubmit} >
                            <div className='space-y-3' >
                                <h3 className='text-black text-base' >Email Sign Up*</h3>
                                <div className="relative w-full data_field flex items-center border-b border-b-gray-400 focus:border-yellow-700 hover:border-yellow-600 transition py-2 mb-4">
                                    {touched.email && errors.email ? <Tooltip classes="form-error" content={errors.email} /> : null}
                                    <input className="w-full bg-transparent outline-none border-none" type="email" name="email" id="email" value={values.email} onBlur={handleBlur} onChange={handleChange} placeholder="Email*" />
                                </div>
                            </div>
                            <div className='relative space-y-4' >
                                <h3 className='text-black text-base' >Gender*</h3>
                                { errors.gender ? <Tooltip classes="form-error" content={errors.gender} /> : null}
                                <div className="font_gotam_light w-full md:w-3/5 flex justify-between items-center ">
                                    <div className='mr-2' >
                                        <input key={1} className='custom_checkbox rounded-full mx-3 translate-y-[1px]' type="radio" id="male" name="gender" value="male" onBlur={handleBlur} onChange={handleChange} /><label htmlFor='male'>Male</label>
                                    </div>
                                    <div className='mr-2' >
                                        <input key={2} className='custom_checkbox rounded-full mx-3 translate-y-[1px]' type="radio" id="female" name="gender" value="female" onBlur={handleBlur} onChange={handleChange} /><label htmlFor='female'>Female</label>
                                    </div>
                                    <div className='mr-2' >
                                        <input key={3} className='custom_checkbox rounded-full mx-3 translate-y-[1px]' type="radio" id="fluid" name="gender" value="fluid" onBlur={handleBlur} onChange={handleChange} /><label htmlFor='fluid'>Fluid</label>
                                    </div>
                                </div>
                            </div>
                            <div className="relative space-y-4">
                                <h3 className="text-black text-base">Favourite Subjects*</h3>
                                <div className="pill-container w-full flex flex-wrap text-xs md:text-sm space-y-2 md:space-y-0 space-x-1">
                                    {touched.interests && errors.interests ? <Tooltip classes="form-error" content={errors.interests} /> : null}
                                    {['Bags', 'Sneakers', 'Jackets', 'Dresses', 'Fashion Shows'].map((name, index) => {
                                        return (
                                            <>
                                                <input key={name} onChange={onCheck} checked={values.interests.includes(name.toLowerCase())} type="checkbox" id={name.toLowerCase()} onBlur={handleBlur} name="interests" value={name.toLowerCase()} />
                                                <label key={index} className="selector border border-gray-400 rounded-full mb-3 px-4 py-2" htmlFor={name.toLowerCase()}>{name}</label>
                                            </>
                                        )
                                    })}
                                </div>
                            </div>
                            <p className='font_gotam_light text-sm' >Mandatory information: if you chose not to give your consent for the collection of mandatory data you will not be able to save your payment method.</p>
                            <Button type="submit" classes="w-11/12 mx-auto" >Subscribe</Button>
                        </form>
                    </section>
                </div>
            </div>
        </>
    )
}