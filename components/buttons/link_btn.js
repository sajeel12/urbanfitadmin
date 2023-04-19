import React from 'react'
import Link from 'next/link'
export default function LinkBtn(props) {
  return (
    <Link href={`${props.href ? props.href : '#'}`} id={props.children} name={props.name ? props.name : ''} onClick={props.onclick ? props.onclick : null} type={props.type ? props.type : ''} className={`flex justify-center items-center h-9 md:h-11 ${props.font?props.font:'font_gotham'} ${props.bg ? props.bg : "bg_btn_gold"} ${props.my ? props.my : "my-6"} py-1 md:py-2 rounded-full ${props.text ? props.text : "text-white"} text-center ${props.fontSize?props.fontSize:'text-sm '} transition-all duration-300 hover:shadow-xl ${props.disabled === true ? "opacity-60 pointer-events-none" : ''} ${props.classes} `} >
      {props.children}
    </Link>
  )
}