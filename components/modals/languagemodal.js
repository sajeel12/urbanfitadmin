import React, { useState } from 'react'
import Button from '../buttons/simple_btn'

// imports for the schema and validation
import { useFormik } from 'formik';
import * as Yup from 'yup'
import Tooltip from '../tooltip';

export default function LanguageModal(props) {
    // getting data from input fields and applying validation
    const validatedSchema = Yup.object({
        country: Yup.string().required("Please select your country"),
        language: Yup.string().required("Please select your prefered language")
    })
    const { values, errors, touched, handleBlur, handleChange, handleReset, handleSubmit, setFieldValue } = useFormik({
        initialValues: { country: 'uae', language: 'english' },
        validationSchema: validatedSchema,
        onSubmit: (values) => {
            console.log(values)
        }
    })

    return (
        <>
            <div className={`w-full h-full font_gotham fixed inset-0 z-40 bg-gray-800/40 backdrop-blur flex justify-center items-center transition-all duration-500 ${props.show === false ? "opacity-0 pointer-events-none" : ''}`}>
                <div className={` ${props.show === false ? "translate-y-10" : ''} relative max-w-[45rem] w-11/12 md:w-4/6 lg:w-2/5 py-5 text-sm flex flex-col lg:flex-row bg-white rounded-2xl md:rounded-3xl overflow-hidden transition-all duration-500`}>
                    <button onClick={props.toggleModal} name="modal3" className="material-symbols-rounded text-3xl absolute right-5 top-5 cursor-pointer hover:rotate-180 transition-all duration-1000">close</button>
                    <form className="w-full h-full p-7" onReset={handleReset} onSubmit={handleSubmit} >
                        <h2 className="text-xl">Country and Language</h2>
                        <div className="w-full my-12 flex flex-col space-y-4">
                            <h3>Choose your shipping destination:</h3>
                            <div className="relative w-full md:w-4/5 data_field flex items-center border-b border-b-gray-400 focus:border-yellow-700 hover:border-yellow-600 transition py-2 mb-4">
                                <i className="material-symbols-outlined mr-2">local_mall</i>
                                {touched.country && errors.country ? <Tooltip classes="form-error" content={errors.country} /> : null}
                                <select name='country' value={values.country} onBlur={handleBlur} onChange={handleChange} className="w-full border-none outline-none bg-transparent border-b-gray-800">
                                    <option value="uae">United Arab Emirates</option>
                                    <option value="usa">United States America</option>
                                    <option value="canada">Canada</option>
                                    <option value="pakistan">Pakistan</option>
                                    <option value="saudiaraiba">Saudi Arabia</option>
                                </select>
                            </div>
                        </div>
                        <div className="relative w-full my-10 flex flex-col space-y-7">
                            <h3>Choose your language:</h3>
                            {touched.language && errors.language ? <Tooltip classes="form-error" content={errors.language} /> : null}
                            <span className="flex">
                                <input className='rounded mx-2 translate-y-[1px]' type="radio" id="english" name="language" defaultChecked={true} value="english" onBlur={handleBlur} onChange={handleChange} /><label htmlFor="english">English</label>
                            </span>
                            <span className="flex">
                                <input className='rounded mx-2 translate-y-[1px]' type="radio" id="arabic" name="language" value="arabic" onBlur={handleBlur} onChange={handleChange} /><label htmlFor="arabic">Arabic</label>
                            </span>
                        </div>
                        <div className="w-full mt-7 flex justify-end space-x-3">
                            <button onClick={props.toggleModal} type="reset" name="modal3" className="w-2/6 md:w-1/4 rounded-full bg-gray-200 hover:shadow-lg" >Cancel</button>
                            <Button type="submit" my="0" value="" classes="w-2/6 md:w-1/4" >Update</Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
