import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useSelector } from 'react-redux';
import { server } from '../../server';
import { useNavigate } from 'react-router-dom';
import { AiOutlineArrowRight, AiOutlineSend } from 'react-icons/ai';
import { TfiGallery } from 'react-icons/tfi';
import styles from '../../styles/styles';
import socketIO from 'socket.io-client';
const ENDPOINT = "http://localhost:4000/";

const socketId = socketIO(ENDPOINT, { transport: ["websocket"] });

function DashboardMessages() {
    const { seller } = useSelector((state) => state.seller);
    const [conversations, setConversations] = useState([]);
    const [open, setOpen] = useState(false);
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [messages, setMessages] = useState(null);
    const [currentChat, setCurrentChat] = useState(null);



    useEffect(() => {
        socketId.on("getMessage", (data) => {
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now(),
            });
        })
    }, [])


    useEffect(() => {
        arrivalMessage && currentChat?.members.includes(arrivalMessage.sender) && setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage, currentChat])





    useEffect(() => {
        axios.get(`${server}/conversation/get-all-conversation-seller/${seller._id}`, { withCredentials: true }).then((res) => {
            setConversations(res.data.conversations);
        }).catch((err) => {
            console.log(err);
        })
    }, [seller])

    return (
        <div className='w-[90%] bg-[#f5f5f5] m-5 h-[85vh] overflow-y-scroll rounded'>

            {
                !open && (
                    <>
                        <h1 className='text-center text-[30px] font-poppins py-3'>All Messages</h1>
                        {/* All messages list */}
                        {
                            conversations && conversations.map((item, index) => (
                                <MessageList data={item} key={index} index={index} setOpen={setOpen} />
                            ))
                        }
                    </>
                )
            }

            {
                open && (
                    <SellerInbox setOpen={setOpen} />
                )
            }

        </div>
    )
}

const MessageList = ({ data, index, open, setOpen }) => {

    const [active, setActive] = useState(0);
    const navigate = useNavigate();

    const handleClick = (id) => {
        navigate(`?${id}`);
        setOpen(true);
    }

    return (
        <div className={`w-full flex p-3 px-3 cursor-pointer  ${active === index ? 'bg-[#00000010]' : 'bg-transparent'}`} onClick={(e) => setActive(index) || handleClick(data._id)}>
            <div className="relative">
                <img src="http://localhost:8000/rock-1775801409015-335925793.png" alt="" className='w-[50px] h-[50px] rounded-full' />
                <div className='w-[12px] h-[12px] bg-green-400 rounded-full absolute  top-[-2px] right-2'></div>
            </div>
            <div className='pl-3'>
                <h1 className='text-[18px]'>Rameez Ali</h1>
                <p className='text-[14px] text-[#000c]'>You: Yeah I am good </p>
            </div>
        </div>
    )
}


const SellerInbox = ({ setOpen }) => {
    return (
        <div className="w-full min-h-full  flex flex-col justify-between">
            {/* Message Header */}
            <div className="w-full flex p-3 items-center justify-between bg-slate-200">
                <div className="flex">
                    <img src="http://localhost:8000/rock-1775801409015-335925793.png" alt="" className='w-[60px] h-[60px] rounded-full ' />
                    <div className='pl-3'>
                        <h1 className='text-[18px] font-[600]'>Rameez Ali</h1>
                        <h1>Active Now</h1>
                    </div>
                </div>
                <AiOutlineArrowRight size={20} onClick={() => setOpen(false)} className='cursor-pointer' />
            </div>

            {/* messages */}
            <div className="px-3 h-[65vh] py-3 overflow-scroll">
                <div className="flex w-full my-2">
                    <img src="http://localhost:8000/rock-1775801409015-335925793.png" alt="image" className='w-[40px] h-[40px] rounded-full mr-3 ' />
                    <div className="w-max p-2 rounded bg-[#40a56c] text-[#fff] h-min ">
                        <p>Hello there!</p>
                    </div>
                </div>


                <div className="flex w-full justify-end my-2">
                    <div className="w-max p-2 rounded bg-[#40a56c] text-[#fff] h-min ">
                        <p>Hello !</p>
                    </div>
                </div>
            </div>


            {/* send message input*/}
            <form action="" aria-required={true} className='p-3 relative w-full flex justify-between items-center'>
                <div className='w-[4%] '>
                    <TfiGallery size={20} className='cursor-pointer' />
                </div>
                <div className='w-[96%]'>
                    <input type="text" required placeholder='Enter your message...' className={`${styles.input}`} />
                    <input type="submit" value="Send" className='hidden' id='send' />
                    <label htmlFor="send">
                        <AiOutlineSend size={20} className='absolute right-4 top-5 cursor-pointer' />
                    </label>
                </div>
            </form>

        </div>
    )
}

export default DashboardMessages