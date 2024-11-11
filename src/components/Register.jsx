import styles from "../Style/Register.module.css";

// Note: import formic:

// Note: import icon from assets:
import emailicon from "../assets/icons/email.svg";
import facebookicon from "../assets/icons/facebook.svg";
import leftHand from "../assets/hand-left.svg";
import rightHand from "../assets/hand-right.svg";
import RocketBg from "../assets/Rocket.svg";

import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-flip";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { EffectFlip, Pagination, Navigation } from "swiper/modules";

// NOTE import text filde from MUI:
import { TextField } from "@mui/material";
import Grid from "@mui/material/Grid2";
export default function () {
  return (
    <>
      <div
        className={styles.container}
        style={{
          backgroundImage: `url(${RocketBg})`,
        }}
      >
        <img className={styles.lefthand} src={leftHand} alt="" />
        <img className={styles.righthand} src={rightHand} alt="" />
        <div>
          <Swiper
            effect={"flip"}
            style={{ minWidth: "386px", width: "34vw" }}
            modules={[EffectFlip, Pagination, Navigation]}
            className="mySwiper"
          >
            <SwiperSlide className={styles.card}>
              <form action="">
                <Grid container spacing={2} style={{ margin: "2.4rem 2rem" }}>
                  <Grid size={2} offset={5}>
                    <img
                      src="logo.png"
                      alt=""
                      style={{ filter: "invert(100%)", width: "100%" }}
                    />
                  </Grid>
                  <Grid size={12} style={{ height: "4.8rem" }}></Grid>

                  <Grid size={12}>
                    <h3
                      style={{
                        fontSize: "2.4rem",
                        fontFamily: "var(--rooney-Heavy)",
                      }}
                    >
                      Login
                    </h3>
                  </Grid>

                  <Grid container size={12}>
                    <Grid size={12}>
                      <input
                        type="text"
                        className={styles.searchinput}
                        placeholder="UserName*"
                      />
                    </Grid>
                    <Grid size={12}>
                      <input
                        type="password"
                        className={styles.searchinput}
                        placeholder="Password*"
                      />
                    </Grid>

                    <Grid size={12}>
                      <p className={styles.tologin}>
                        Don't have an account?{" "}
                        <span className={styles.loginbtn}>SignUp</span>
                      </p>
                    </Grid>
                    <Grid size={12} style={{ height: "4.8rem" }}></Grid>
                    <Grid size={12} style={{ height: "4.8rem" }}></Grid>
                  </Grid>
                  <Grid container rowSpacing={1} columnSpacing={2} size={12}>
                    <input
                      type="submit"
                      className={styles.btn}
                      value={"Login"}
                    />
                    <Grid size={12}>
                      <h3 className={styles.registerwith}>
                        --- Login with ---
                      </h3>
                    </Grid>
                    <Grid size={6} className={styles.emailbtn}>
                      <img src={emailicon} alt="" />
                      <p>Email</p>
                    </Grid>
                    <Grid size={6} className={styles.emailbtn}>
                      <img src={facebookicon} alt="" />
                      <p>facebook</p>
                    </Grid>
                  </Grid>
                </Grid>
              </form>
            </SwiperSlide>
            <SwiperSlide className={styles.card}>
              <form action="">
                <Grid container spacing={2} style={{ margin: "2.4rem 2rem" }}>
                  <Grid size={2} offset={5}>
                    <img
                      src="logo.png"
                      alt=""
                      style={{ filter: "invert(100%)", width: "100%" }}
                    />
                  </Grid>
                  <Grid size={12}>
                    <h3
                      style={{
                        fontSize: "2.4rem",
                        fontFamily: "var(--rooney-Heavy)",
                      }}
                    >
                      Sign Up
                    </h3>
                  </Grid>
                  <Grid container size={12}>
                    <Grid size={6}>
                      <input
                        type="text"
                        className={styles.searchinput}
                        placeholder="First Name*"
                      />
                    </Grid>
                    <Grid size={6}>
                      <input
                        type="text"
                        className={styles.searchinput}
                        placeholder="Last Name*"
                      />
                    </Grid>
                    <Grid size={12}>
                      <input
                        type="text"
                        className={styles.searchinput}
                        placeholder="UserName*"
                      />
                    </Grid>
                    <Grid size={12}>
                      <input
                        type="email"
                        className={styles.searchinput}
                        placeholder="Email*"
                      />
                    </Grid>
                    <Grid size={12}>
                      <input
                        type="password"
                        className={styles.searchinput}
                        placeholder="Password*"
                      />
                    </Grid>
                    <Grid size={12}>
                      <input
                        type="password"
                        className={styles.searchinput}
                        placeholder="Re Password*"
                      />
                    </Grid>
                    <Grid size={12}>
                      <p className={styles.tologin}>
                        You have already registered?{" "}
                        <span className={styles.loginbtn}>login</span>
                      </p>
                    </Grid>
                  </Grid>
                  <Grid container rowSpacing={1} columnSpacing={2} size={12}>
                    <input
                      type="submit"
                      className={styles.btn}
                      value={"Register"}
                    />
                    <Grid size={12}>
                      <h3 className={styles.registerwith}>
                        --- Register with ---
                      </h3>
                    </Grid>
                    <Grid size={6} className={styles.emailbtn}>
                      <img src={emailicon} alt="" />
                      <p>Email</p>
                    </Grid>
                    <Grid size={6} className={styles.emailbtn}>
                      <img src={facebookicon} alt="" />
                      <p>facebook</p>
                    </Grid>
                  </Grid>
                </Grid>
              </form>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </>
  );
}
