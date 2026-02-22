import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { backend_url } from '../../server';
import { AiOutlineCamera, AiOutlineDelete } from 'react-icons/ai';
import { MdOutlineTrackChanges } from 'react-icons/md';
import styles from '../../styles/styles';
import { Link } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { Button } from '@mui/material';
import { updatedUserInformation } from '../../redux/actions/user';

function ProfileContent({ active }) {
    const { user } = useSelector((state) => state.user);
    const [name, setName] = useState(user && user.name);
    const [email, setEmail] = useState(user && user.email);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updatedUserInformation(name, email, password, phoneNumber));

    }

    return (
        <div className='w-full h-[550px] '>
            {/* profile  */}
            {active === 1 && (
                <>
                    <div className='flex justify-center w-full  '>
                        <div className="relative">
                            <img src={`${backend_url}${user?.avatar?.url}`} alt="image" className="w-[150px] h-[150px] rounded-full border-[3px] border-[#3ad132] object-cover " />
                            <div className='w-[30px] h-[30px] bg-[#f3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]'>
                                <AiOutlineCamera />
                            </div>
                        </div>
                    </div>
                    <br />
                    <br />

                    <div className="w-full px-5">
                        <form onSubmit={handleSubmit} aria-required={true}>
                            <div className="w-full flex pb-3 flex-wrap">
                                <div className='w-full md:w-[50%]'>
                                    <label className='block pb-2'>Full Name</label>
                                    <input type="text" className={`${styles.input} w-full md:!w-[95%]`} required value={name} onChange={(e) => setName(e.target.value)} />
                                </div>
                                <div className='w-full md:w-[50%]'>
                                    <label className='block pb-2'>Email Address</label>
                                    <input type="text" className={`${styles.input} w-full md:!w-[95%]`} required value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className='w-full md:w-[50%] pt-2'>
                                    <label className='block pb-2'> Phone Number</label>
                                    <input type="number" className={`${styles.input} w-full md:!w-[95%]`} required value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                                </div>
                                <div className='w-full md:w-[50%] pt-2'>
                                    <label className='block pb-2'>Enter your Password </label>
                                    <input type="password" required className={`${styles.input} w-full md:!w-[95%]`}  value={password} onChange={(e) => setPassword(e.target.value)} />
                                </div>

                            </div>

                            <input className={`w-[250px] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer`} required value="Update" type='submit' />
                        </form>
                    </div>
                </>

            )}


            {/* Order   */}
            {active === 2 && (
                <div>
                    <AllOrders />
                </div>
            )}



            {/* Refund    */}
            {active === 3 && (
                <div>
                    <AllRefundOrders />
                </div>
            )}


            {/* Track Order   */}
            {active === 5 && (
                <div>
                    <TrackOrder />
                </div>
            )}


            {/* Payment Method */}
            {active === 6 && (
                <div>
                    <PaymentMethod />
                </div>
            )}


            {/* User Address */}
            {active === 7 && (
                <div>
                    <Address />
                </div>
            )}
        </div>
    )

}



const AllOrders = () => {
    const orders = [
        {
            _id: "123gfghgfhg45656@##frfyyc",
            orderItems: [
                {
                    name: "Iphone 14 Pro Max",
                }
            ],
            totalPrice: 1200,
            orderStatus: "Processing",
        },
    ];
    const columns = [
        { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7, },

        {
            field: "status",
            headerName: "Status",
            minWidth: 130,
            flex: 0.7,
            cellClassName: (params) => {
                return params.value === "Delivered"
                    ? "greenColor"
                    : "redColor";
            },
        },
        {
            field: "itemsQty",
            headerName: "Items Qty",
            type: "number",
            minWidth: 130,
            flex: 0.7,
        },

        {
            field: "total",
            headerName: "Total",
            type: "number",
            minWidth: 130,
            flex: 0.8,
        },

        {
            field: " ",
            flex: 1,
            minWidth: 150,
            headerName: "",
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={`/user/order/${params.id}`}>
                            <Button>
                                <AiOutlineArrowRight size={20} />
                            </Button>
                        </Link>
                    </>
                );
            },
        },
    ];

    const row = [];
    orders && orders.forEach((item) => {
        row.push({
            id: item._id,
            itemsQty: item.orderItems.length,
            total: "US$" + item.totalPrice,
            status: item.orderStatus
        });
    });

    return (
        <div className="pl-8 pt-1">
            <DataGrid rows={row} columns={columns} pageSize={10} disableRowSelectionOnClick autoHeight />
        </div>
    )
}

