import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/styles';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';


function ProductDetail({ data }) {
    const [count, setCount] = useState(1);
    const [click, setClick] = useState(false);
    const [select, setSelect] = useState(0);
    const navigate = useNavigate();


    const decrementCount = () => {
        if (count > 1) {
            setCount(count - 1);
        }
    }
    const incrementCount = () => {
        setCount(count + 1);
    }
    const handleMessageSubmit = () => {
        navigate("/inbox?conversation=507ebjwhdhh569gfj")
    }

    return (
        <div className='bg-white '>
            {data ? (
                <div className={`${styles.section} w-[90%] 800px:w-[80%] `}>
                    <div className='w-full py-5'>
                        <div className="flex w-full  800px:flex">
                            {/* Left side */}
                            <div className="w-full  800px:w-[50%]">
                                <img src={data?.image_Url[select].url} alt="" className='w-[50%]' />
                                <div className="w-full flex">
                                    <div className={`${select === 0 ? "border" : "null"} cursor-pointer`}>
                                        <img src={data?.image_Url[0].url} alt="image" className='h-[200px]' onClick={() => setSelect(0)} />
                                    </div>
                                    <div className={`${select === 0 ? "border" : "null"} cursor-pointer`}>
                                        <img src={data?.image_Url[1].url} alt="image" className='h-[200px]' onClick={() => setSelect(0)} />
                                    </div>
                                </div>
                            </div>

                            {/* Right side */}
                            <div className='w-full 800px:w-[50%] pt-5'>
                                <h1 className={`${styles.productTitle}`}>{data.name}</h1>
                                <p className=''>{data.description}</p>
                                <div className="flex pt-3">
                                    <h4 className={`${styles.productDiscountPrice}`}>{data.discount_price}$</h4>
                                    <h3 className={`${styles.price}`}>{data.price ? data.price + "$" : null}</h3>
                                </div>
                                <div className="flex items-center mt-12 justify-between pr-3">
                                    <div>
                                        <button onClick={decrementCount} className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out">
                                            -
                                        </button>
                                        <span className='bg-gray-200 text-gray-800 font-medium px-4 py-[11px]'>{count}</span>
                                        <button onClick={incrementCount} className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out">
                                            +
                                        </button>
                                    </div>
                                    <div>
                                        {click ?
                                            (<AiFillHeart size={30} className="cursor-pointer  right-2  top-5" onClick={() => setClick(!click)} color={click ? "red" : "#333"} title="Remove from wishlist" />) :
                                            (<AiOutlineHeart size={30} className="cursor-pointer  right-2 top-5" onClick={() => setClick(!click)} color={click ? "red" : "#333"} title="Add to wishlist" />)
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null
            }
        </div>
    )
}

export default ProductDetail