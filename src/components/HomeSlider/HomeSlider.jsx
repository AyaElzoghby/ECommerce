import SliderImg1 from "../../assets/images/slider-image-1.jpeg";
import SliderImg2 from "../../assets/images/slider-image-2.jpeg";
import SliderImg3 from "../../assets/images/slider-image-3.jpeg";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { useRef } from "react"; // Import useRef for controlling Swiper

// Import Swiper styles
import "swiper/css";

function HomeSlider() {
  const swiperRef = useRef(null); // Create a ref for Swiper

  const handleSlideClick = (index) => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideTo(index); // Move to the clicked slide
    }
  };

  return (
    <section className="grid grid-cols-12 my-12">
      <div className="col-span-8">
        <Swiper
          className="w-full h-full object-cover"
          //   ref={swiperRef} // Attach the ref to Swiper
          loop={true}
        >
          <SwiperSlide
            onClick={() => handleSlideClick(2)}
            className="w-full h-full cursor-pointer"
          >
            <img
              className="w-full h-full object-cover"
              src={SliderImg3}
              alt="Description of image 3"
            />
          </SwiperSlide>
          <SwiperSlide
            onClick={() => handleSlideClick(2)}
            className="w-full h-full cursor-pointer"
          >
            <img
              className="w-full h-full object-cover"
              src={SliderImg3}
              alt="Description of image 3"
            />
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="col-span-4">
        <img className="w-full" src={SliderImg1} alt="Description of image 1" />
        <img className="w-full" src={SliderImg2} alt="Description of image 2" />
      </div>
    </section>
  );
}

export default HomeSlider;
