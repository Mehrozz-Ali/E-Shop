import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { backend_url } from '../../server';
import { AiOutlineCamera } from 'react-icons/ai';
import styles from '../../styles/styles';
import { Link } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { Button } from '@mui/material';

function ProfileContent({ active }) {
    const { user } = useSelector((state) => state.user);
    const [name, setName] = useState(user && user.name);
    const [email, setEmail] = useState(user && user.email);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [address1, setAddress1] = useState("");
    const [address2, setAddress2] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div className='w-full '>
            {/* profile page */}
            {active === 1 && (
                <>                <div className='flex justify-center w-full '>
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
                                <div className='w-[50%]'>
                                    <label className='block pb-2'>Full Name</label>
                                    <input type="text" className={`${styles.input} !w-[95%]`} required value={name} onChange={(e) => setName(e.target.value)} />
                                </div>
                                <div className='w-[50%]'>
                                    <label className='block pb-2'>Email Address</label>
                                    <input type="text" className={`${styles.input} !w-[95%]`} required value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className='w-[50%] pt-2'>
                                    <label className='block pb-2'> Phone Number</label>
                                    <input type="number" className={`${styles.input} !w-[95%]`} required value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                                </div>
                                <div className='w-[50%] pt-2'>
                                    <label className='block pb-2'>Zip Code</label>
                                    <input type="number" className={`${styles.input} !w-[95%]`} required value={zipCode} onChange={(e) => setZipCode(e.target.value)} />
                                </div>
                            </div>


                            <div className="w-full flex pb-3 flex-wrap">
                                <div className='w-[50%]'>
                                    <label className='block pb-2'>Address 1</label>
                                    <input type="address" className={`${styles.input} !w-[95%]`} required value={address1} onChange={(e) => setAddress1(e.target.value)} />
                                </div>
                                <div className='w-[50%]'>
                                    <label className='block pb-2'>Address 2</label>
                                    <input type="address" className={`${styles.input} !w-[95%]`} required value={address2} onChange={(e) => setAddress2(e.target.value)} />
                                </div>
                            </div>
                            <input className={`w-[250px] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer`} required value="Update" type='submit' />
                        </form>
                    </div>
                </>

            )}


            {/* Order page  */}
            {active === 2 && (
                <div>
                    <AllOrders />
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
        <div className="pl-8 pt-1">
            <DataGrid rows={row} columns={columns} pageSize={10} disableRowSelectionOnClick autoHeight />
        </div>
    )
}

export default ProfileContent