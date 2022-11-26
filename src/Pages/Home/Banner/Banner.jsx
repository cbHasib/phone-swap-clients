import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./Banner.css";

// import required modules
import { Autoplay, Pagination } from "swiper";

import slider1 from "../../../assets/images/banner/slide1.jpg";
import slider2 from "../../../assets/images/banner/slide2.jpg";
import slider3 from "../../../assets/images/banner/slide3.jpg";
import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";

const sliders = [
  {
    id: 1,
    img: slider1,
    title: "Resale Your Old Phone",
    subtitle:
      "PhoneSwap is the best place to Resale your old phone. We make it easy to sell your old phone and get cash for it. We buy all types of phones, including iPhones, Samsung Galaxy, Google Pixel, and more.",
  },
  {
    id: 2,
    img: slider2,
    title: "Free Classified Ads",
    subtitle:
      "Post free classified ads on PhoneSwap. We provide a simple solution to the complications involved in selling, buying, trading, discussing, organizing, and meeting people near you.",
  },

  {
    id: 3,
    img: slider3,
    title: "Buy a Used Phone",
    subtitle:
      "PhoneSwap is the best place to buy a used phone. We make it easy to buy a used phone and get cash for it. We buy all types of phones, including iPhones, Samsung Galaxy, Google Pixel, and more.",
  },
];

const Banner = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        cssMode={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination]}
        className="mySwiper"
      >
        {sliders.map((slider) => (
          <SwiperSlide key={slider.id}>
            <div className="relative w-full ">
              <img src={slider.img} alt="" />
              <div className="absolute top-0 bottom-0 right-0 left-0 w-full h-full  gradSlide text-white p-5 lg:p-20  text-center flex justify-center flex-col bg-black/10 dark:bg-black/30">
                <div className="max-w-3xl mx-auto bg-black/50 dark:bg-black/60 shadow-xl rounded-2xl p-10 lg:p-20 ">
                  <h2 className="text-3xl md:text-5xl lg:text-5xl xl:text-6xl font-bold">
                    {slider.title}
                  </h2>
                  <p className="my-7">{slider.subtitle}</p>
                  <div className="flex justify-center items-center gap-2 md:gap-5 mx-auto max-w-md flex-col md:flex-row">
                    <Button
                      className="w-1/2"
                      onClick={() => navigate("/services")}
                      color="warning"
                    >
                      Post Your Ad
                    </Button>
                    <Button
                      className="w-1/2"
                      onClick={() => navigate("/contact")}
                    >
                      Find Phone
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
