import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import styles from '../../styles/styles';
import { AiOutlineHeart, AiFillHeart, AiOutlineMessage } from 'react-icons/ai';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { backend_url } from '../../server';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProductsShop } from '../../redux/actions/product';

function ProductDetail({ data }) {
    const [count, setCount] = useState(1);
    const [click, setClick] = useState(false);
    const [select, setSelect] = useState(0);
    const navigate = useNavigate();


    const { products } = useSelector((state) => state.product);
    const dispatch = useDispatch();
    useEffect(() => {
        if (data?._id) {
            dispatch(getAllProductsShop(data.shop._id));
        }
    }, [dispatch, data?.shop?._id]);


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
                <div className={`${styles.section} w-[90%] md:w-[80%] `}>
                    <div className='w-full py-5'>
                        <div className="flex  w-full md:flex">
                            {/* Left side */}
                            <div className="w-full md:w-[50%]">
                                <img src={`${backend_url}${data.images && data.images[select]}`} alt="product" />
                                <div className="w-full flex gap-2">
                                    {
                                        data && data.images && data.images.map((i, index) => (
                                            <div key={index} className={`${select === index ? "border" : "null"} cursor-pointer`}>
                                                <img src={`${backend_url}${i}`} alt={`image ${index}`} className='w-[200px] h-[200px] overflow-hidden mr-3 mt-3' onClick={() => setSelect(index)} />
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>

                            {/* Right side */}
                            <div className='w-full md:w-[50%] pt-5 pl-4'>
                                <h1 className={`${styles.productTitle}`}>{data.name}</h1>
                                <p className=''>{data.description}</p>
                                <div className="flex pt-3">
                                    <h4 className={`${styles.productDiscountPrice}`}>{data.discountPrice}$</h4>
                                    <h3 className={`${styles.price}`}>{data.originalPrice ? data.originalPrice + "$" : null}</h3>
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
                                <div className={`${styles.button} !mt-6 !rounded !h-11 flex items-center`}>
                                    <span className='text-white flex items-center'>Add to Cart<AiOutlineShoppingCart className="ml-1" /></span>
                                </div>
                                <div className="flex items-center pt-8">
                                    <img src={`${backend_url}${data.shop.avatar?.url}`} alt="image " className='w-[50px] h-[50px] rounded-full mr-2' />
                                    <div className='pr-8 '>
                                        <h3 className={`${styles.shop_name} pb-1 pt-1`}>{data?.shop?.name}</h3>
                                        <h5 className='pb-3 text-[15px]'>[4/5] Ratings</h5>
                                    </div>
                                    <div className={`${styles.button} !bg-[#6443d1] mt-4 !rounded !h-11`} onClick={handleMessageSubmit}>
                                        <span className='text-white flex items-center'>Send Message<AiOutlineMessage className='ml-1' /> </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <ProductDetailsInfo data={data} products={products} />
                    <br />
                    <br />
                </div>
            ) : null
            }
        </div>
    )
}



const ProductDetailsInfo = ({ data, products }) => {
    const [active, setActive] = useState(1);
    return (
        <div className='bg-[#f5f6fb] px-3 800px:px-10 py-2 rounded'>
            <div className="w-full flex justify-between border-b pt-10 pb-2">
                <div className="relative">
                    <h5 className={`text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px`} onClick={() => setActive(1)}>Product Details</h5>
                    {active === 1 ? (
                        <div className={`${styles.active_indicator}`}></div>
                    ) : null}
                </div>
                <div className="relative">
                    <h5 className={`text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px`} onClick={() => setActive(2)}>Product Reviews</h5>
                    {active === 2 ? (
                        <div className={`${styles.active_indicator}`}></div>
                    ) : null}
                </div>
                <div className="relative">
                    <h5 className={`text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px`} onClick={() => setActive(3)}>Seller Information</h5>
                    {active === 3 ? (
                        <div className={`${styles.active_indicator}`}></div>
                    ) : null}
                </div>
            </div>
            {active === 1 ? (
                <>
                    <p className='py-2 text-[18px] leading-8 pb-10 whitespace-pre-line text-justify'>{data.description}</p>
                </>
            ) : null}
            {active === 2 ? (
                <div className='w-full justify-center min-h-[40vh] flex items-center'>
                    <p>No Reviews yet</p>
                </div>
            ) : null}
            {
                active === 3 && (
                    <div className='w-full flex md:flex p-5'>
                        {/* Left side  */}
                        <div className="w-full md:w-[50%]">
                            <Link to={`/shop/${data.shop._id}`}>
                                <div className="flex items-center">
                                    <img
                                        src={data?.shop?.avatar?.url ? `${backend_url}${data.shop.avatar.url}` : ""}
                                        alt="shop"
                                        className='w-[50px] h-[50px] rounded-full mr-2'
                                    />
                                    <div className='pl-3'>
                                        <h3 className={`${styles.shop_name}`}>{data?.shop?.name}</h3>
                                        <h5 className='pb-2 text-[15px]'>[4/5] Rating</h5>
                                    </div>
                                </div>
                            </Link>
                            <p className='pt-2 text-base sm:text-sm md:text-base lg:text-lg max-w-full break-words leading-relaxed"' >{data?.shop?.description}</p>
                        </div>

                        {/* Right side  */}
                        <div className="w-full md:w-[50%] mt-5 md:mt-0 flex flex-col items-end">
                            <div className="text-left">
                                <h5 className='font-[600]'>Join on: <span className='font-[500]'>{data?.shop?.createdAt ? new Date(data.shop.createdAt).toLocaleDateString() : "N/A"}</span></h5>
                                <h5 className='font-[600] pt-3'>Total Products: <span className='font-[500]'>{products && products.length}</span></h5>
                                <h5 className='font-[600] pt-3'>Total Reviews: <span className='font-[500]'>324</span></h5>
                                <Link to="/">
                                    <div className={`${styles.button} !rounded-[4px] !h-[39.5px] mt-3`}>
                                        <h4 className='text-white '> Visit Shop</h4>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default ProductDetail