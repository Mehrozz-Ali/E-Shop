import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react'
import { AiOutlineDelete, AiOutlineEye } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, getAllProductsShop } from '../../redux/actions/product';
import Loader from '../Layout/Loader';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import styles from '../../styles/styles';
import { RxCross1 } from 'react-icons/rx';
import { server } from '../../server';
import axios from 'axios';
import { toast } from 'react-toastify';



function AllCoupons() {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [value, setValue] = useState(null);
    const [minAmount, setMinAmount] = useState(null);
    const [maxAmount, setMaxAmount] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [coupons, setCoupons] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const { seller } = useSelector((state) => state.seller);
    const { products } = useSelector((state) => state.products);
    const dispatch = useDispatch();




    useEffect(() => {
        setIsLoading(true);
        axios.get(`${server}/coupon/get-coupon/${seller._id}`, { withCredentials: true }).then((res) => {
            setIsLoading(false);
            console.log(res.data);
            setCoupons(res.data);
        }).catch((error) => {
            setIsLoading(false);
            toast.error(error.response.data.message);
        });
    }, [dispatch, seller._id]);



    const handleDelete = (id) => {
        dispatch(deleteProduct(id));
        window.location.reload();
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post(`${server}/coupon/create-coupon-code`, { name, minAmount, maxAmount, selectedProducts, value, shop: seller }, { withCredentials: true }).then((res) => {
            toast.success("Coupon created successfully!");
            setOpen(false);
            window.location.reload();
        }).catch((error) => {
            toast.error(error.response.data.message);
        })
    }



    const columns = [
        { field: "id", headerName: "Product ID", minWidth: 150, flex: 0.7 },
        { field: "name", headerName: "Name", minWidth: 150, flex: 0.7 },
        { field: "price", headerName: "Price", minWidth: 150, flex: 0.7 },
        // {
        //     field: "Preview", headerName: "", minWidth: 100, flex: 0.8, type: "number", sortable: false, renderCell: (params) => {
        //         const d = params.row.name;
        //         const product_name = d.replace(/\s+/g, "-");
        //         return (
        //             <>
        //                 <Link to={`/product/${product_name}`}>
        //                     <Button><AiOutlineEye size={20} /></Button>
        //                 </Link>
        //             </>
        //         )
        //     }
        // },
        {
            field: "Delete", headerName: "", minWidth: 100, flex: 0.8, type: "number", sortable: false, renderCell: (params) => {
                const d = params.row.name;
                const product_name = d.replace(/\s+/g, "-");
                return (
                    <>
                        <Link to={`/product/${product_name}`}>
                            <Button onClick={() => handleDelete(params.id)}><AiOutlineDelete size={20} /></Button>
                        </Link>
                    </>
                )
            }
        },
    ]

    const row = [];
    coupons && coupons.forEach((item) => {
        row.push({
            id: item._id,
            name: item.name,
            price: item.value + "%",
            sold: 10,
        })
    })

    return (
        <>
            {
                isLoading ? (
                    <Loader />
                ) : (
                    <div className='w-full mx-8 pt-1 mt-1 bg-white'>
                        <div className="w-full flex justify-end ">
                            <div className={`${styles.button} !w-max !rounded-[5px] !h-[45px] px-3 mr-3 mb-3`} onClick={() => setOpen(true)}>
                                <span className='text-white'>Create Coupon Code</span>
                            </div>
                        </div>
                        <DataGrid rows={row} columns={columns} pageSize={10} disableSelectionOnClick autoHeight />
                        {open && (
                            <div className="fixed top-0 left-0 w-full h-screen bg-[#00000062] z-[2000] flex items-center justify-center">
                                <div className='w-[90%] md:w-[40%] h-[95vh] bg-white rounded-md shadow p-4'>
                                    <div className="w-full flex justify-end">
                                        <RxCross1 size={30} className='cursor-pointer' onClick={() => setOpen(false)} />
                                    </div>
                                    <h5 className='text-[30px] font-poppins text-center'>Create Coupon Code</h5>
                                    {/* create coupon code  */}
                                    <form onSubmit={handleSubmit} aria-required={true}>
                                        <div>
                                            <label className='pb-2'>Name <span className='text-red-500'>*</span></label>
                                            <input type="text" required name='name' value={name} onChange={(e) => setName(e.target.value)} className=' mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm' placeholder='Enter your Coupon code name...' />
                                        </div>
                                        <br />
                                        <div>
                                            <label className='pb-2'>Discount Percentage <span className='text-red-500'>*</span></label>
                                            <input type="text" required name='value' value={value} onChange={(e) => setValue(e.target.value)} className=' mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm' placeholder='Enter your Coupon code value...' />
                                        </div>
                                        <br />
                                        <div>
                                            <label className='pb-2'>Min Amount</label>
                                            <input type="text" name='minAmount' value={minAmount} onChange={(e) => setMinAmount(e.target.value)} className=' mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm' placeholder='Enter your Coupon code minimum amount...' />
                                        </div>
                                        <br />
                                        <div>
                                            <label className='pb-2'>Max Amount</label>
                                            <input type="text" name='maxAmount' value={maxAmount} onChange={(e) => setMaxAmount(e.target.value)} className=' mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm' placeholder='Enter your Coupon code maximum amount...' />
                                        </div>
                                        <br />
                                        <div>
                                            <label className='pb-2'>Selected Product</label>
                                            <select className='w-full mt-2 border h-[35px] rounded-[5px]' value={selectedProducts} onChange={(e) => setSelectedProducts(e.target.value)}>
                                                <option value="">Choose a selected product</option>
                                                {products && products.map((i) => (
                                                    <option value={i.name} key={i.name}>{i.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <br />
                                        <div>
                                            <input type="submit" value="Create Coupon" className=' mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm' />
                                        </div>


                                    </form>
                                </div>
                            </div>
                        )}
                    </div>
                )
            }
        </>
    )
}

export default AllCoupons