// import icons:
import arrow from "../../assets/icons/arrow.svg";

// import style:
import styles from "../../Style/decks/DeckSlider.module.css";

// import components:
import { DeckTop } from "..";

import Grid from "@mui/material/Grid2";

import { useState, useRef } from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
// import required modules
import { Navigation } from "swiper/modules";

export default function DeckSlider() {
  const swiperRef = useRef(null);

  return (
    <div className={styles.slidercontent}>
      <Grid container spacing={2}>
        <Grid order={2} size={2} className={styles.btns}>
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className={styles.arrowbtn}
          >
            <img src={arrow} alt="" />
          </button>
          <button
            onClick={() => swiperRef.current?.slideNext()}
            className={`${styles.arrowbtn} ${styles.arrowright}`}
          >
            <img src={arrow} alt="" />
          </button>
        </Grid>
        <Grid size={10}>
          <Swiper
            style={{ borderRadius: "1.4rem" }}
            onSwiper={(swiper) => (swiperRef.current = swiper)} // ذخیره رفرنس به Swiper
            modules={[Navigation]}
            spaceBetween={300}
            slidesPerView={1}
            className="mySwiper"
          >
            <SwiperSlide>
              <DeckTop
                imgsrc={"src"}
                name={"spanish b2"}
                description={"Taken from Lucy Movie"}
                percent={90}
              />
            </SwiperSlide>
            <SwiperSlide>
              <DeckTop
                imgsrc={"src"}
                name={"spanish b2"}
                description={"Taken from Lucy Movie"}
                percent={90}
              />
            </SwiperSlide>
            <SwiperSlide>
              <DeckTop
                imgsrc={"src"}
                name={"spanish b2"}
                description={"Taken from Lucy Movie"}
                percent={90}
              />
            </SwiperSlide>
          </Swiper>
        </Grid>
      </Grid>

      {/* <h1>button</h1> */}
    </div>
  );
}
