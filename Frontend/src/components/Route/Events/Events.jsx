import React, { useEffect } from 'react'
import styles from '../../../styles/styles';
import EventsCard from './EventsCard'
import { useDispatch, useSelector } from 'react-redux';
import { getAllEvents } from '../../../redux/actions/event';

function Events() {
  const dispatch = useDispatch();
  const { allEvents } = useSelector((state) => state.events);

  useEffect(() => {
    dispatch(getAllEvents());
  }, [dispatch]);

  console.log(allEvents);


  return (
    <div>
      <div className={`${styles.section}`}>
        <div className={`${styles.heading}`}>
          <h1>Popular Events</h1>
        </div>

        <div className='w-full grid'>
          <EventsCard />
        </div>
      </div>
    </div>
  )
}

export default Events