import React, { useState } from 'react'
import ProductCard from '../Route/ProductCard/ProductCard';
import { productData } from '../../static/data';
import { Link, useParams } from 'react-router-dom';
import styles from '../../styles/styles';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProductsShop } from '../../redux/actions/product';
import { backend_url } from '../../server';
import Rating from "../Products/Rating";
import { getAllEventsShop } from '../../redux/actions/event';

function ShopProfileData({ isOwner }) {
  const { products } = useSelector((state) => state.product);
  const { events } = useSelector((state) => state.events);
  const { seller } = useSelector((state) => state.seller);
  const { id } = useParams();
  const dispatch = useDispatch();
  const [active, setActive] = useState(1);


  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalItems = active === 1 ? products?.length : events?.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);



  const getPaginatedData = (data) => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return data.slice(indexOfFirstItem, indexOfLastItem);
  };


  useEffect(() => {
    dispatch(getAllProductsShop(id));
    dispatch(getAllEventsShop(seller._id));
    setCurrentPage(1);

  }, [dispatch, id, seller._id, active]);


  // flat convert nested array into a single array 
  const allReviews = products && products.map((product) => product.reviews).flat();


  return (
    <div className='w-full'>
      <div className="w-full flex items-center justify-between ">

        <div className='w-full flex'>
          <div className="flex items-center" onClick={() => setActive(1)}>
            <h5 className={`font-[600] text-[20px] ${active === 1 ? 'text-red-500' : 'text-[#333]'} cursor-pointer  pr-[15px]`}>Shop Products</h5>
          </div>

          <div className="flex items-center" onClick={() => setActive(2)}>
            <h5 className={`font-[600] text-[20px] ${active === 2 ? 'text-red-500' : 'text-[#333]'} cursor-pointer  pr-[15px]`}>Running Events </h5>
          </div>

          <div className="flex items-center" onClick={() => setActive(3)}>
            <h5 className={`font-[600] text-[20px] ${active === 3 ? 'text-red-500' : 'text-[#333]'} cursor-pointer  pr-[15px]`}>Shop Reviews</h5>
          </div>
        </div>

        <div>
          {
            isOwner && (
              <div>
                <Link to="/dashboard">
                  <div className={`${styles.button} !rounded-[4px] !h-[42px]`}>
                    <span className='text-[#fff]'>Go Dashboard</span>
                  </div>
                </Link>
              </div>
            )
          }
        </div>

      </div>

      <br />
      {
        active === 1 && (
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[20px] xl:grid-cols-3 xl:gap-[20px] mb-12 border-0">
            {/* {products && products.map((i, index) => (
              <ProductCard key={index} data={i} isShop={true} />
            ))} */}

            {
              getPaginatedData(products || []).map((i, index) => (
                <ProductCard key={index} data={i} isShop={true} />
              ))
            }

          </div>
        )
      }

      {
        active === 2 && (
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[20px] xl:grid-cols-3 xl:gap-[20px] mb-12 border-0">
            {/* {events && events.map((i, index) => (
              <ProductCard key={index} data={i} isShop={true} isEvent={true} />
            ))} */}

            {
              getPaginatedData(events || []).map((i, index) => (
                <ProductCard key={index} data={i} isShop={true} isEvent={true} />
              ))

            }
          </div>
        )
      }

      {
        active === 3 && (
          <div className="w-full">
            {allReviews && allReviews.map((item, index) => (
              <div className="w-full flex my-4">
                <img src={`${backend_url}/${item.user?.avatar?.url}`} alt="image" className='w-[50px] h-[50px] rounded-full' />
                <div className='pl-3'>
                  <div className="w-full flex items-center">
                    <h1 className='font-[600] pr-2'>{item.user?.name}</h1>
                    <Rating rating={item.rating} />
                  </div>
                  <p className='font-[400] text-[#000000cb]'>{item.comment}</p>
                  <p className='text-[#0000009a] text-[14px]'>{'2 days ago'}</p>
                </div>
              </div>
            ))}
          </div>
        )
      }

      {
        products && products.length === 0 && (
          <h5 className='w-full text-ccenter py-5 text-[18px]'>No Products have for this shop!</h5>
        )
      }

      {
        (active === 1 || active === 2) && (
          <div className="flex justify-center mt-4">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`mx-1 px-3 py-1 border ${currentPage === index + 1 ? "bg-black text-white" : "bg-gray-200"
                  }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        )
      }



    </div>
  )
}

export default ShopProfileData