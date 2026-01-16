import React from 'react'
import Header from '../Layout/Header';
import Hero from '../Route/Hero/Hero'

function Home() {
  return (
    <div>
      <Header activeHeading={1} />
      <Hero />
    </div>
  )
}

export default Home