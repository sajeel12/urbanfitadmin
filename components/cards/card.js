import React from 'react'
import LinkBtn from '../buttons/link_btn'


const Card = (props)=> {
  return (
    <div className={`${props.classes} ${props.round? props.round: "rounded-[2rem]" } bg-white card_boxshadow flex flex-col hover:rounded-2xl hover:scale-[1.01] transition-all duration-300 space-y-8`}>
      <h2 className="font_gotham_medium tracking-[0.3em] text-base">{props.title}</h2>
      <p className={` ${props.valueCenter?'text-center':''} h-1/3 w-3/4 md:h-12 font_gotham_light text-black text-sm`}>{props.value}</p>
      <LinkBtn href={props.href? props.href:"#"} font={props.btnFont} classes={props.btnClasses?props.btnClasses:'w-1/2'} >{props.btnValue}</LinkBtn>
    </div>
  )
}

export default Card