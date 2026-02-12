import React from 'react'
// import { productData } from '../../../static/data';
import styles from '../../../styles/styles'
import ProductCard from '../ProductCard/ProductCard'
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../../../redux/actions/product';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';

function FeaturedProduct() {
    const [shopId, setShopId] = useState("");
    const [data, setData] = useState([]);

    // Get logged-in seller's shopId
    useEffect(() => {
        axios.get("http://localhost:8000/api/v2/shop/getSeller", { withCredentials: true })
            .then(res => setShopId(res.data.seller._id))
            .catch(err => console.log(err));
    }, []);

    // Fetch seller-specific products
    useEffect(() => {
        if (!shopId) return;
        axios.get(`http://localhost:8000/api/v2/product/get-all-products-shop/${shopId}`)
            .then(res => setData(res.data.products))
            .catch(err => console.log(err));
    }, [shopId]);

    return (
        <div>
            <div className={`${styles.section}`}>
                <div className={`${styles.heading}`}>
                    <h1>Featured Products</h1>
                </div>
                <div className='grid grid-cols-l gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0 '>
                    {data && data.map((i, index) => <ProductCard data={i} key={index} />)}
                </div>
            </div>
        </div>
    )
}

export default FeaturedProduct