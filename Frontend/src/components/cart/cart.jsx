import { RxCross1 } from 'react-icons/rx';
import { IoBagHandleOutline } from 'react-icons/io5';
import styles from '../../styles/styles';
import { useState } from 'react';
import { HiPlus } from 'react-icons/hi';

function cart({ setOpenCart }) {
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
                        <RxCross1 size={25} className='cursor-pointer' onClick={() => setOpenCart(false)} />
                    </div>
                    {/* Items length  */}
                    <div className={`${styles.normalFlex} p-4`}>
                        <IoBagHandleOutline size={25} />
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
                <div>
                    <div className={`bg-[#e44343] border border-[#e4434373] rounded-full w-[25px] h-[25px] ${styles.normalFlex} justify-center cursor-pointer`} onClick={() => setValue(value + 1)}>
                        <HiPlus size={18} color="white" />
                    </div>
                </div>
            </div>
        </div>
    )
}





export default cart