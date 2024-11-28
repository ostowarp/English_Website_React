// ........ import Components ........
import { TextEditor } from "../";
// ........ import Style ........
import styles from "../../Style/cards/AddCard.module.css";

// ........ import Icons ........
import closeicon from "../../assets/icons/close.svg";
import arrowicon from "../../assets/icons/arrow2.svg";
import addicon from "../../assets/icons/add.svg";

// ........ import Swiper ........
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-flip";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { EffectFlip, Navigation } from "swiper/modules";

import { useRef, useState } from "react";
import { useParams } from "react-router-dom";

// ........ import Servicess ........
import { createFlashCard, updateFlashCard } from "../../servicess";
import useTokenStore from "../../store/useTokenstate";

export default function AddCard({
  handleAddCard,
  handleUpdate,
  cardData,
  setCardData,
  view,
}) {
  const [card, setCard] = useState(view ? cardData : "");
  const { token } = useTokenStore();
  const [frontContent, setFrontContent] = useState("");
  const [backContent, setBackContent] = useState("");
  const deckId = useParams().id;

  const swiperRef = useRef(null);

  const handleNewCard = async () => {
    try {
      if (view) {
        const { data: carddata } = await updateFlashCard(token, card.id, {
          front: card.front,
          back: card.back,
        });
      } else {
        const { data: carddata } = await createFlashCard(token, deckId, {
          front: frontContent,
          back: backContent,
        });
      }
      handleUpdate(); // for render cards
      handleAddCard(); //for close add card
    } catch (error) {
      console.log(error.message);
    }
  };

  // handle change front and back:
  const handleBackChange = (event, editor) => {
    const data = editor.getData();
    if (view) {
      setCard({ ...card, back: data });
    } else {
      setBackContent(data);
    }
  };
  const handleFrontChange = (event, editor) => {
    const data = editor.getData();
    if (view) {
      setCard({ ...card, front: data });
    } else {
      setFrontContent(data);
    }
  };
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
            <div className={styles.sidecontent}>
              <h3 className={styles.sidetext}>- Front -</h3>
              <img
                onClick={() => handleAddCard()}
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
              <span
                onClick={() => swiperRef.current?.slideNext()}
                className={styles.changeSideBtn}
                style={{ right: "2rem" }}
              >
                <p>Back</p>
                <img src={arrowicon} alt="" />
              </span>
              <div className={styles.content}>
                <TextEditor
                  data={view ? cardData.front : ""}
                  view={view}
                  handleEditorChange={handleFrontChange}
                ></TextEditor>
              </div>
              <button className={styles.addbtn} onClick={() => handleNewCard()}>
                {view ? (
                  "Update Card"
                ) : (
                  <>
                    <img src={addicon}></img> Create Card
                  </>
                )}
              </button>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={styles.sidecontent}>
              <h3 className={styles.sidetext}>- Back -</h3>
              <img
                onClick={() => handleAddCard()}
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

              <div className={styles.content}>
                <TextEditor
                  data={view ? cardData.back : ""}
                  view={view}
                  handleEditorChange={handleBackChange}
                ></TextEditor>
              </div>

              <span
                onClick={() => swiperRef.current?.slidePrev()}
                className={styles.changeSideBtn}
                style={{ left: "2rem" }}
              >
                <img style={{ rotate: "180deg" }} src={arrowicon} alt="" />
                <p>Front</p>
              </span>
              <button className={styles.addbtn} onClick={() => handleNewCard()}>
                {view ? (
                  "Update Card"
                ) : (
                  <>
                    <img src={addicon}></img> Create Card
                  </>
                )}
              </button>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
}
