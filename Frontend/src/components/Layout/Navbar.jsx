import React from 'react'
import { navItems } from '../../static/data'
import { Link } from 'react-router-dom';
import styles from '../../styles/styles';

function Navbar({ active }) {
    return (
        <div className={`${styles.normalFlex}`}>
            {
                navItems && navItems.map((i, index) => (
                    <div className='flex'>
                        <Link to={i.url} className={`${active === index + 1 ? "text-[#17dd1f]" : "text-[#fff]"} font-[500] px-6 cursor-pointer`} >
                            {i.title}
                        </Link>
                    </div>
                ))
            }
        </div>
    )
}

export default Navbar