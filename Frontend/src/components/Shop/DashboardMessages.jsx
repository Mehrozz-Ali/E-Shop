import React from 'react'

function DashboardMessages() {
    return (
        <div className='w-[90%] bg-[#f5f5f5] m-5 h-[85vh] overflow-y-scroll rounded'>
            <h1 className='text-center text-[30px] font-poppins py-3'>All Messages</h1>

            {/* All messages list */}
            <div className="w-full flex p-1 px-3 my-3 bg-[#00000010]">
                <img src="http://localhost:8000/rock-1775801409015-335925793.png" alt="" className='w-[50px] h-[50px] rounded-full' />
                <div className='pl-3'>
                    <h1 className='text-[18px]'>Rameez Ali</h1>
                    <p className='text-[14px] text-[#000c]'>Yeah I am good </p>
                </div>
            </div>
        </div>
    )
}

export default DashboardMessages