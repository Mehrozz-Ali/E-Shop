import React from 'react'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

function Rating({ rating }) {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars.push(
                <AiFillStar key={i} size={20} color='gold' className='mr-2 cursor-pointer' />
            )
        } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
            stars.push(
                <BsStarHalf key={i} size={17} color='gold' className='mr-2 cursor-pointer' />
            )
        } else {
            stars.push(
                <AiOutlineStar key={i} size={20} color='gold' className='mr-2 cursor-pointer' />
            )
        }
    }

    return (
        <div className='flex'>
            {stars}
        </div>
    )
}

export default Rating