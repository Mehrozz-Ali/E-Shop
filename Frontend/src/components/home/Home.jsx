import React from 'react'
import Header from '../Layout/Header';
import Hero from '../Route/Hero/Hero';
import Categories from '../Route/Categories/Categories';
import BestDeals from '../Route/BestDeals/BestDeals';
import FeaturedProduct from '../Route/FeaturedProduct/FeaturedProduct';
import Events from '../Route/Events/Events';


function Home() {
  return (
    <div>
      <Header activeHeading={1} />
      <Hero />
      <Categories />
      <BestDeals />
      <Events />
      <FeaturedProduct />
    </div>
  )
}

export default Home