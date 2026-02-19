import styles from '../../styles/styles';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { productData } from '../../static/data';
import { AiOutlineHeart, AiOutlineSearch, AiOutlineShoppingCart } from 'react-icons/ai';
import { IoIosArrowDown, IoIosArrowForward } from 'react-icons/io';
import { CgProfile } from 'react-icons/cg';
import { BiMenuAltLeft } from 'react-icons/bi';
import DropDown from './DropDown';
import { categoriesData } from '../../static/data';
import Navbar from './Navbar';
import { backend_url } from '../../server';
import Cart from '../Cart/Cart';
import WishList from '../WishList/WishList';
import { RxCross1 } from 'react-icons/rx';


function Header({ activeHeading }) {

    const { allProducts } = useSelector((state) => state.product);
    const { cart } = useSelector((state) => state.cart);
    const { wishlist } = useSelector((state) => state.wishlist);

    const { isAuthenticated, user } = useSelector((state) => state.user);


    const [searchTerm, setSearchTerm] = useState("");
    const [searchData, setSearchData] = useState(null);
    const [active, setActive] = useState(false);
    const [dropDown, setDropDown] = useState(false);
    const [openCart, setOpenCart] = useState(false);
    const [openWishList, setOpenWishList] = useState(false);
    const [open, setOpen] = useState(false)  // for mobile screen 



    const handleSearchChange = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        const filteredProducts = allProducts && allProducts.filter((product) =>
            product.name.toLocaleLowerCase().includes(term.toLocaleLowerCase())
        );
        setSearchData(filteredProducts);
    }

    useEffect(() => {
        const handleScroll = () => {
            setActive(window.scrollY > 70);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);


    return (

        <>
            <div className={`${styles.section} hidden lg:block`}>
                <div className="flex items-center justify-between h-[50px] my-[20px]">
                    <div>
                        <Link to="/">
                            <img src="/logo.svg" alt="" />
                        </Link>
                    </div>

                    {/* Search Box  */}
                    <div className="w-[50%] relative">
                        <input type="text" placeholder="Search Product..." value={searchTerm} onChange={handleSearchChange} className="h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md" />
                        <AiOutlineSearch size={30} className="absolute right-2 top-1.5 cursor-pointer" />
                        {searchData && searchData.length !== 0 ? (
                            <div className='absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z-[9] p-4'>
                                {searchData && searchData.map((i, index) => {
                                    const d = i.name;
                                    const product_name = d.replace(/\s+/g, "-");
                                    return (
                                        <Link to={`/product/${product_name}`}>
                                            <div className="w-full flex items-start-py-3">
                                                <img src={`${backend_url}${i.images[0]}`} alt="" className='w-[40px] h-[40px] mr-[10px]' />
                                                <h1>{i.name}</h1>
                                            </div>
                                        </Link>
                                    )
                                })}
                            </div>
                        ) : null}
                    </div>

                    <div className={`${styles.button} !rounded-sm`}>
                        <Link to="/shop-create">
                            <h1 className='text-[#fff] flex items-center'>Become a Seller<IoIosArrowForward className="ml-1" /></h1>
                        </Link>
                    </div>
                </div>
            </div>

            <div className={`${active === true ? "shadow-sm fixed top-0 left-0 z-10" : ""} hidden lg:block transition  lg:flex items-center justify-between w-full bg-[#3321c8] h-[70px]`}>
                <div className={`${styles.section} relative ${styles.normalFlex} justify-between`}>
                    {/* Categories */}
                    <div onClick={() => setDropDown(!dropDown)}>
                        <div className='relative h-[60px] mt-[10px] w-[270px]  1000px:block'>
                            <BiMenuAltLeft size={30} className='absolute top-3 left-2' />
                            <button className={`h-[100%] w-full flex  justify-between items-center pl-10 bg-white font-sans text-lg font-[500] select-none rounded-t-md cursor-pointer`}>All Categories</button>
                            <IoIosArrowDown size={20} className='absolute right-2 top-4 cursor-pointer' onClick={() => setDropDown(!dropDown)} />
                            {dropDown ?
                                (<DropDown categoriesData={categoriesData} setDropDown={setDropDown} />) : null}
                        </div>
                    </div>
                    {/* nav Items */}
                    <div className={`${styles.normalFlex}`}>
                        <Navbar active={activeHeading} />
                    </div>
                    {/* navbar icons */}
                    <div className='flex'>
                        <div className={`${styles.normalFlex}`}>
                            <div className="relative cursor-pointer mr-[15px]" onClick={() => setOpenWishList(true)}>
                                <AiOutlineHeart size={30} color='rgb(255 255 255/ 83%)' />
                                <span className='absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right  p-0 m-0 text-white font-mono text-[12px] leading-tight text-center'>{wishlist && wishlist.length}</span>
                            </div>
                        </div>
                        <div className={`${styles.normalFlex}`}>
                            <div className="relative cursor-pointer mr-[15px] " onClick={() => setOpenCart(true)}>
                                <AiOutlineShoppingCart size={30} color='rgb(255 255 255/ 83%)' />
                                <span className='absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right  p-0 m-0 text-white font-mono text-[12px] leading-tight text-center'>{cart && cart.length}</span>
                            </div>
                        </div>

                        <div className={`${styles.normalFlex}`}>
                            <div className="relative cursor-pointer mr-[15px]" >
                                {isAuthenticated ?
                                    (
                                        <Link to="/profile">
                                            <img src={`${backend_url}${user.avatar.url}`} alt="" className='w-[35px] h-[35px] rounded-full' />
                                        </Link>) : (
                                        <Link to="/login">
                                            <CgProfile size={30} color='rgb(255 255 255/ 83%)' />
                                        </Link>
                                    )
                                }
                            </div>
                        </div>

                        {/* Cart popup */}
                        {openCart ? (<Cart setOpenCart={setOpenCart} />) : null}

                        {/* WishList popup */}
                        {openWishList ? (<WishList setOpenWishList={setOpenWishList} />) : null}

                    </div>
                </div>
            </div>


            {/* Mobile Header */}
            <div className={` ${active === true ? "shadow-sm fixed top-0 left-0 z-10" : ""} w-full h-[60px]  bg-[#fff] z-50 top-0 left-0 shadow-sm block lg:hidden `}>
                <div className="w-full flex items-center justify-between">
                    <div className=''>
                        <BiMenuAltLeft size={40} className='ml-4' onClick={() => setOpen(true)} />
                    </div>
                    <div>
                        <Link to="/">
                            <img src="/logo.svg" alt="" className='mt-3 cursor-pointer' />
                        </Link>
                    </div>
                    <div>
                        <div className="relative mr-[20px]">
                            <AiOutlineShoppingCart size={30} />
                            <span className='absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right  p-0 m-0 text-white font-mono text-[12px] leading-tight text-center'>{cart && cart.length}</span>
                        </div>
                    </div>
                </div>

                {/* Mobile Header Sidebar */}
                {open && (
                    <div className='fixed w-full bg-[#0000005a] z-20 h-full top-0 left-0'>
                        <div className='fixed w-[60%] bg-[#fff] h-screen top-0 left-0 z-10 overflow-y-scroll'>
                            <div className="w-full justify-between flex pr-3">
                                <div>
                                    <div className="relative mr-[15px]">
                                        <AiOutlineHeart size={30} className='mt-5 ml-3' />
                                        <span className='absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right  p-0 m-0 text-white font-mono text-[12px] leading-tight text-center'>0</span>
                                    </div>
                                </div>
                                <RxCross1 size={30} className='ml-4 mt-5' onClick={() => setOpen(false)} />
                            </div>

                            {/* search bar  */}
                            <div className="my-8 w-[92%] m-auto h-[40px] relative">
                                <input type='search' placeholder='Search Product...' className='h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md' value={searchTerm} onChange={handleSearchChange} />
                                {searchData && (
                                    <div className='absolute  bg-[#fff] z-10 shadow w-full p-2'>
                                        {
                                            searchData && searchData.map((i) => {
                                                const d = i.name;
                                                const Product_name = d.replace(/\s+/g, "-");
                                                return (
                                                    <Link to={`/product/${Product_name}`}>
                                                        <div className='flex items-center'>
                                                            <img src={i.image_Url[0].url} alt="" className='w-[50px] mr-2' />
                                                            <h5>{i.name}</h5>
                                                        </div>
                                                    </Link>
                                                )
                                            })
                                        }
                                    </div>
                                )}
                            </div>


                            <Navbar active={activeHeading} />
                            <div className={`${styles.button} !rounded-sm ml-4`}>
                                <Link to="/shop-create">
                                    <h1 className='text-[#fff] flex items-center'>Become a Seller<IoIosArrowForward className="ml-1" /></h1>
                                </Link>
                            </div>
                            <br />
                            <br />
                            <br />
                            <div className="flex w-full justify-center">
                                {
                                    isAuthenticated ? (
                                        <div>
                                            <Link to="/profile">
                                                <img src={`${backend_url}${user.avatar.url}`} alt="image" className='w-[60px] h-[60px] rounded-full border-[3px] border-[#0ebc88]' />
                                            </Link>
                                        </div>
                                    ) : (
                                        <>
                                            <Link to="/login" className='text-[18px] pr-[10px] text-[#000000b7]'>Login /</Link>
                                            <Link to="/sign-up" className='text-[18px] text-[#000000b7]'>Sign Up</Link>
                                        </>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default Header