import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrdersOfShop } from '../../redux/actions/order';
import styles from '../../styles/styles';

function WithDrawMoney() {

    const { orders } = useSelector((state) => state.order);
    const { seller } = useSelector((state) => state.seller);
    const dispatch = useDispatch();
    const [deliveredOrders, setDeliveredOrders] = useState(null);


    useEffect(() => {
        dispatch(getAllOrdersOfShop(seller._id));

        const orderData = orders && orders.filter((item) => item.status === "Delivered");
        setDeliveredOrders(orderData);
    }, [dispatch, orders]);

    const totalEarningWithoutTax = deliveredOrders && deliveredOrders.reduce((acc, item) => acc + item.totalPrice, 0);
    const serviceCharge = totalEarningWithoutTax * 0.1;
    const availableBalance = totalEarningWithoutTax - serviceCharge.toFixed(2);

    return (
        <div className='w-full h-[90vh] p-5  '>
            <div className="w-full bg-[#F5F5F5] h-full rounded flex items-center justify-center flex-col">
                <h5 className='text-[20px] pb-4'>Available Balance: ${availableBalance}</h5>
                <div className={`${styles.button} !rounded-[4px] text-white !h-[40px]`}>Withdraw</div>
            </div>
        </div>
    )
}

export default WithDrawMoney