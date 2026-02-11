import React, { useEffect, useState } from 'react'
import Header from '../components/Layout/Header';
import ProductDetail from '../components/Products/ProductDetail';
import Footer from '../components/Layout/Footer';
import { useParams } from 'react-router-dom';
import { productData } from '../static/data';
import SuggestedProduct from '../components/Products/SuggestedProduct'
import { useSelector } from 'react-redux';

function ProductDetailPage() {
    const { products } = useSelector((state) => state.product);

    const { name } = useParams();
    const [data, setData] = useState(null);
    const productName = name.replace(/-/g, " ");

    console.log(name);


    useEffect(() => {
        const data = productData.find((i) => i.name === productName);
        setData(data);
    }, [])


    return (
        <div>
            <Header />
            <ProductDetail data={data} />
            {data && <SuggestedProduct data={data} />}
            <Footer />
        </div>
    )
}

export default ProductDetailPage