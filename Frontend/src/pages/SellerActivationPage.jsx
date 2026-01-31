import SellerActivation from '../components/SellerActivation/SellerActivation'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { server } from '../server';
import { useParams } from 'react-router-dom'

function SellerActivationPage() {

    const { activation_token } = useParams();
    const [error, setError] = useState(false);



    useEffect(() => {
        if (activation_token) {
            const sendRequest = async () => {
                await axios.post(`${server}/shop/activation`, { activation_token })
                    .then((res) => {
                        console.log(res);
                    })
                    .catch((err) => {
                        setError(true);
                    });
            };
            sendRequest();
        }
    }, [])
    return (
        <SellerActivation error={error} />
    )
}

export default SellerActivationPage