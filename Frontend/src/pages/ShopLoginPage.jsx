import { useNavigate } from 'react-router-dom';
import ShopLogin from '../components/ShopLogin/ShopLogin.jsx';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

function ShopLoginPage() {
    const { seller, isSeller } = useSelector((state) => state.seller);
    const navigate = useNavigate();
    useEffect(() => {
        if (isSeller === true) {
            navigate(`/shop/${seller._id}`);
        }
    }, [])
    return (
        <div>
            <ShopLogin />
        </div>
    )
}

export default ShopLoginPage