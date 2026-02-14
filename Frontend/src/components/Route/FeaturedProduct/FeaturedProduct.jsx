import React from 'react'
import { useSelector } from 'react-redux';
import styles from '../../../styles/styles'
import ProductCard from '../ProductCard/ProductCard'

function FeaturedProduct() {
    const { allProducts } = useSelector((state) => state.product);
    // Sort and slice top 5 by originalPrice
    const topProducts = allProducts
        .slice()
        .sort((a, b) => Number(b.originalPrice) - Number(a.originalPrice))
        .slice(0, 5);
    return (
        <div>
            <div className={`${styles.section}`}>
                <div className={`${styles.heading}`}>
                    <h1>Featured Products</h1>
                </div>
                <div className='grid grid-cols-l gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0 '>
                    {topProducts && topProducts.map((i, index) => <ProductCard data={i} key={i._id || index} />)}
                </div>
            </div>
        </div>
    )
}

export default FeaturedProduct