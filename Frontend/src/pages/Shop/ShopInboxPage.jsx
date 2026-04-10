import React from 'react'
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader'
import DashboardSidebar from '../../components/Shop/Layout/DashboardSidebar'
import DashboardMessages from '../../components/Shop/DashboardMessages';

function ShopInboxPage() {
    return (
        <div>
            <DashboardHeader />
            <div className="flex items-start justify-between w-full">
                <div className='w-[80px] md:w-[300px]'>
                    <DashboardSidebar active={8} />
                </div>
                {/* <DashboardHero /> */}
                {<DashboardMessages />}
            </div>
        </div>
    )
}

export default ShopInboxPage