// ........ import Style ........
import Box from "@mui/material/Box";

// ........ import Style ........
import styles from "../../Style/cards/TrainCard.module.css";
import "./traincard.css";
// ........ import Icons ........
import closeicon from "../../assets/icons/close.svg";
import arrowicon from "../../assets/icons/arrow2.svg";
// reviews Icons:
import aginicon from "../../assets/icons/review/agin.svg";
import hardicon from "../../assets/icons/review/hard.svg";
import goodicon from "../../assets/icons/review/good.svg";
import easyicon from "../../assets/icons/review/easy.svg";

// ........ import Swiper ........
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-flip";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { EffectFlip, Navigation } from "swiper/modules";

// ........ import Servicess ........
import { review_flashcard } from "../../servicess";

import { useRef, useState } from "react";
import useTokenStore from "../../store/useTokenstate";

export default function TrainCard({
  card,
  setStartTraining,
  prevCard,
  nextCard,
}) {
  const { token } = useTokenStore();
  const reviewCard = async (reviewRate) => {
    try {
      const { data: reviewdata } = await review_flashcard(token, card.id, {
        review_rating: reviewRate,
      });
      console.log(reviewdata);
      nextCard();
    } catch (error) {
      console.log(error.message);
    }
  };

  const swiperRef = useRef(null);
  return (
    <>
      <div className={styles.container}>
        <Swiper
          slidesPerView={1}
          // ref={swiperRef}
          effect={"flip"}
          style={{ minWidth: "38.6rem", width: "34vw" }}
          modules={[EffectFlip, Navigation]}
          allowTouchMove={false}
          onSwiper={(swiper) => (swiperRef.current = swiper)} // تنظیم مرجع برای Swiper
          className="mySwiper"
        >
          <SwiperSlide>
            <div style={{ width: "100%", height: "100%" }}>
              <div
                style={{ cursor: "pointer" }}
                onClick={() => swiperRef.current?.slideNext()}
                className={styles.sidecontent}
              >
                <h3 className={styles.sidetext}>- Front -</h3>
                <img
                  onClick={() => {
                    setStartTraining();
                  }}
                  style={{
                    position: "absolute",
                    top: "2rem",
                    right: "2rem",
                    cursor: "pointer",
                    zIndex: "12",
                  }}
                  src={closeicon}
                  alt="close"
                />
                <div className={styles.editor} style={{ width: "100%" }}>
                  <div className="editortrain">
                    <div dangerouslySetInnerHTML={{ __html: card.front }} />
                  </div>
                </div>
              </div>
              {/* <span
                onClick={() => prevCard()}
                className={styles.changeSideBtn}
                style={{ left: "2rem" }}
              >
                <img style={{ rotate: "180deg" }} src={arrowicon} alt="" />
                <Box
                  sx={{
                    display: {
                      xl: "block",
                      lg: "none",
                      md: "none",
                      xs: "none",
                    },
                  }}
                >
                  <p>Prev Card</p>
                </Box>
              </span>
              <span
                onClick={() => nextCard()}
                className={styles.changeSideBtn}
                style={{ right: "2rem" }}
              >
                <Box
                  sx={{
                    display: {
                      xl: "block",
                      lg: "none",
                      md: "none",
                      xs: "none",
                    },
                  }}
                >
                  <p>Next Card</p>
                </Box>
                <img src={arrowicon} alt="" />
              </span> */}
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div style={{ width: "100%", height: "100%" }}>
              <div
                style={{ cursor: "pointer" }}
                onClick={() => swiperRef.current?.slidePrev()}
                className={styles.sidecontent}
              >
                <h3 className={styles.sidetext}>- Back -</h3>
                <img
                  onClick={() => setStartTraining()}
                  style={{
                    position: "absolute",
                    top: "2rem",
                    right: "2rem",
                    cursor: "pointer",
                    zIndex: "12",
                  }}
                  src={closeicon}
                  alt="close"
                />

                <div className={styles.editor} style={{ width: "100%" }}>
                  <div className="editortrain">
                    <div dangerouslySetInnerHTML={{ __html: card.back }} />
                  </div>
                </div>
              </div>
              <span className={styles.reviews}>
                <span
                  onClick={() => reviewCard("A")}
                  className={styles.reviewicon}
                >
                  <img src={aginicon} alt="agin" />
                  <p>Agin</p>
                </span>
                <span
                  onClick={() => reviewCard("H")}
                  className={styles.reviewicon}
                >
                  <img src={hardicon} alt="hard" />
                  <p>Hard</p>
                </span>
                <span
                  onClick={() => reviewCard("G")}
                  className={styles.reviewicon}
                >
                  <img src={goodicon} alt="good" />
                  <p>Good</p>
                </span>
                <span
                  onClick={() => reviewCard("E")}
                  className={styles.reviewicon}
                >
                  <img src={easyicon} alt="easy" />
                  <p>Easy</p>
                </span>
              </span>
              {/* <span
                onClick={() => prevCard()}
                className={styles.changeSideBtn}
                style={{ left: "2rem" }}
              >
                <img style={{ rotate: "180deg" }} src={arrowicon} alt="" />
                <Box
                  sx={{
                    display: {
                      xl: "block",
                      lg: "none",
                      md: "none",
                      xs: "none",
                    },
                  }}
                >
                  <p>Prev Card</p>
                </Box>
              </span>
              <span
                onClick={() => nextCard()}
                className={styles.changeSideBtn}
                style={{ right: "2rem" }}
              >
                <Box
                  sx={{
                    display: {
                      xl: "block",
                      lg: "none",
                      md: "none",
                      xs: "none",
                    },
                  }}
                >
                  <p>Next Card</p>
                </Box>
                <img src={arrowicon} alt="" />
              </span> */}
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
}
