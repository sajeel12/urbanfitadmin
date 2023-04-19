import React, { useState } from 'react'
import Navbar from '../../components/navbar';
import LinkBtn from '@/components/buttons/link_btn';
import Footer from '../../components/footer'

export const Accordian = (props) => {
    return (
        <div className="group outline-none accordion-section mb-7 border-b border-b-gray-300" tabindex={props.index}>
            <div className="group flex justify-between py-3 items-center text-gray-700 transition ease duration-500 cursor-pointer pr-10 relative">
                <div className="group-focus:text-black transition ease duration-500">
                    {props.title}
                </div>
                <div className="h-8 w-8rounded-full items-center inline-flex justify-center transform transition ease duration-500 group-focus:text-black group-focus:-rotate-180 absolute top-0 right-0 mb-auto ml-auto mt-2 mr-2">
                    <i className="fas fa-chevron-down"></i>
                </div>
            </div>
            <div className="group-focus:max-h-screen max-h-0 bg-white rounded overflow-hidden ease duration-500">
                <p className="p-2 text-gray-900 text-justify">{props.children}</p>
            </div>
        </div>
    )
}

export default function index() {
    return (
        <>
            <Navbar />
            <main className="w-full flex justify-center bg-gray-100 font_gotham">
                <section className='w-full p-5 lg:p-0 lg:pt-9 lg:w-[75%] h-full font_gotham text-left pt-9' >
                    <h2 className="text-5xl mb-16">FAQ</h2>
                    {/*                                         Search Bar */}
                    <div className='w-full h-12 bg-white px-5 py-2 flex justify-start items-center border border-gray-400 rounded-full' >
                        <i className="material-symbols-outlined mr-4 translate-y-[1px] text-[2rem]">search</i><input type="text" className="bg-transparent outline-none border-none w-full h-full" placeholder='Type a Question here' />
                    </div>

                    {/*                                         pill buttons */}
                    <div className="pill-container my-8 w-full flex flex-wrap text-sm md:text-base space-x-2">
                        <input type="checkbox" id="option-a" name="selector" value="a" />
                        <label className="selector border border-gray-400 rounded-full mb-3 px-4 py-2" htmlFor="option-a">Frequnetly Asked Questions</label>

                        <input type="checkbox" id="option-b" name="selector" value="b" />
                        <label className="selector border border-gray-400 rounded-full mb-3 px-4 py-2" htmlFor="option-b">Orders</label>

                        <input type="checkbox" id="option-c" name="selector" value="c" />
                        <label className="selector border border-gray-400 rounded-full mb-3 px-4 py-2" htmlFor="option-c">Delivery</label>

                        <input type="checkbox" id="option-d" name="selector" value="d" />
                        <label className="selector border border-gray-400 rounded-full mb-3 px-4 py-2" htmlFor="option-d">Returns & Refund</label>

                        <input type="checkbox" id="option-e" name="selector" value="E" />
                        <label className="selector border border-gray-400 rounded-full mb-3 px-4 py-2" htmlFor="option-e">My Account</label>

                        <input type="checkbox" id="option-f" name="selector" value="E" />
                        <label className="selector border border-gray-400 rounded-full mb-3 px-4 py-2" htmlFor="option-f">Payments</label>

                        <input type="checkbox" id="option-g" name="selector" value="E" />
                        <label className="selector border border-gray-400 rounded-full mb-3 px-4 py-2" htmlFor="option-g">Shopping</label>
                    </div>

                    {/*                                        Accordians section                                                  */}
                    <section className="w-full my-10 mx-auto">
                        <h1 className="text-3xl mb-7">This is accordians heading</h1>
                        <div className="w-full overflow-hidden">
                            {[1, 2, 3, 4, 5].map((a) => {
                                return <Accordian index={a} title={`Accordian Number ${a}`} >Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                    Dicta sit aut est quidem dolorum minus maxime.
                                    Nam repellat sequi amet mollitia deleniti illum quas cupiditate porro ullam at! Molestias facilis quidem fuga non officia?
                                    Debitis commodi rerum atque placeat repellendus!
                                </Accordian>
                            })
                            }
                        </div>
                    </section>

                    <div className="w-full my-10 flex flex-col justify-center items-center">
                        <div className={`w-full h-[25vh] mb-7 p-9 justify-center items-center md:items-start rounded-2xl bg-white shadow flex flex-col hover:-translate-y-3 transition duration-500 space-y-8`}>
                            <h2 className="font_gotham text-xl md:text-2xl">Can't find answer to your question?</h2>
                            <LinkBtn href="/contact" classes="w-1/2 md:w-1/3 text-sm" >Contact Us</LinkBtn>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}
