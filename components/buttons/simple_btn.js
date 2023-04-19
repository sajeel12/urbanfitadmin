import React from 'react'

export default function Button(props) {

  return (
    <button id={props.children} name={props.name ? props.name : ''} onClick={props.onclick ? props.onclick : null} type={props.type ? props.type : ''} 
    className={`${props.classes} flex justify-center items-center h-11 ${props.font?props.font:'font_gotham'} ${props.bg ? props.bg : "bg_btn_gold"} ${props.my ? props.my : "my-6"} py-1 md:py-2 px-5 rounded-full text-${props.text ? props.text : "white"} text-center ${props.fontSize?props.fontSize:'text-sm '} md:text-base transition hover:shadow-xl ${props.disabled === true ? "opacity-60 pointer-events-none" : ''} `} >
      {props.children}
    </button>
  )
}
