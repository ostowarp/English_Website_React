// importt server URL:
import { getServerUrl } from "../../servicess";

// import icons:
import arrow from "../../assets/icons/arrow.svg";

// import style:
import styles from "../../Style/decks/DeckSlider.module.css";

// import components:
import { DeckTop } from "..";

import Grid from "@mui/material/Grid2";

import { useState, useRef, useEffect } from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
// import required modules
import { Navigation } from "swiper/modules";

// import golobal state:
import useTokenStore from "../../store/useTokenstate";

// import servicess:
import { getDecks } from "../../servicess";

export default function DeckSlider() {
  const [loading, setLoading] = useState(false);
  const serverUrl = getServerUrl();
  const swiperRef = useRef(null);
  const { token } = useTokenStore();
  const [dueDecks, setDueDecks] = useState([]);
  useEffect(() => {
    const fetchAllDecks = async () => {
      try {
        const { data: dueDecksData } = await getDecks(token, false);
        if (dueDecksData.length > 0) {
          setDueDecks(dueDecksData);
          console.log(dueDecksData);
        } else {
          // اگر داده‌ای برای dueDecks وجود نداشته باشد، ۵ عدد اول از allDecks را بگیرید
          const { data: dueDecksData2 } = await getDecks(token, true);
          setDueDecks(dueDecksData2.slice(0, 5));
        }
        setLoading(false); // داده‌ها دریافت شده، بارگذاری تمام شد
      } catch (error) {
        console.error("Error fetching decks:", error.message);
        setLoading(false); // در صورت بروز خطا نیز بارگذاری تمام می‌شود
      }
    };
    if (token) {
      fetchAllDecks();
    }
  }, [token]);

  if (loading) {
    return <div className={styles.loading}>در حال بارگذاری...</div>;
  }

  return (
    <div className={styles.slidercontent}>
      <Grid
        style={{ display: dueDecks.length ? "" : "none" }}
        container
        spacing={2}
      >
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
            {dueDecks.map((due) => (
              <SwiperSlide key={due.id}>
                <DeckTop
                  id={due.id}
                  language={due.language}
                  name={due.name}
                  description={due.description || due.language}
                  percent={due.completed_cards}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </Grid>
      </Grid>

      {/* <h1>button</h1> */}
    </div>
  );
}
