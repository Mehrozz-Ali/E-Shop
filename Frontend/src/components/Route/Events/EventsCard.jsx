import React from 'react'
import styles from '../../../styles/styles'
import CountDown from "./CountDown.jsx"

function EventsCard({ active }) {
    return (
        <div className={`w-full block bg-white rounded-lg ${active ? "unset" : "mb-12"} lg:flex p-2 shadow-sm `}>
            <div className='w-full lg:w-[50%] m-auto'>
                <img src="https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg" alt="" />
            </div>

            <div className="w-full lg:w-[50%] flex flex-col justify-center ">
                <h2 className={`${styles.productTitle}`}>Iphone 14pro Max B/256gb</h2>
                <p className=''>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo possimus odit voluptate autem blanditiis. Optio, eaque repudiandae maiores aperiam at sequi adipisci esse deleniti incidunt illum, vitae voluptate cupiditate accusamus!
                    Qui accusamus alias ipsa magni error esse ullam! Possimus suscipit omnis eveniet, nisi ut natus. Necessitatibus esse ut dolor dignissimos dicta iste sint possimus optio. Iste aut laborum enim commodi.
                </p>
                <div className="flex py-2 justify-between">
                    <div className="flex">
                        <h5 className='font-[500] text-[18px] text-[#d55b45] pr-3 line-through '>1099$</h5>
                        <h5 className='font-bold text-[20px] text-[#333] font-Roboto'>999$</h5>
                    </div>
                    <span className='pr-3 font-[400] text-[17px] text-[#44a55e]'>120 sold</span>
                </div>
                <CountDown />
            </div>
        </div>
    )
}

export default EventsCard