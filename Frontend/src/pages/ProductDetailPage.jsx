import React, { useEffect, useState } from 'react'
import Header from '../components/Layout/Header';
import ProductDetail from '../components/Products/ProductDetail';
import Footer from '../components/Layout/Footer';
import { useParams } from 'react-router-dom';
import SuggestedProduct from '../components/Products/SuggestedProduct'
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../redux/actions/product';


function ProductDetailPage() {
    const { products } = useSelector((state) => state.product);
    const dispatch = useDispatch();

    const { name } = useParams();
    const [data, setData] = useState(null);
    const productName = name.replace(/-/g, " ");

    useEffect(() => {
        if (!products || products.length === 0) {
            dispatch(getAllProducts());
        }
    }, [dispatch, products]);

    useEffect(() => {
        console.log('All products:', products);
        const found = products.find(
            (i) => i.name && i.name.trim().toLowerCase() === productName.trim().toLowerCase()
        );
        setData(found);
    }, [products, productName]);

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
                    <span style={{ color: 'black' }}>Searched for: <b>{productName}</b></span>
                </div>
            )}
            <Footer />
        </div>
    );
}

export default ProductDetailPage