import { RxCross1 } from 'react-icons/rx';
import styles from '../../styles/styles';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BsCartPlus } from 'react-icons/bs';
import { AiOutlineHeart } from 'react-icons/ai';

function WishList({ setOpenWishList }) {
    const cartData = [
        {
            name: "Iphone 14 Pro Max 256 gb and 8gb ram silver color",
            description: "test",
            price: 999
        },
        {
            name: "Iphone 14 Pro Max 256 gb and 8gb ram silver color",
            description: "test",
            price: 300,
        },
        {
            name: "Iphone 14 Pro Max 256 gb and 8gb ram silver color",
            description: "test",
            price: 600,
        },
    ]
    return (
        <div className='fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10'>
            <div className="fixed top-0 right-0 min-h-full w-[25%] bg-white flex flex-col justify-between shadow-sm">
                <div>
                    <div className="flex w-full justify-end pt-5 pr-5">
                        <RxCross1 size={25} className='cursor-pointer' onClick={() => setOpenWishList(false)} />
                    </div>
                    {/* Items length  */}
                    <div className={`${styles.normalFlex} p-4`}>
                        <AiOutlineHeart size={25} />
                        <h5 className='pl-2 text-[20px] font-[500]'>3 items </h5>
                    </div>

                    {/* cart single item */}
                    <br />
                    <div className='w-full border-t'>
                        {cartData && cartData.map((i, index) => (
                            <CartSingle key={index} data={i} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

const CartSingle = ({ data }) => {
    const [value, setValue] = useState(1);
    const totalPrice = data.price * value;

    return (
        <div className="border-b p-4 ">
            <div className="w-full flex items-center">
                <RxCross1 className='cursor-pointer' />
                <img src="https://bonik-react.vercel.app/assets/images/products/Fashion/Clothes/1.SilverHighNeckSweater.png" alt="image" className='w-[80px] h-[80px] ml-2' />

                <div className='pl-[5px]'>
                    <h1>{data.name}</h1>
                    <h4 className='font-[400] text-[15px] text-[#00000082]'>${data.price}*{value}</h4>
                    <h4 className='font-[600] text-[17px] pt-[3px] text-[#d02222] font-Roboto'>US${totalPrice}</h4>
                </div>

                <div>
                    <BsCartPlus size={20} className="cursor-pointer" title="Add to cart" />
                </div>
            </div>
        </div>
    )
}





export default WishList