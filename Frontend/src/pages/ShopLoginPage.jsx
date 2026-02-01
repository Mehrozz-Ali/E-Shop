import { useNavigate } from 'react-router-dom';
import ShopLogin from '../components/ShopLogin/ShopLogin.jsx';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

function ShopLoginPage() {
    const { isSeller, isLoading } = useSelector((state) => state.seller);
    const navigate = useNavigate();
    useEffect(() => {
        if (isSeller === true) {
            navigate(`/dashboard`);
        }
    }, [isLoading, isSeller])
    return (
        <div>
            <ShopLogin />
        </div>
    )
}

export default ShopLoginPage