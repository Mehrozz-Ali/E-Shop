import React, { useEffect } from 'react'
import ShopCreate from '../components/ShopCreate/ShopCreate.jsx'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ShopCreatePage() {
  const { seller, isSeller } = useSelector((state) => state.seller);
  const navigate = useNavigate();
  useEffect(() => {
    if (isSeller === true) {
      navigate(`/shop/${seller._id}`);
    }
  }, [])
  return (
    <div>
      <ShopCreate />
    </div>
  )
}

export default ShopCreatePage