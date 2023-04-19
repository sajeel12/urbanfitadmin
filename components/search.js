import React, { useState } from 'react'
import { useCart } from "react-use-cart";
import 'react-toastify/dist/ReactToastify.css';
import LinkBtn from '@/components/buttons/link_btn';
import Loader from './loader';
import Shoppingcard from '@/components/cards/shoppingcard';

export default function Search(props) {
    const [loader, setLoader] = useState(null)
    const [query, setQuery] = useState("")
    const [results, setResults] = useState([])
    const onchange = async (e) => {
        setLoader(<h5 className="text-base lg:text-3xl text-gray-300 w-full text-center tracking-expand my-10">LOADING...</h5>)
        try {
            setQuery(e.target.value)
            let results = await (await fetch(`${process.env.HOST}/api/search?q=${query}`)).json()
            console.log(results)
            if(results) setResults(results)
            console.log(results.length)
            return setLoader(null)
        }
        catch (e) {
            console.log(e)
            return setLoader(null)
        }
    }
    // destructuring Cart function
    const { addItem } = useCart()
    return (
        <>
            <main className={`bg-white w-screen layout_height fixed top-[50px] right-0 z-40 transition-all duration-500 overflow-hidden ${props.search === true ? "" : "translate-x-full opacity-0"} font_gotham`}>
                <div className="w-full h-full flex flex-col">
                    <button onClick={props.toggleSearch} className="absolute left-8 top-5 lg:top-11 cursor-pointer"><i className="fa-solid fa-arrow-left mr-2"></i>Back</button>

                    <section className={`${query !== "" ? "h-1/5" : "h-1/2"} w-full justify-self-start mx-auto mb-3 flex justify-center items-end transition-all duration-700`}>
                        <div className="w-4/5 border-b border-b-gray-200 text-center">
                            <input onChange={onchange} value={query} type="text" className={`w-full outline-none text-center ${query !== "" ? "lg:pb-6 lg:text-[32px]" : "lg:pb-10 lg:text-7xl"} text-lg pb-6 font_gotham_light placeholder:text-gray-300 transition-all duration-700`} placeholder='What are you looking for?' />
                        </div>
                    </section>
                    {results.length == 0 && query!=='' ? <h5 className="text-base lg:text-3xl text-gray-300 w-full text-center tracking-expand my-10">NO SEARCH RESULTS FOUND!</h5>:null}
                    {loader}
                    <section className={`${query === "" ? "h-0" : "h-full"} w-full justify-self-end self-center transition-all duration-1000 overflow-y-scroll lg:overflow-y-hidden lg:overflow-x-scroll scroll-smooth scrollbar_x`}>
                        <div className={`w-full lg:w-[280vw] flex flex-col items-center md:flex-row md:items-start md:justify-start md:flex-wrap lg:flex-nowrap px-5 gap-5 lg:px-10 lg:space-x-5`}>
                            {results.length !== 0 ? results.map((result, index) => {
                                if(index == 9) return
                                return <Shoppingcard classes="w-[320px] h-[450px] md:w-48pr lg:w-[340px] lg:h-[460px]" margin='0' product={result} id={result._id} name={result.name} price={result.price} colors={result.variants.length} img={result.variants[0].images[0].url} />
                            }).slice(0, 4) : null}
                            <div className={`w-full lg:w-auto lg:h-full my-auto flex justify-center items-center ${results.length === 0 ? "hidden" : ""}`}> <LinkBtn classes="w-32" href={`/products/${results.length !== 0 ? results[0].category : ""}`} >View All</LinkBtn> </div>
                        </div>
                    </section>
                </div>
            </main>
        </>
    )
}
