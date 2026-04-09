import React from 'react'
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader'
import DashboardSidebar from '../../components/Shop/Layout/DashboardSidebar';
import DashboardHero from '../../components/Shop/DashboardHero.jsx'

function ShopDashboardPage() {
    return (
        <div>
            <DashboardHeader />
            <div className="flex items-start justify-between w-full">
                <div className='w-[80px] md:w-[300px]'>
                    <DashboardSidebar active={1} />
                </div>
                <DashboardHero />
            </div>
        </div>
    )
}

export default ShopDashboardPage