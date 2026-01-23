import React from 'react';
import { useSelector } from 'react-redux';
import { backend_url } from '../../server';


function ProfileContent({ active }) {
    const { user } = useSelector((state) => state.user);
    return (
        <div className='w-full'>
            {active === 1 && (
                <div className='flex justify-center w-full '>
                    <div className="relative">
                        <img src={`${backend_url}${user?.avatar?.url}`} alt="" className="w-[35px] h-[35px] rounded-full" />
                    </div>
                </div>
            )}
        </div>
    )
}

export default ProfileContent