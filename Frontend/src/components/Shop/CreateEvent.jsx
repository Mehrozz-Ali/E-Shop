import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { categoriesData } from '../../static/data';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { useEffect } from 'react';
import { toast } from "react-toastify";
import { createEvent } from '../../redux/actions/event';

function CreateEvent() {
    const { seller } = useSelector((state) => state.seller);
    const { success, error } = useSelector((state) => state.events);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (error) {
            toast.error(error);
        }
        if (success) {
            toast.success("Event created successfully!");
            navigate("/dashboard-events");
            window.location.reload();
        }
    }, [dispatch, error, success, navigate]);

    const [images, setImages] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [tags, setTags] = useState("");
    const [originalPrice, setOriginalPrice] = useState();
    const [discountPrice, setDiscountPrice] = useState();
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const handleStartDateChange = (e) => {
        const startDate = new Date(e.target.value);
        const minFinishDate = new Date(startDate.getTime() + 3 * 24 * 60 * 60 * 1000);
        setStartDate(startDate);
        setEndDate(null);
        document.getElementById("finish_Date").min = minFinishDate.toISOString().slice(0, 10);
    };

    const handleEndDateChange = (e) => {
        const endDate = new Date(e.target.value);
        setEndDate(endDate);
    };

    const today = new Date().toISOString().slice(0, 10);
    const minEndDate = startDate ? new Date(startDate.getTime() + 3 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10) : today;


    const handleSubmit = (e) => {
        e.preventDefault();

        if (!category) {
            toast.error("Please select a category");
            return;
        }

        const newForm = new FormData();
        images.forEach((image) => {
            newForm.append("files", image);
        })
        newForm.append("name", name);
        newForm.append("description", description);
        newForm.append("category", category);
        newForm.append("tags", tags);
        if (originalPrice) newForm.append("originalPrice", Number(originalPrice));
        newForm.append("discountPrice", Number(discountPrice));

        newForm.append("shopId", seller._id);
        newForm.append("start_date", startDate.toISOString());
        newForm.append("finish_date", endDate.toISOString());
        dispatch(createEvent(newForm));
    }

    const handleImageChange = (e) => {
        e.preventDefault();
        let files = Array.from(e.target.files);
        setImages((prevImages) => [...prevImages, ...files]);
    }

    return (
        <div className=' w-[90%] md:w-[50%] bg-white shadow h-[80vh] rounded-[4px] p-3 overflow-y-scroll'>
            <h5 className='text-[30px] text-center font-Poppins'>Create Event</h5>

            {/* Create Event Form  */}
            <form action="submit" onSubmit={handleSubmit}>
                <br />
                <div>
                    <label className='pb-2'>Name <span className='text-red-500'>*</span></label>
                    <input type="text" name='name' value={name} onChange={(e) => setName(e.target.value)} className=' mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm' placeholder='Enter your event product name' />
                </div>
                <br />
                <div>
                    <label className='pb-2'>Description <span className='text-red-500'>*</span></label>
                    <textarea cols="30" rows='5' name='description' value={description} onChange={(e) => setDescription(e.target.value)} className=' mt-2 appearance-none block w-full px-3 pt-2  border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm' placeholder='Enter your event product description' ></textarea>
                </div>
                <br />
                <div>
                    <label className='pb-2'>Category <span className='text-red-500'>*</span></label>
                    <select className='w-full mt-2 border h-[35px] rounded-[5px]' value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="">Choose a category</option>
                        {categoriesData && categoriesData.map((i) => (
                            <option value={i.title} key={i.title}>{i.title}</option>
                        ))}
                    </select>
                </div>
                <br />
                <div>
                    <label className='pb-2'>Tags</label>
                    <input type="text" name='tags' value={tags} onChange={(e) => setTags(e.target.value)} className=' mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm' placeholder='Enter your event product tags' />
                </div>
                <br />
                <div>
                    <label className='pb-2'>Original Price</label>
                    <input type="number" name='originalPrice' value={originalPrice} onChange={(e) => setOriginalPrice(e.target.value)} className=' mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm' placeholder='Enter your event product price' />
                </div>
                <br />
                <div>
                    <label className='pb-2'>Price (with Discount) <span className='text-red-500'>*</span></label>
                    <input type="number" name='discountPrice' value={discountPrice} onChange={(e) => setDiscountPrice(e.target.value)} className=' mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm' placeholder='Enter your event product price with discount' />
                </div>
                <br />

                <div>
                    <label className='pb-2'>Event Start Date <span className='text-red-500'>*</span></label>
                    <input type="date" name='startDate' id="start_Date" value={startDate ? startDate.toISOString().slice(0, 10) : ""} min={today} onChange={handleStartDateChange} className=' mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm' placeholder='Enter your event product stock' />
                </div>
                <br />
                <div>
                    <label className='pb-2'>Event End Date <span className='text-red-500'>*</span></label>
                    <input type="date" name='endDate' id="end_Date" value={endDate ? endDate.toISOString().slice(0, 10) : ""} min={minEndDate} onChange={handleEndDateChange} className=' mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm' placeholder='Enter your event product end date' />
                </div>
                <br />
                <div>
                    <label className='pb-2'>Upload Images  <span className='text-red-500'>*</span></label>
                    <input type="file" id="upload" className='hidden' multiple onChange={handleImageChange} />
                    <div className='flex items-center flex-wrap'>
                        <label htmlFor="upload">
                            <AiOutlinePlusCircle size={30} className="mt-3" color="#555" />
                        </label>
                        {
                            images && images.map((i) => (
                                <img src={URL.createObjectURL(i)} key={i} alt="" className='h-[120px] w-[120px] object-cover m-2' />
                            ))
                        }
                    </div>
                    <br />
                    <div>
                        <input type="submit" value="Create" className=' mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm' />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default CreateEvent