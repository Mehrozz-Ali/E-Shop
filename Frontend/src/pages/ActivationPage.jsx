import Activation from '../components/activation/Activation'
import { useParams } from 'react-router-dom'

function ActivationPage() {
    const {activation_token}= useParams();
    const [error ,setError] = useState();
  return (
    <Activation />
  )
}

export default ActivationPage