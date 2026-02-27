import Header from '../components/Layout/Header';
import Checkout from '../components/Checkouot/Checkout';
import CheckoutSteps from '../components/Checkouot/CheckoutSteps';
import Footer from '../components/Layout/Footer';

const CheckoutPage = () => {
    return (
        <div>
            <Header />
            <br />
            <br />
            <CheckoutSteps active={1} />
            <Checkout />
            <br />
            <br />
            <Footer />
        </div>
    )
}

export default CheckoutPage