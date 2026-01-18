import React from 'react'
import styles from '../../../styles/styles';
import EventsCard from './EventsCard'

function Events() {
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