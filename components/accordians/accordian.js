import React, { useState } from 'react'
// This accordian is for Customer Services pages
export default function Accordian (props) {
    const [open, setOpen] = useState(false)
    const toggleAccordian = () => {
        if (!open) return setOpen(true)
        if (open) return setOpen(false)
    }
    return (
        <div className="p-6 outline-none accordion-section rounded-xl bg-gray-50 mb-6" tabIndex={1}>
            <div onClick={toggleAccordian} className={`${open ? 'border-b' : null} flex justify-between h-8 items-center transition ease duration-700 cursor-pointer relative`}>
                <div className="text-sm font_gotham_medium text-black tracking-widest transition ease duration-700">{props.title}</div>
                <i className={`${open ? '-rotate-180' : null} fa-solid fa-caret-down transform transition ease duration-500`}></i>
            </div>
            <div className={` ${open ? 'max-h-screen mt-5' : 'max-h-0'} relative whitespace-nowrap max-w-full text-sm leading-5 rounded overflow-y-hidden scrollbar_x ease duration-700`}>
                <div className="flex items-center mb-3 py-2">
                    <div className='inline font_gotham_light text-sm text-black'>{props.children}</div>
                </div>
            </div>
        </div>
    )
}