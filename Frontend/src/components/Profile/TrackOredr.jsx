// import React, { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom';
// import { getAllOrdersOfUser } from '../../redux/actions/order';

// function TrackOredr() {

//     const { orders } = useSelector((state) => state.order);
//     const { user } = useSelector((state) => state.user);
//     const dispatch = useDispatch();

//     const { id } = useParams();

//     useEffect(() => {
//         dispatch(getAllOrdersOfUser(user._id))
//     }, [dispatch, user._id])

//     const data = orders && orders.find((item) => item._id === id);



//     return (
//         <div className="w-full h-[80vh] flex justify-center items-center bg-gray-100">
//             <>
//                 {!data ? (
//                     <h1 className="text-[20px]">Loading...</h1>

//                 ) : data.status === "Processing refund" ? (
//                     <div className="bg-white shadow-md rounded-xl p-6 w-[90%] max-w-md text-center">
//                         <h1 className="text-[20px] font-semibold text-gray-800 mb-2">
//                             Your order is being processed
//                         </h1>
//                         <p className="text-sm text-gray-500">
//                             Refund is in progress. Please wait a little while.
//                         </p>
//                         <div className="mt-4">
//                             <span className="px-4 py-1 text-sm rounded-full bg-red-100 text-red-600">
//                                 Processing Refund
//                             </span>
//                         </div>
//                     </div>

//                 ) : data.status === "Transferred to delivery partner" ? (
//                     <div className="bg-white shadow-[0_10px_30px_rgba(0,0,0,0.2)] rounded-xl p-6 w-[90%] max-w-md text-center">
//                         <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-full bg-blue-100">
//                             <span className="text-blue-600 text-2xl">🚚</span>
//                         </div>

//                         <h1 className="text-[20px] font-semibold text-gray-800 mb-2">
//                             Your Order is on the way!!
//                         </h1>

//                         <p className="text-sm text-gray-500">
//                             Your package has been handed over to the delivery partner and is on its way.
//                         </p>

//                         <div className="mt-4">
//                             <span className="px-4 py-1 text-sm rounded-full bg-blue-100 text-blue-600">
//                                 Shipped
//                             </span>
//                         </div>
//                     </div>

//                 ) : data.status === "Shipping" ? (
//                     <h1 className="text-[20px]">
//                         Your order is coming with our delivery partner
//                     </h1>

//                 ) : data.status === "Received" ? (
//                     <h1 className="text-[20px]">
//                         Your order is in your city. Our delivery partner will deliver it soon.
//                     </h1>

//                 ) : data.status === "On the way" ? (
//                     <h1 className="text-[20px]">
//                         Your order is on route to deliver you
//                     </h1>

//                 ) : data.status === "Delivered" ? (
//                     <h1 className="text-[20px]">
//                         Your order is delivered
//                     </h1>

//                 ) : data.status === "Refund Success" ? (
//                     <h1 className="text-[20px]">
//                         Your refund is complete
//                     </h1>

//                 ) : (
//                     <h1 className="text-[20px]">
//                         Unknown status
//                     </h1>
//                 )}
//             </>
//         </div>
//     );




// }

// export default TrackOredr



import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAllOrdersOfUser } from '../../redux/actions/order';

function TrackOredr() {

    const { orders } = useSelector((state) => state.order);
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        if (user?._id) {
            dispatch(getAllOrdersOfUser(user._id));
        }
    }, [dispatch, user?._id]);

    const data = orders?.find((item) => item._id === id);

    if (!data) {
        return (
            <div className="w-full h-[80vh] flex justify-center items-center">
                <h1 className="text-[20px]">Loading...</h1>
            </div>
        );
    }

    const renderStatusContent = () => {
        switch (data.status) {

            case "Processing refund":
                return (
                    <div className="bg-white shadow-md rounded-xl p-6 w-[90%] max-w-md text-center">
                        <h1 className="text-[20px] font-semibold mb-2">
                            Your order is being processed
                        </h1>
                        <p className="text-sm text-gray-500">
                            Refund is in progress. Please wait a little while.
                        </p>
                        <div className="mt-4">
                            <span className="px-4 py-1 text-sm rounded-full bg-red-100 text-red-600">
                                Processing Refund
                            </span>
                        </div>
                    </div>
                );

            case "Transferred to delivery partner":
                return (
                    <div className="bg-white shadow-md rounded-xl p-6 w-[90%] max-w-md text-center">
                        <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-full bg-blue-100">
                            <span className="text-blue-600 text-2xl">🚚</span>
                        </div>

                        <h1 className="text-[20px] font-semibold mb-2">
                            Your Order is on the way!!
                        </h1>

                        <p className="text-sm text-gray-500">
                            Your package has been handed over to the delivery partner.
                        </p>

                        <div className="mt-4">
                            <span className="px-4 py-1 text-sm rounded-full bg-blue-100 text-blue-600">
                                Shipped
                            </span>
                        </div>
                    </div>
                );

            case "Shipping":
                return <h1 className="text-[20px]">Your order is coming with our delivery partner</h1>;

            case "Received":
                return <h1 className="text-[20px]">Your order is in your city. It will be delivered soon.</h1>;

            case "On the way":
                return <h1 className="text-[20px]">Your order is on route to deliver you</h1>;

            case "Delivered":
                return <h1 className="text-[20px]">Your order is delivered</h1>;

            case "Processing refund":
                return <h1 className="text-[20px]">Your order is processing!. Please wait...</h1>;

            case "Refund Success":
                return <h1 className="text-[20px]">Your refund is complete</h1>;

            default:
                return <h1 className="text-[20px]">Unknown status</h1>;
        }
    };

    return (
        <div className="w-full h-[80vh] flex justify-center items-center bg-gray-100">
            {renderStatusContent()}
        </div>
    );
}

export default TrackOredr;
