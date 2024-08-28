import React from 'react'
import CategoryList from '../components/CategoryList';
import BannerProduct from '../components/BannerProduct';
import HorizontalCardProduct from '../components/HorizontalCardProduct';
import VerticalCardProduct from '../components/VerticalCardProduct';

const Home = () => {
  return (
    <div>
      <CategoryList />
      <BannerProduct />
      <HorizontalCardProduct category={"airpodes"} heading={"Top's Airpodes"}/>
      <HorizontalCardProduct category={"Speakers"} heading={"Popular Refrigerator"}/>
      <VerticalCardProduct  category={"mobiles"} heading={"Mobile"} />
      <VerticalCardProduct  category={"mouse"} heading={"Mouse"} />
      <VerticalCardProduct  category={"mouse"} heading={"telivision"} />
      <VerticalCardProduct  category={"mouse"} heading={"camera"} />
      <VerticalCardProduct  category={"mouse"} heading={"earphones"} />
    </div>
  )
}

export default Home;
