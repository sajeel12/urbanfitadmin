import React from 'react'

export default function Tooltip(props) {
    return (
        <div className={` ${props.classes} absolute z-20 left-1/2 top-0 py-3 w-full sm:mx-auto`}>
            <div className=" max-w-full border border-red-600 bg-red-600 text-white text-center text-xs rounded-lg py-2 absolute z-50 bottom-full -left-1/2 ml-14 px-3 pointer-events-none">
                {props.content}
                <svg className="absolute text-red-600 h-2 w-full left-0 top-full" x="0px" y="0px" viewBox="0 0 255 255" ><path d="M0 0L127.5 127.5 255 0z" className="fill-red-700"></path></svg>
            </div>
        </div>
    )
}
