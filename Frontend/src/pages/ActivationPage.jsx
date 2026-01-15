import { useEffect, useState } from 'react';
import axios from 'axios';
import server from '../server';
import Activation from '../components/activation/Activation'
import { useParams } from 'react-router-dom'

// import { server } from '../server';



function ActivationPage() {
  const { activation_token } = useParams();
  const [error, setError] = useState(false);



  useEffect(() => {
    if (activation_token) {
      const sendRequest = async () => {
        await axios.post(`${server}/user/activation`, { activation_token })
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
    <Activation error={error} />
  )
}

export default ActivationPage