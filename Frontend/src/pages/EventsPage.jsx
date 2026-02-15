import React from 'react'
import EventsCard from '../components/Route/Events/EventsCard';
import Header from '../components/Layout/Header';

function EventsPage() {
    return (
        <div>
            <Header activeHeading={4} />
            <EventsCard active={true} />

        </div>
    )
}

export default EventsPage