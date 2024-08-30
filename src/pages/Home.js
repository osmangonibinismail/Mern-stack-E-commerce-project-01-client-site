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
      <HorizontalCardProduct category={"Handmade"} heading={"Top's Airpodes"}/>
      <HorizontalCardProduct category={"Handmade"} heading={"Popular Refrigerator"}/>
      <VerticalCardProduct  category={"Organic & Eco-Friendly"} heading={"Organic & Eco-Friendly"} />
      <VerticalCardProduct  category={"Organic & Eco-Friendly"} heading={"Mouse"} />
      <VerticalCardProduct  category={"Organic & Eco-Friendly"} heading={"telivision"} />
      <VerticalCardProduct  category={"Organic & Eco-Friendly"} heading={"camera"} />
      <VerticalCardProduct  category={"Organic & Eco-Friendly"} heading={"earphones"} />
    </div>
  )
}

export default Home;
