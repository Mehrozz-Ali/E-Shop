import React from 'react'
import Lottie from 'react-lottie';
import animationData from '../../Assets/Animation/Shopping Cart Loader.json'

function Loader() {
    const defaultOptions = {
        loop: false,
        autoplay: true,
        animationData: animationData,
        renderSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    }
    return (
        <div className='w-full h-screen flex items-center justify-center'>
            <Lottie options={defaultOptions} height={300} width={300} />
        </div>
    )
}

export default Loader