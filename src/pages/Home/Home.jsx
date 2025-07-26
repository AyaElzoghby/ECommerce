// import React from 'react'

import Card from "../../components/Card/Card";
import Loading from "../../components/Loading/Loading";
import { useEffect, useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import axios from "axios";
import HomeSlider from "../../components/HomeSlider/HomeSlider";
import CategorySlider from "../../components/CategorySlider/CategorySlider";
export default function Home() {
  const [products, setProducts] = useState(null);
  async function getProducts() {
    const options = {
      url: "https:/ecommerce.routemisr.com/api/v1/products",
      method: "GET",
    };
    let { data } = await axios.request(options);
    setProducts(data.data);
    console.log(data);
  }
  useEffect(() => {
    getProducts();
  }, []);
  return (
    <>
      {!products ? (
        <Loading />
      ) : (
        <>
        <HomeSlider/>
        <CategorySlider/>
        <div className="grid gap-6 lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
          {products.map((product) => (
            <Card key={product.id} productInfo={product}/>
          ))}
        </div>
        </>
      )}
    </>
  );
}
