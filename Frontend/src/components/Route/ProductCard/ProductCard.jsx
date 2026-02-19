import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import styles from '../../../styles/styles';
import { AiFillStar, AiOutlineStar, AiFillHeart, AiOutlineHeart, AiOutlineEye, AiOutlineShoppingCart } from 'react-icons/ai';
import ProductDetailCard from '../ProductDetailCard/ProductDetailCard';
import { backend_url } from '../../../server';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist, removeFromWishlist } from '../../../redux/actions/wishlist';


function ProductCard({ data }) {
  const { wishlist } = useSelector((state) => state.wishlist);
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const d = data.name;
  const product_name = d.replace(/\s+/g, "-");

  useEffect(() => {
    if (wishlist && wishlist.find((i) => i._id === data._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist])


  const removeFromWishlistHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishlist(data));
  }

  const addToWishlistHandler = (data) => {
    setClick(!click);
    dispatch(addToWishlist(data));
  }

  console.log(wishlist);


  return (
    <>
      <div className='w-full h-[370px] bg-white rounded-lg shadow-sm p-3 relative cursor-pointer'>
        <div className='flex justify-end'>
        </div>
        <Link to={`/product/${product_name}`}>
          <img src={data.images && data.images[0] ? `${backend_url}/${data.images[0]}` : 'fallback-image-url'} alt="image" className='w-full h-[170px] object-contain' />
        </Link>
        <Link to={`/shop/preview/${data.shop._id}`}>
          <h5 className={`${styles.shop_name}`}>{data.shop.name}</h5>
        </Link>
        <Link to={`/product/${product_name}`}>
          <h4 className='pb-3 font-[500]'>{data.name.length > 40 ? data.name.slice(0, 40) + "..." : data.name}</h4>
          <div className="flex">
            <AiFillStar size={20} className='mr-2 cursor-pointer' color="#f6BA00" />
            <AiFillStar size={20} className='mr-2 cursor-pointer' color="#f6BA00" />
            <AiFillStar size={20} className='mr-2 cursor-pointer' color="#f6BA00" />
            <AiFillStar size={20} className='mr-2 cursor-pointer' color="#f6BA00" />
            <AiOutlineStar size={20} className='mr-2 cursor-pointer' color="#f6BA00" />
          </div>
          <div className='py-2 flex items-center justify-between'>
            <div className='flex'>
              <h5 className={`${styles.productDiscountPrice}`}>
                ${data.discountPrice === 0 ? data.price : data.discountPrice}
              </h5>
              <h4 className={`${styles.price}`}>
                {data.originalPrice ? data.originalPrice + " $" : null}
              </h4>
            </div>
            <span className='font-[400] text-[17px] text-[#6Bd284]'>{data.sold_out} sold</span>
          </div>
        </Link>
        {/* Side options */}
        <div>{click ?
          (< AiFillHeart size={22} className="cursor-pointer absolute right-2  top-5" onClick={() => removeFromWishlistHandler(data)} color={click ? "red" : "#333"} title="Remove from wishlist" />) :
          (<AiOutlineHeart size={22} className="cursor-pointer absolute right-2 top-5" onClick={() => addToWishlistHandler(data)} color={click ? "red" : "#333"} title="Add to wishlist" />)
        }
          <AiOutlineEye size={22} className="cursor-pointer absolute right-2  top-14" onClick={() => setOpen(!open)} color="#333" title="Quick view" />
          <AiOutlineShoppingCart size={22} className="cursor-pointer absolute right-2 top-24" onClick={() => setOpen(!open)} color="#444" title="Add to cart" />
          {open ?
            (<ProductDetailCard open={open} setOpen={setOpen} data={data} />) : null
          }
        </div>
      </div>
    </>
  )
}

export default ProductCard