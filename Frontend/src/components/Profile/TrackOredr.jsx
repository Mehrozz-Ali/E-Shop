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
        dispatch(getAllOrdersOfUser(user._id))
    }, [dispatch, user._id])

    const data = orders && orders.find((item) => item._id === id);
    console.log(data);


    return (
        <div>TrackOredr</div>
    )
}

export default TrackOredr