import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Loading from "../Loading/Loading";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../../index.css";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

function CategorySlider() {
  const [categories, setCategories] = useState(null);
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty("--progress", 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };
  async function getCategories() {
    const options = {
      url: "https:/ecommerce.routemisr.com/api/v1/categories",
      method: "GET",
    };
    let { data } = await axios.request(options);
    setCategories(data.data);
    console.log(data.data);
  }
  useEffect(() => {
    getCategories();
  }, []);
  return (
    <>
      <h2 className="text-xl text-slate-600 font-tmedium ">
        Shop Popular Categories
      </h2>
      {!categories ? (
        <Loading />
      ) : (
        <section className="mt-8 py-6">
          <Swiper
            slidesPerView={1}
            loop={true}
            spaceBetween={5}
            style={{ paddingBottom: "50px" }} // Adds space for pagination

            pagination={{
              clickable: true,
              
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 40,
              },
              1024: {
                slidesPerView: 5,
                spaceBetween: 50,
              },
            }}
            modules={[Autoplay, Pagination, Navigation]}
            onAutoplayTimeLeft={onAutoplayTimeLeft}
            autoplay={{
              delay: 2500, // 2.5 seconds
              disableOnInteraction: true, // Keeps autoplay active even when interacting with the swiper
            }}
          >
            {categories.map((category) => (
              <SwiperSlide key={category._id} className="cursor-pointer">
                <div className="h-64 relative  group/card  hover:scale-105 rounded-sm shadow-lg">
                  <img
                    className="h-full w-full object-cover"
                    src={category.image}
                    alt=""
                  />
                  <div className="layer group-hover/card:opacity-100 transition-opacity duration-300 flex gap-4 justify-center items-center absolute w-full h-full bg-mainColor-400 bg-opacity-40 left-0 top-0 opacity-0 ">
                    <h3 className="text-white font-tmedium">{category.name}</h3>
                  </div>
                </div>
              </SwiperSlide>
            ))}
            <div className="autoplay-progress" slot="container-end">
              <svg viewBox="0 0 48 48" ref={progressCircle}>
                <circle cx="24" cy="24" r="20"></circle>
              </svg>
              <span ref={progressContent}></span>
            </div>
          </Swiper>
        </section>
      )}
    </>
  );
}

export default CategorySlider;
