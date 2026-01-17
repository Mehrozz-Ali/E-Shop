import React from 'react'
import Header from '../Layout/Header';
import Hero from '../Route/Hero/Hero';
import Categories from '../Route/Categories/Categories';

function Home() {
  return (
    <div>
      <Header activeHeading={1} />
      <Hero />
      <Categories />
    </div>
  )
}

export default Home