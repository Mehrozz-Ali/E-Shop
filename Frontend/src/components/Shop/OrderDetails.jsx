import React from 'react'
import styles from '../../styles/styles'
import { BsFillBagFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'

function OrderDetails() {
    return (
        <div className={`py-4 min-h-screen ${styles.section}`}>
            <div className="w-full flex items-center justify-between">
                <div className="flex items-cente">
                    <BsFillBagFill size={30} color='crimson' />
                    <h1 className="pl-2 text-[25px]">Order Details</h1>
                </div>
                <Link to="/dashboard-orders">
                    <div className={`${styles.button} !bg-[#fce1e6] !rounded-[4px] text-[#e94560] font-[600] !h-[45px] text-[18px]`}>
                        Order List
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default OrderDetails