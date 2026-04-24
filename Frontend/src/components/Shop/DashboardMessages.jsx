import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useSelector } from 'react-redux';
import { backend_url, server } from '../../server';
import { useNavigate } from 'react-router-dom';
import { AiOutlineArrowRight, AiOutlineSend } from 'react-icons/ai';
import { TfiGallery } from 'react-icons/tfi';
import styles from '../../styles/styles';
import socketIO from 'socket.io-client';
import { format } from 'timeago.js';
const ENDPOINT = "http://localhost:4000";

const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

function DashboardMessages() {
    const { seller } = useSelector((state) => state.seller);
    const [conversations, setConversations] = useState([]);
    const [open, setOpen] = useState(false);
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [messages, setMessages] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [userData, setUserData] = useState(null);
    const [newMessage, setNewMessage] = useState("");



    useEffect(() => {
        socketId.on("getMessage", (data) => {
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now(),
            });
        })
    }, [])

    // useEffect(() => {
    //     const handler = (data) => {
    //         setArrivalMessage({
    //             sender: data.senderId,
    //             text: data.text,
    //             createdAt: Date.now(),
    //         });
    //     };
    //     socketId.on("getMessage", handler);
    //     return () => {
    //         socketId.off("getMessage", handler);
    //     };
    // }, []);



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



    // get messages 
    useEffect(() => {
        const getMessage = async () => {
            try {
                const response = await axios.get(`${server}/message/get-all-messages/${currentChat?._id}`);
                setMessages(response.data.messages)
            } catch (error) {
                console.log(error);
            }
        }
        getMessage();
    }, [currentChat])



    // create new message 
    const sendMessageHandler = async (e) => {
        e.preventDefault();

        const message = {
            sender: seller._id,
            text: newMessage,
            conversationId: currentChat._id,
        };
        const receiverId = currentChat.members.find((member) => member.id !== seller._id);

        socketId.emit("sendMessage", {
            senderId: seller._id,
            receiverId,
            text: newMessage,
        })

        try {
            if (newMessage.trim() !== "") {
                await axios.post(`${server}/message/create-new-message`, message).then((res) => {
                    setMessages([...messages, res.data.message]);
                    updateLastMessage();
                }).catch((error) => {
                    console.log(error);
                })
            }
        } catch (error) {
            console.log(error);
        }
    }

    const updateLastMessage = async () => {
        socketId.emit("updateLastMessage", {
            lastMessage: newMessage,
            lastMessageId: seller._id,
        })
        await axios.put(`${server}/conversation/update-last-message/${currentChat._id}`, {
            lastMessage: newMessage,
            lastMessageId: seller._id,
        }).then((res) => {
            console.log(res.data.conversation);
            setNewMessage("");
        }).catch((error) => {
            console.log(error);
        })
    }


    return (
        <div className='w-[90%] bg-[#f5f5f5] m-5 h-[85vh] overflow-y-scroll rounded'>

            {
                !open && (
                    <>
                        <h1 className='text-center text-[30px] font-poppins py-3'>All Messages</h1>
                        {/* All messages list */}
                        {
                            conversations && conversations.map((item, index) => (
                                <MessageList data={item} key={index} index={index} setOpen={setOpen} setCurrentChat={setCurrentChat} me={seller._id} setUserData={setUserData} userData={userData} />
                            ))
                        }
                    </>
                )
            }

            {open && (<SellerInbox setOpen={setOpen} newMessage={newMessage} setNewMessage={setNewMessage} sendMessageHandler={sendMessageHandler} messages={messages} sellerId={seller._id} />)}

        </div>
    )
}


const MessageList = ({ data, index, open, setOpen, currentChat, setCurrentChat, me, setUserData, userData }) => {

    const [active, setActive] = useState(0);
    const navigate = useNavigate();

    const handleClick = (id) => {
        navigate(`/dashboard-messages?${id}`);
        setOpen(true);
    }

    useEffect(() => {
        const userId = data.members.find((user) => user !== me);

        const getUser = async () => {
            try {
                const response = await axios.get(`${server}/user/user-info/${userId}`);
                setUserData(response.data.user);
            } catch (error) {
                console.log(error);
            }
        }
        getUser();
    }, [me, data])




    return (
        <div className={`w-full flex p-3 px-3 cursor-pointer  ${active === index ? 'bg-[#00000010]' : 'bg-transparent'}`} onClick={(e) => setActive(index) || handleClick(data._id) || setCurrentChat(data)}>
            <div className="relative">
                <img src={`${backend_url}/${userData?.avatar.url}`} alt="" className='w-[50px] h-[50px] rounded-full' />
                <div className='w-[12px] h-[12px] bg-green-400 rounded-full absolute  top-[-2px] right-2'></div>
            </div>
            <div className='pl-3'>
                <h1 className='text-[18px]'>{userData?.name}</h1>
                <p className='text-[14px] text-[#000c]'>{data?.lastMessageId !== userData._id ? "You:" : userData.name.split("")[0] + ": "}{data?.lastMessage}</p>
            </div>
        </div>
    )
}


const SellerInbox = ({ setOpen, newMessage, setNewMessage, sendMessageHandler, messages, sellerId }) => {
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
                {messages && messages.map((item, index) => (
                    <div className={`flex w-full my-2 ${item.sender === sellerId ? "justify-end" : "justify-start"}`}>
                        {
                            item.sender !== sellerId && (
                                <img src="http://localhost:8000/rock-1775801409015-335925793.png" alt="image" className='w-[40px] h-[40px] rounded-full mr-3 ' />
                            )
                        }
                        <div>
                            <div className="w-max p-2 rounded bg-[#40a56c] text-[#fff] h-min ">
                                <p>{item?.text}</p>
                            </div>
                            <p className='text-[12px] text-[#000000d3] pt-1'>{format(item?.createdAt)}</p>
                        </div>
                    </div>
                ))}
            </div>




            {/* send message input*/}
            <form onSubmit={sendMessageHandler} aria-required={true} className='p-3 relative w-full flex justify-between items-center'>
                <div className='w-[4%] '>
                    <TfiGallery size={20} className='cursor-pointer' />
                </div>
                <div className='w-[96%]'>
                    <input type="text" required value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder='Enter your message...' className={`${styles.input}`} />
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