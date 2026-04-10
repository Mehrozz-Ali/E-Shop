import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { backend_url } from '../../server';
import styles from '../../styles/styles';
import { AiOutlineCamera } from 'react-icons/ai';
import { toast } from 'react-toastify';
import { loadSeller } from '../../redux/actions/user';
function ShopSettings() {

    const { seller } = useSelector((state) => state.seller);
    const [avatar, setAvatar] = useState();
    const dispatch = useDispatch();


    const handleImage = async (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        setAvatar(file);

        const formData = new FormData();
        formData.append("file", e.target.files[0]);

        await axios.put(`${server}/shop/update-shop-avatar`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
        }).then((res) => {
            dispatch(loadSeller());
            toast.success("Shop avatar updated successfully!");
        }).catch((error) => {
            toast.error(error.response.data.message);
        })

    }

    const updateHandler = (e) => {
        e.preventDefault();
    }


    return (
        <div className='w-full min-h-screen flex flex-col items-center'>
            <div className="flex w-full md:w-[80%] flex-col justify-center my-5">
                <div className="w-full flex items-center justify-center ">
                    <div className="relative">
                        <img src={avatar ? URL.createObjectURL(avatar) : `${backend_url}/${seller?.avatar?.url}`} alt="image" className='w-[200px] h-[200px] rounded-full cursor-pointer' />
                        <div className='w-[30px] h-[30px] bg-[#f3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[10px] right-[15px]'>
                            <input type="file" id="file" className='hidden' onChange={handleImage} />
                            <label htmlFor="file" className='cursor-pointer'>
                                <AiOutlineCamera />
                            </label>
                        </div>
                    </div>
                </div>


                {/* shop info */}
                <form aria-aria-required="true" className='flex flex-col items-center' onSubmit={updateHandler}>
                    <div className="w-[95%] md:w-[50%] mt-5 ">
                        <label className='block pb-2'>Shop Name</label>
                        <input type="Name" placeholder={`${seller?.name}`} value={seller?.name} className={`${styles.input} pr-10`} required />
                    </div>

                    <div className="w-[95%] md:w-[50%] mt-5 ">
                        <label className='block pb-2'>Shop description</label>
                        <input type="text" placeholder={`${seller?.description ? seller.description : "Enter your shop description"}`} value={seller?.description ? seller.description : ""} className={`${styles.input} pr-10`} />
                    </div>

                    <div className="w-[95%] md:w-[50%] mt-5 ">
                        <label className='block pb-2'>Shop Address</label>
                        <input type="text" placeholder={`${seller?.address}`} value={seller?.address} className={`${styles.input} pr-10`} required />
                    </div>

                    <div className="w-[95%] md:w-[50%] mt-5 ">
                        <label className='block pb-2'>Shop Phone Number</label>
                        <input type="number" placeholder={`${seller?.phoneNumber}`} value={seller?.phoneNumber} className={`${styles.input} pr-10`} required />
                    </div>

                    <div className="w-[95%] md:w-[50%] mt-5 ">
                        <label className='block pb-2'>Shop Zip Code</label>
                        <input type="number" placeholder={`${seller?.zipCode}`} value={seller?.zipCode} className={`${styles.input} pr-10`} required />
                    </div>

                    <div className="w-[95%] md:w-[50%] mt-5 ">
                        <input type="submit" value="Update Shop " className={`${styles.input} pr-10 cursor-pointer`} required readOnly />
                    </div>

                </form>
            </div>
        </div>
    )
}

export default ShopSettings