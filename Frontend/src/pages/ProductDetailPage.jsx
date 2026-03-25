import React, { use, useEffect, useState } from 'react'
import Header from '../components/Layout/Header';
import ProductDetail from '../components/Products/ProductDetail';
import Footer from '../components/Layout/Footer';
import { useParams, useSearchParams } from 'react-router-dom';
import SuggestedProduct from '../components/Products/SuggestedProduct'
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../redux/actions/product';


function ProductDetailPage() {
    const { allProducts } = useSelector((state) => state.product);
    const { allEvents } = useSelector((state) => state.events);
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [searchParams] = useSearchParams();
    const eventData = searchParams.get("isEvent");
    const dispatch = useDispatch();


    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);


    useEffect(() => {
        if (!allProducts || allProducts.length === 0) {
            dispatch(getAllProducts());
        }
    }, [dispatch, allProducts]);


    useEffect(() => {
        if (eventData !== null) {
            const data = allEvents && allEvents.find((i) => i._id === id);
            setData(data);
        } else {
            const data = allProducts && allProducts.find((i) => i._id === id);
            setData(data);
        }
    }, [allProducts, allEvents, eventData, id]);

    return (
        <div>
            <Header />
            {data ? (
                <>
                    <ProductDetail data={data} />
                    {!eventData && (
                        <>
                            {data && <SuggestedProduct data={data} />}
                        </>
                    )}
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