const AllRefundOrders = () => {
    const orders = [
        {
            _id: "123frfyyc",
            orderItems: [
                {
                    name: "Iphone 14 Pro Max",
                }
            ],
            totalPrice: 1200,
            orderStatus: "Processing",
        },
    ];

    const columns = [
        { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

        {
            field: "status",
            headerName: "Status",
            minWidth: 130,
            flex: 0.7,
            cellClassName: (params) => {
                return params.value === "Delivered"
                    ? "greenColor"
                    : "redColor";
            },
        },
        {
            field: "itemsQty",
            headerName: "Items Qty",
            type: "number",
            minWidth: 130,
            flex: 0.7,
        },

        {
            field: "total",
            headerName: "Total",
            type: "number",
            minWidth: 130,
            flex: 0.8,
        },

        {
            field: " ",
            flex: 1,
            minWidth: 150,
            headerName: "",
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={`/user/order/${params.id}`}>
                            <Button>
                                <AiOutlineArrowRight size={20} />
                            </Button>
                        </Link>
                    </>
                );
            },
        },
    ];

    const row = [];
    orders && orders.forEach((item) => {
        row.push({
            id: item._id,
            itemsQty: item.orderItems.length,
            total: "US$" + item.totalPrice,
            status: item.orderStatus
        });
    });


    return (
        <div className='pl-8 pt-1'>
            <DataGrid rows={row} columns={columns} pageSize={10} disableSelectOnClick autoHeight />
        </div>
    )
}

const TrackOrder = () => {
    const orders = [
        {
            _id: "223344",
            orderItems: [
                {
                    name: "Iphone 14 Pro Max",
                }
            ],
            totalPrice: 1200,
            orderStatus: "Processing",
        },
    ];

    const columns = [
        { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },
        {
            field: "status",
            headerName: "Status",
            minWidth: 130,
            flex: 0.7,
            cellClassName: (params) => {
                return params.value === "Delivered"
                    ? "greenColor"
                    : "redColor";
            },
        },
        {
            field: "itemsQty",
            headerName: "Items Qty",
            type: "number",
            minWidth: 130,
            flex: 0.7,
        },

        {
            field: "total",
            headerName: "Total",
            type: "number",
            minWidth: 130,
            flex: 0.8,
        },

        {
            field: " ",
            flex: 1,
            minWidth: 130,
            headerName: "",
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={`/user/order/${params.id}`}>
                            <Button>
                                <MdOutlineTrackChanges size={20} />
                            </Button>
                        </Link>
                    </>
                );
            },
        },
    ]

    const row = [];
    orders && orders.forEach((item) => {
        row.push({
            id: item._id,
            itemsQty: item.orderItems.length,
            total: "US$" + item.totalPrice,
            status: item.orderStatus
        });
    });

    return (
        <div className='pl-8 pt-1'>
            <DataGrid rows={row} columns={columns} pageSize={10} disableSelectionOnClick autoHeight />

        </div>
    )
}

const PaymentMethod = () => {
    return (
        <div className="w-full px-5">
            <div className="flex w-full items-center justify-between ">
                <h1 className='text-[25px] font-[600] text-[#000000ba] pb-2'>Payment Methods</h1>
                <div className={`${styles.button} !rounded-md`}>
                    <span className='text-[#fff] '>Add New</span>
                </div>
            </div>
            <br />
            <div className="w-full bg-white h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10" >
                <div className="flex items-center">
                    <img src="https://bonik-react.vercel.app/assets/images/payment-methods/Visa.svg" alt="image" />
                    <h5 className='pl-5 font-[600]'>Shahriar Sajeeb</h5>
                </div>
                <div className="pl-8 flex items-center">
                    <h6>1234 **** **** ****</h6>
                    <h5 className='pl-6'>08/2028</h5>
                </div>
                <div className='min-w-[10%] flex items-center justify-between pl-8'>
                    <AiOutlineDelete size={25} className='cursor-pointer' />
                </div>
            </div>
        </div>
    )
}

const Address = () => {
    return (
        <div className="w-full  px-5">
            <div className="flex w-full items-center justify-between ">
                <h1 className='text-[25px] font-[600] text-[#000000ba] pb-2'>My  Addresses</h1>
                <div className={`${styles.button} !rounded-md`}>
                    <span className='text-[#fff] '>Add New</span>
                </div>
            </div>
            <br />
            <div className="w-full bg-white h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10" >
                <div className="flex items-center">
                    <h5 className='pl-5 font-[600]'>Default</h5>
                </div>
                <div className="pl-8 flex items-center">
                    <h6>494 Zulfiqar Town, Road Kasur</h6>
                </div>
                <div className="pl-8 flex items-center">
                    <h6>+92-324-1050964</h6>
                </div>
                <div className='min-w-[10%] flex items-center justify-between pl-8'>
                    <AiOutlineDelete size={25} className='cursor-pointer' />
                </div>
            </div>
        </div>
    )
}





export default ProfileContent