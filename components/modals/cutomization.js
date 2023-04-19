import React, {useState} from 'react'
import Button from '../buttons/simple_btn'
import Cart from '../cart'

import Image from 'next/image'
import image from "@/public/card imgs/card img9.jpg"

export default function Cutomization(props) {
    // state for cart componenet
    const [cart, setCart] = useState(false)
    const toggleCart = () => {
        if (cart === false) return setCart(true)
        if (cart === true) return setCart(false)
    }

    return (
        <div className={`w-full h-full font_gotham fixed inset-0 z-50 bg-gray-800/40 backdrop-blur flex justify-center items-center transition-all duration-500 ${props.show === false ? "opacity-0 pointer-events-none" : ''}`}>
            <Cart cart={cart} toggleCart={toggleCart} />
            <div className={` ${props.show === false ? "translate-y-10" : ''} relative w-11/12 md:w-3/4 lg:w-[60rem] text-sm flex flex-col lg:flex-row bg-white rounded-2xl md:rounded-3xl overflow-hidden transition-all duration-500`}>
                <button onClick={props.toggleModal} name="modal4" className="material-symbols-rounded text-3xl absolute right-5 top-5 cursor-pointer hover:rotate-180 transition-all duration-1000">close</button>
                <div className="hidden md:block w-1/2 h-auto">
                    <Image src={image} className="w-full h-full object-cover" alt="Urban images" ></Image>
                </div>
                <section className="w-full h-full p-7 pt-14 md:pt-7">
                    <div className="w-full space-y-5">
                        <h3 className="text-black text-base">Move to the Urban Fits</h3>
                    </div>
                    <form className="mt-4 font_gotham space-y-5 md:space-y-7" onSubmit={(e)=>{e.preventDefault()}} >
                        <div className='space-y-3' >
                            <h3 className='text-black text-base' >Name</h3>
                            <div className=" w-full data_field flex items-center border-b border-b-gray-400 focus:border-yellow-700 hover:border-yellow-600 transition py-2 mb-4">
                                <input className="bg-transparent outline-none border-none" type="text" name="name" id="name" value="" onChange={null} placeholder="Name" />
                            </div>
                        </div>
                        <div className='space-y-4' >
                            <h3 className='text-black text-base' >Gender*</h3>
                            <div className="font_gotam_light w-full md:w-3/5 flex justify-between items-center ">
                                <div className='mr-2' >
                                    <input className='custom_checkbox rounded-full mx-3 translate-y-[1px]' type="radio" id="male" name="gender" value="male" onChange={null} /><label htmlFor='male'>Male</label>
                                </div>
                                <div className='mr-2' >
                                    <input className='custom_checkbox rounded-full mx-3 translate-y-[1px]' type="radio" id="female" name="gender" value="female" onChange={null} /><label htmlFor='female'>Female</label>
                                </div>
                                <div className='mr-2' >
                                    <input className='custom_checkbox rounded-full mx-3 translate-y-[1px]' type="radio" id="fluid" name="gender" value="fluid" onChange={null} /><label htmlFor='fluid'>Fluid</label>
                                </div>
                            </div>
                            <div className="w-full lg:w-11/12 flex flex-wrap justify-between font_gotam_light">
                                <span className="relative w-[48%] data_field flex items-center border-b border-b-gray-400 focus:border-yellow-700 hover:border-yellow-600 transition py-2 mb-4">
                                    <select defaultValue="Sleeve" name='title' onBlur={null} className="w-full border-none outline-none bg-transparent border-b-gray-800" onChange={null}>
                                        <option defaultChecked >Sleeve</option>
                                        <option id="mr" value="mr">Mr</option>
                                        <option id="ms" value="ms">Ms</option>
                                        <option id="other" value="other">Other</option>
                                    </select>
                                </span>
                                <span className="relative w-[48%] data_field flex items-center border-b border-b-gray-400 focus:border-yellow-700 hover:border-yellow-600 transition py-2 mb-4">
                                    <select defaultValue="Title" name='title' onBlur={null} className="w-full border-none outline-none bg-transparent border-b-gray-800" onChange={null}>
                                        <option defaultChecked >Shoulder</option>
                                        <option id="mr" value="mr">Mr</option>
                                        <option id="ms" value="ms">Ms</option>
                                        <option id="other" value="other">Other</option>
                                    </select>
                                </span>
                                <span className="relative w-[48%] data_field flex items-center border-b border-b-gray-400 focus:border-yellow-700 hover:border-yellow-600 transition py-2 mb-4">
                                    <select defaultValue="Bust" name='title' onBlur={null} className="w-full border-none outline-none bg-transparent border-b-gray-800" onChange={null}>
                                        <option defaultChecked >Bust</option>
                                        <option id="mr" value="mr">Mr</option>
                                        <option id="ms" value="ms">Ms</option>
                                        <option id="other" value="other">Other</option>
                                    </select>
                                </span>
                                <span className="relative w-[48%] data_field flex items-center border-b border-b-gray-400 focus:border-yellow-700 hover:border-yellow-600 transition py-2 mb-4">
                                    <select defaultValue="Waist" name='title' onBlur={null} className="w-full border-none outline-none bg-transparent border-b-gray-800" onChange={null}>
                                        <option defaultChecked >Waist</option>
                                        <option id="mr" value="mr">Mr</option>
                                        <option id="ms" value="ms">Ms</option>
                                        <option id="other" value="other">Other</option>
                                    </select>
                                </span>
                                <span className="relative w-[48%] data_field flex items-center border-b border-b-gray-400 focus:border-yellow-700 hover:border-yellow-600 transition py-2 mb-4">
                                    <select defaultValue="Trouser Rise" name='title' onBlur={null} className="w-full border-none outline-none bg-transparent border-b-gray-800" onChange={null}>
                                        <option defaultChecked >Trouser Rise</option>
                                        <option id="mr" value="mr">Mr</option>
                                        <option id="ms" value="ms">Ms</option>
                                        <option id="other" value="other">Other</option>
                                    </select>
                                </span>
                                <span className="relative w-[48%] data_field flex items-center border-b border-b-gray-400 focus:border-yellow-700 hover:border-yellow-600 transition py-2 mb-4">
                                    <select defaultValue="Hip" name='title' onBlur={null} className="w-full border-none outline-none bg-transparent border-b-gray-800" onChange={null}>
                                        <option defaultChecked >Hip</option>
                                        <option id="mr" value="mr">Mr</option>
                                        <option id="ms" value="ms">Ms</option>
                                        <option id="other" value="other">Other</option>
                                    </select>
                                </span>
                                <span className="relative w-full data_field flex items-center border-b border-b-gray-400 focus:border-yellow-700 hover:border-yellow-600 transition py-2 mb-4">
                                    <select defaultValue="Inside Leg" name='title' onBlur={null} className="w-full border-none outline-none bg-transparent border-b-gray-800" onChange={null}>
                                        <option defaultChecked >Inside Leg</option>
                                        <option id="mr" value="mr">Mr</option>
                                        <option id="ms" value="ms">Ms</option>
                                        <option id="other" value="other">Other</option>
                                    </select>
                                </span>
                            </div>
                        </div>
                        <Button type="submit" onclick={()=>{props.toaster('success','Your items has been added to the cart')}} classes="w-11/12 mx-auto" >Add to Cart</Button>
                        <span className="w-11/12 flex justify-end">
                            <button onClick={toggleCart} className='underline'>View Cart</button>
                        </span>
                    </form>
                </section>
            </div>
        </div>
    )
}
