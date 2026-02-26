import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { backend_url, server, } from '../../server';
import { AiOutlineCamera, AiOutlineDelete } from 'react-icons/ai';
import { MdOutlineTrackChanges } from 'react-icons/md';
import styles from '../../styles/styles';
import { Link } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { Button } from '@mui/material';
import { deleteUserAddress, updateUserAddress, updateUserInformation } from '../../redux/actions/user';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import axios from 'axios';
import { RxCross1 } from 'react-icons/rx';
import { Country, City } from "country-state-city";

function ProfileContent({ active }) {
    const { user, error, successMessage } = useSelector((state) => state.user);
    const [name, setName] = useState(user && user.name);
    const [email, setEmail] = useState(user && user.email);
    const [phoneNumber, setPhoneNumber] = useState(user && user.phoneNumber);
    const [password, setPassword] = useState("");
    const [avatar, setAvatar] = useState(null);


    const dispatch = useDispatch();

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch({
                type: "clearErrors",
            })
        }
        if (successMessage) {
            toast.success(successMessage);
            dispatch({
                type: "clearSuccessMessages",
            })
        }
    }, [error, successMessage]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateUserInformation(name, email, password, phoneNumber));
    }



    const handleImage = async (e) => {
        const file = e.target.files[0];
        setAvatar(file);

        const formData = new FormData();
        formData.append("file", e.target.files[0]);

        await axios.put(`${server}/user/update-avatar`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
        }).then((response) => {
            window.location.reload();
        }).catch((error) => {
            toast.error(error.response.data.message);
        })
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
                                <input type="file" id="file" className='hidden' onChange={handleImage} />
                                <label htmlFor="file" className='cursor-pointer'>
                                    <AiOutlineCamera />
                                </label>
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
                                    <input type="password" required className={`${styles.input} w-full md:!w-[95%]`} value={password} onChange={(e) => setPassword(e.target.value)} />
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
    const [open, setOpen] = useState(false);
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [address1, setAddress1] = useState("");
    const [address2, setAddress2] = useState("");
    const [addressType, setAddressType] = useState("");
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.user);

    const addressTypeData = [
        {
            name: "Default",
        },
        {
            name: "Home ",
        },
        {
            name: "Office",
        }
    ]

    const handleSubmit = (e) => {
        e.preventDefault();
        if (addressType === "" || country === "" || city === "" || zipCode === "") {
            toast.error("Please fill all the fields");
        } else {
            dispatch(updateUserAddress(country, city, address1, address2, addressType, zipCode));
            setOpen(false);
            setCountry("");
            setCity("");
            setAddress1("");
            setAddress2("");
            setZipCode("");
            setAddressType("");
        }
    }

    const handleDelete = (item) => {
        dispatch(deleteUserAddress(item._id));
    }

    return (
        <div className="w-full  px-5">
            {
                open && (
                    <div className="fixed w-full h-screen bg-[#0000004b] top-0 left-0 flex items-center justify-center">
                        <div className="w-[35%] h-[80vh] bg-white rounded shadow relative overflow-scroll">
                            <div className="w-full flex justify-end">
                                <RxCross1 className="cursor-pointer " onClick={() => setOpen(false)} size={30} />
                            </div>
                            <h1 className='text-center pt-5'>Add New Address</h1>
                            <div className="w-full">
                                <form aria-required action="submit" onSubmit={handleSubmit} className='w-full'>
                                    <div className="w-full block p-4">
                                        <div className="w-full pb-2">
                                            <label className='block pb-2'>Country</label>
                                            <select name="country" id="country" value={country} onChange={(e) => setCountry(e.target.value)} className='w-[95%] border h-[30px] rounded-[5px]'>
                                                <option value="" className='block pb-2'>Choose your country</option>
                                                {Country && Country.getAllCountries().map((item) => {
                                                    return <option className='block pb-2' key={item.isoCode} value={item.isoCode}>{item.name}</option>
                                                })}
                                            </select>
                                        </div>
                                        <div className="w-full pb-2">
                                            <label className='block pb-2'>City</label>
                                            <select name="city" id="city " value={city} onChange={(e) => setCity(e.target.value)} className='w-[95%] border h-[30px] rounded-[5px]'>
                                                <option value="" className='block pb-2'>Choose your city</option>
                                                {City && City.getCitiesOfCountry(country).map((item) => {
                                                    return <option className='block pb-2' key={item.isoCode} value={item.isoCode}>{item.name}</option>
                                                })}
                                            </select>
                                        </div>
                                        <div className="w-full pb-2">
                                            <label className='block pb-2'>Address 1</label>
                                            <input type="text" className={`${styles.input}`} required value={address1} onChange={(e) => setAddress1(e.target.value)} />
                                        </div>
                                        <div className="w-full pb-2">
                                            <label className='block pb-2'>Address 2</label>
                                            <input type="text" className={`${styles.input}`} required value={address2} onChange={(e) => setAddress2(e.target.value)} />
                                        </div>
                                        <div className="w-full pb-2">
                                            <label className='block pb-2'>Zip Code </label>
                                            <input type="number" className={`${styles.input}`} required value={zipCode} onChange={(e) => setZipCode(e.target.value)} />
                                        </div>

                                        <div className="w-full pb-2">
                                            <label className='block pb-2'>Address Type</label>
                                            <select name="addressType" id="addressType" value={addressType} onChange={(e) => setAddressType(e.target.value)} className='w-[95%] border h-[30px] rounded-[5px]'>
                                                <option value="" className='block pb-2'>Choose your Address Type</option>
                                                {addressTypeData && addressTypeData.map((item) => {
                                                    return <option className='block pb-2' key={item.name} value={item.name}>{item.name}</option>
                                                })}
                                            </select>
                                        </div>
                                        <div className='w-full pb-2'>
                                            <input type="submit" className={`${styles.input} mt-5 cursor-pointer`} required readOnly />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )
            }
            <div className="flex w-full items-center justify-between ">
                <h1 className='text-[25px] font-[600] text-[#000000ba] pb-2'>My  Addresses</h1>
                <div className={`${styles.button} !rounded-md`} onClick={() => setOpen(true)}>
                    <span className='text-[#fff] ' >Add New</span>
                </div>
            </div>
            <br />
            {user && user.addresses && user.addresses.length === 0 ? (
                <div className='shadow-md border border-gray-200 rounded-[5px] bg-white'>
                    <div className="w-full flex flex-col items-center justify-center py-10 text-gray-500 " >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243A8 8 0 1117.657 16.657z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <h4 className="text-lg font-semibold">  No address available</h4>
                        <p className="text-sm"> Please add a new address </p>
                    </div>
                </div>
            ) : (
                user && user.addresses && user.addresses.map((item, index) => (
                    <div key={index} className="w-full bg-white h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10 mb-4">
                        <div className="flex items-center">
                            <h5 className='pl-5 font-[600]'>{item.addressType}</h5>
                        </div>
                        <div className="pl-8 flex items-center">
                            <h6>{item.address1}, {item.address2}</h6>
                        </div>
                        <div className="pl-8 flex items-center">
                            <h6>{user && user.phoneNumber}</h6>
                        </div>
                        <div className='min-w-[10%] flex items-center justify-between pl-8'>
                            <AiOutlineDelete size={25} className='cursor-pointer' onClick={() => handleDelete(item)} />
                        </div>
                    </div>
                ))
            )}

        </div>
    )
}





export default ProfileContent