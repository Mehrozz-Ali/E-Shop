import React from 'react'
import styles from '../../../styles/styles'

function Sponsored() {
    return (
        <div className={`${styles.section} sm:block bg-white py-10 px-5 mb-12 cursor-pointer rounded-xl  shadow-sm`}>
            <div className="flex justify-between w-full">
                <div className="flex items-start">
                    <img src="https://logos-world.net/wp-content/uploads/2020/04/Amazon-Logo.png" style={{ width: "150px", objectFit: "contain" }} alt="" />
                </div>
                <div className="flex items-start">
                    <img src="https://logos-world.net/wp-content/uploads/2020/08/Dell-Logo-1989-2016.png" style={{ width: "150px", objectFit: "contain" }} alt="" />
                </div>
                <div className="flex items-start">
                    <img src="https://logos-world.net/wp-content/uploads/2020/04/Amazon-Logo.png" style={{ width: "150px", objectFit: "contain" }} alt="" />
                </div>
                <div className="flex items-start">
                    <img src="https://logos-world.net/wp-content/uploads/2020/08/Dell-Logo-1989-2016.png" style={{ width: "150px", objectFit: "contain" }} alt="" />
                </div>
                <div className="flex items-start">
                    <img src="https://logos-world.net/wp-content/uploads/2020/04/Amazon-Logo.png" style={{ width: "150px", objectFit: "contain" }} alt="" />
                </div>
            </div>
        </div>
    )
}

export default Sponsored