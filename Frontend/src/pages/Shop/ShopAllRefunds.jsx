import React from 'react'
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader'
import DashboardSidebar from '../../components/Shop/Layout/DashboardSidebar'
import AllRefundOrders from "../../components/Shop/AllRefundOrders"


function ShopAllRefunds() {
    return (
        <div>
            <DashboardHeader />
            <div className="flex justify-between w-full">
                <div className='w-[80px] md:w-[300px]'>
                    <DashboardSidebar active={10} />
                </div>

                <div className="w-full justify-center flex">
                    <AllRefundOrders />
                </div>
            </div>
        </div>
    )
}

export default ShopAllRefunds