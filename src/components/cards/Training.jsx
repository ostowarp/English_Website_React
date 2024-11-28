// ........ import Components ........
import { TrainCard } from "../";

// ........ import Style ........
import styles from "../../Style/cards/AddCard.module.css";


// ........ import Icons ........
import closeicon from "../../assets/icons/close.svg";
import arrowicon from "../../assets/icons/arrow2.svg";

// ........ import Swiper ........
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-flip";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { EffectCards, Navigation } from "swiper/modules";

import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

// ........ import Servicess ........
import { getFlashCards } from "../../servicess";
import useTokenStore from "../../store/useTokenstate";

export default function Training({ setStartTraining , update }) {
  const { token } = useTokenStore();
  const deckId = useParams().id;
  const [dueCards, setDueCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const swiperRef = useRef(null);

  const fetchDueCards = async () => {
    try {
      setLoading(true);
      const { data: dueDeckData } = await getFlashCards(token, deckId, false);
      setDueCards(dueDeckData);
      console.log(dueDeckData);
      setLoading(false);
    } catch (error) {
      setLoading(true);
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchDueCards();
  }, [token]);

  return (
    <>
      <div className={styles.container}>
        <Swiper
          slidesPerView={1}
          effect={"cards"}
          style={{ minWidth: "38.6rem", width: "34vw", overflow: "visible" }}
          modules={[EffectCards, Navigation]}
          allowTouchMove={false}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          className="mySwiper"
        >
          {dueCards
            ? dueCards.map((card) => {
                return (
                  <SwiperSlide key={card.id}>
                    <TrainCard
                      card={card}
                      nextCard={() => {
                        swiperRef.current?.slideNext();
                      }}
                      prevCard={() => {
                        swiperRef.current?.slidePrev();
                      }}
                      setStartTraining={() => setStartTraining()}
                    ></TrainCard>
                  </SwiperSlide>
                );
              })
            : ""}
        </Swiper>
      </div>
    </>
  );
}
