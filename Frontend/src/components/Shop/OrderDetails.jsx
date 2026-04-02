import React, { useEffect, useState } from 'react'
import styles from '../../styles/styles'
import { BsFillBagFill } from 'react-icons/bs'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrdersOfShop } from '../../redux/actions/order';
import { backend_url } from '../../server';

function OrderDetails() {
    const { orders, isLoading } = useSelector((state) => state.order);
    const { seller } = useSelector((state) => state.seller);
    const dispatch = useDispatch();
    const { status, setStatus } = useState("");
    const { id } = useParams();


    useEffect(() => {
        dispatch(getAllOrdersOfShop(seller._id))
    }, [dispatch, seller._id])

    const orderUpdateHandle = (e) => {

    }

    const data = orders && orders.find((item) => item._id === id);

    return (
        <div className={`py-4 min-h-screen ${styles.section}`}>
            <div className="w-full flex items-center justify-between">
                <div className="flex items-center">
                    <BsFillBagFill size={30} color='crimson' />
                    <h1 className="pl-2 text-[25px]">Order Details</h1>
                </div>
                <Link to="/dashboard-orders">
                    <div className={`${styles.button} !bg-[#fce1e6] !rounded-[4px] text-[#e94560] font-[600] !h-[45px] text-[18px]`}>
                        Order List
                    </div>
                </Link>
            </div>

            <div className="w-full flex items-center justify-between  pt-6 ">
                <h5 className='text-[#000000]'>Order ID: <span>#{data?._id?.slice(0, 8)}</span></h5>
                <h5 className='text-[#000000]'>Placed on: <span>{data?.createdAt ? data.createdAt.slice(0, 10) : "N/A"}</span></h5>
            </div>


            {/* order items  */}
            <br />
            <br />

            {data && data?.cart.map((item, index) => (
                <div className='w-full flex items-start mb-5'>
                    <img src={`${backend_url}/${item.images[0]}`} alt="" className='w-[80px] h-[80px] ' />
                    <div className='w-full text-[#000000]'>
                        <h5 className='pl-3 text-[20px] '>{item?.name}</h5>
                        <h5 className='pl-3 text-[20px] '>US$ {item?.discountPrice} * {item?.qty}</h5>
                    </div>
                </div>
            ))}

            <div className="border-t w-full text-right ">
                <h5 className='pt-3 text-[18px]'>Total Price: <strong>US${data?.totalPrice}</strong></h5>
            </div>
            <br />
            <br />
            <div className="w-full md:flex items-center ">
                <div className="w-full md:w-[60%]">
                    <h4 className='pt-3 text-[20px] font-[600]'>Shipping Address:</h4>
                    <h4 className='pt-3 text-[20px]'>{data?.shippingAddress.address1} <br />{data?.shippingAddress.address2}</h4>
                    <h4 className='pt-3 text-[20px]'>{data?.shippingAddress.country}</h4>
                    <h4 className='pt-3 text-[20px]'>{data?.shippingAddress.city}</h4>
                    <h4 className='pt-3 text-[20px]'>{data?.user?.phoneNumber}</h4>

                </div>

                <div className="w-full md:w-[40%]">
                    <h4 className='pt-2 text-[20px]'>Payement Info: {data?.paymentInfo?.type}</h4>
                    <h4 className='pt-2 text-[20px]'>Status: {data?.status}</h4>
                </div>
            </div>
            <br />
            <br />
            <h4 className='pt-3 text-[20px] font-[600]'>Order status:</h4>
            <select className='w-[200px] mt-2 border h-[35px] rounded-[5px]' value={status} onChange={(e) => setStatus(e.target.value)}>
                {
                    [
                        "Processing",
                        "Transferred to delivery partner",
                        "Shipping",
                        "Received",
                        "On the way",
                        "Delivered"
                    ].slice(
                        [
                            "Processing",
                            "Transferred to delivery partner",
                            "Shipping",
                            "Received",
                            "On the way",
                            "Delivered"
                        ].indexOf(data?.status)
                    ).map((option, index) => (
                        <option value={option} key={index}>{option}</option>
                    ))
                }
            </select>
            <div className={`${styles.button} mt-5 !bg-[#fCE1E6] !rounded-[4px] text-[#E94560] font-[600] !h-[45px] text-[18px]`} onClick={orderUpdateHandle}>Update Status</div>
        </div>
    )
}

export default OrderDetails