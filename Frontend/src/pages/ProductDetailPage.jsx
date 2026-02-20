import React, { use, useEffect, useState } from 'react'
import Header from '../components/Layout/Header';
import ProductDetail from '../components/Products/ProductDetail';
import Footer from '../components/Layout/Footer';
import { useParams } from 'react-router-dom';
import SuggestedProduct from '../components/Products/SuggestedProduct'
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../redux/actions/product';


function ProductDetailPage() {
    const { allProducts } = useSelector((state) => state.product);
    const dispatch = useDispatch();

    const { id } = useParams();
    const [data, setData] = useState(null);
    // const productName = name.replace(/-/g, " ");

    useEffect(() => {
        if (!allProducts || allProducts.length === 0) {
            dispatch(getAllProducts());
        }
    }, [dispatch, allProducts]);

    useEffect(() => {
        window.scrollTo(0, 0);
    })

    useEffect(() => {
        console.log('All products:', allProducts);
        const data = allProducts && allProducts.find((i) => i._id === id);
        setData(data);
    }, [allProducts, data,id]);

    return (
        <div>
            <Header />
            {data ? (
                <>
                    <ProductDetail data={data} />
                    <SuggestedProduct data={data} />
                </>
            ) : (
                <div style={{ padding: '2rem', textAlign: 'center', color: 'red' }}>
                    Product not found or loading. Please check your product data.<br />
                    <span style={{ color: 'black' }}>Searched for: <b>{id}</b></span>
                </div>
            )}
            <Footer />
        </div>
    );
}

export default ProductDetailPage