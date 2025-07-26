import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Loading from "../../components/Loading/Loading";
import { useParams } from "react-router-dom";
import { CartContext } from "../../context/Cart.context";
import ImageGallery from "react-image-gallery";
import { Swiper, SwiperSlide } from "swiper/react";
import Card from "../../components/Card/Card";
import "swiper/css";

function ProductDetails() {
  const [ProductDetails, setProductDetails] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState(null);
  let { id } = useParams();
  const { AddProductToCart } = useContext(CartContext);
  async function getProductDetails() {
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/products/${id}`,
        method: "GET",
      };
      let { data } = await axios.Axios.request(options);
      setProductDetails(data.data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function getRelatedProducts() {
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/products?category[in]=${ProductDetails.category._id}`,
        method: "GET",
      };
      let { data } = await axios.Axios.request(options);
      setRelatedProducts(data.data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProductDetails();
  }, []);
  useEffect(() => {
    if (ProductDetails === null) return;
    getRelatedProducts();
  }, [ProductDetails]);
  return (
    <>
      {ProductDetails ? (
        <>
          <section className="grid grid-cols-12 gap-12">
            <div className="col-span-3">
              <ImageGallery
                showFullscreenButton={false}
                showPlayButton={false}
                showNav={false}
                items={ProductDetails.images.map((image) => {
                  return {
                    original: image,
                    thumbnail: image,
                  };
                })}
              />

              <img src={ProductDetails.imageCover} alt="" className="w-full" />
            </div>
            <div className="col-span-9 space-y-4">
              <div className="">
                <h2 className="text-2xl font-tmedium text-gray-600">
                  {ProductDetails.title}
                </h2>
                <h3 className="text-mainColor-600">
                  {ProductDetails.category.name}
                </h3>
              </div>
              <p className="text-gray-400">{ProductDetails.description}</p>
              <div className="flex justify-between items-center">
                <span>{ProductDetails.price}</span>
                <div className="flex gap-3 items-center">
                  <i className="fa-solid fa-star"></i>
                  <span>{ProductDetails.ratingsAverage}</span>
                </div>
              </div>
              <button
                onClick={() => {
                  AddProductToCart({ productId: id });
                }}
                className="btn bg-mainColor-500 hover:bg-mainColor-600 text-white font-tmedium w-full"
              >
                Add To Cart
              </button>
            </div>
          </section>
          <section>
            <h2 className="text-2xl font-tmedium text-gray-600 mt-12 mb-6">Related Products</h2>
            {relatedProducts ? (
              <Swiper slidesPerView={6} spaceBetween={15}>
                {relatedProducts.map((product) => (
                  <SwiperSlide key={product.id}>
                    <Card productInfo={product}/>
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <Loading />
            )}
          </section>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default ProductDetails;
