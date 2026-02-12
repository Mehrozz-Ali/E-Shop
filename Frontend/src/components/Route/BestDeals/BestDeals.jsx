import React from 'react'
import { useState, useEffect } from 'react';
import { productData } from '../../../static/data';
import styles from '../../../styles/styles'
import ProductCard from '../ProductCard/ProductCard'
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../../../redux/actions/product';
import axios from 'axios';

function BestDeals() {

    const [products, setProducts] = useState([]);

    // Fetch all products from all shops
    useEffect(() => {
        axios.get("http://localhost:8000/api/v2/product/get-all-products")
            .then(res => {
                const topPriced = res.data.products
                    .sort((a, b) => Number(b.originalPrice) - Number(a.originalPrice)) // convert to number
                    .slice(0, 10);
                setProducts(topPriced);
            })
            .catch(err => console.log(err));
    }, []);

    const sortedProducts = products;
    return (
        <div>
            <div className={`${styles.section}`}>
                <div className={`${styles.heading}`}>
                    <h1>Best Deals</h1>
                </div>
                <div className='grid grid-cols-l gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0 '>
                    {sortedProducts?.length > 0 ? (
                        sortedProducts.map((i) => (
                            <ProductCard data={i} key={i._id} />
                        ))
                    ) : (
                        <h2>No Products Found</h2>
                    )}

                </div>
            </div>
        </div>
    )
}

export default BestDeals