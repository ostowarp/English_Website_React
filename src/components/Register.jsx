// import contexts:
import { useAuth } from "../contexts/AuthContext";

// NOTE: API:
import { registerUser, loginUser, getProfile } from "../servicess";

import styles from "../Style/Register.module.css";

import { useRef } from "react";

// Note: import formic:
import { useFormik } from "formik";
import * as Yup from "yup";

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
import Grid from "@mui/material/Grid2";
import { useNavigate } from "react-router-dom";
import useTokenStore from "../store/useTokenstate";

// LOGIN formic:
const loginValidationSchema = Yup.object({
  username: Yup.string().required("UserName is required"),
  password: Yup.string().required("Password is required"),
});

// SIGNIN formic:
const signupValidationSchema = Yup.object({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  username: Yup.string().required("UserName is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

export default function Register() {
  const { handleLogin } = useAuth();
  const { setToken } = useTokenStore();
  const navigate = useNavigate();
  const swiperRef = useRef(null);

  // setting of login form:
  const loginFormik = useFormik({
    initialValues: { username: "", password: "" },
    validationSchema: loginValidationSchema,
    validateOnChange: false, // اعتبارسنجی در هنگام تغییر فیلد غیرفعال است
    validateOnBlur: false, // اعتبارسنجی در هنگام خروج از فیلد غیرفعال است
    onSubmit: async (values) => {
      try {
        const response = await loginUser({
          username: values.username,
          password: values.password,
        });

        // Save token in local storeg:
        const token = response.data.access;
        setToken(token);
        handleLogin(token);

        console.log("Login successful:", response.data);

        if (response.status === 200) {
          // NOTE اینجا کد ارسال به صفحه هوم رو بنویس
          navigate("/dashboard");
        }
      } catch (error) {
        console.error("Error during signup:", error);
      }
      console.log("Login values", values);
    },
  });

  // setting of signup form:
  const signupFormik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validateOnChange: false, // اعتبارسنجی در هنگام تغییر فیلد غیرفعال است
    validateOnBlur: false, // اعتبارسنجی در هنگام خروج از فیلد غیرفعال است
    validationSchema: signupValidationSchema,
    onSubmit: async (values) => {
      try {
        const response = await registerUser({
          first_name: values.firstName,
          last_name: values.lastName,
          username: values.username,
          email: values.email,
          password: values.password,
        });
        console.log("Signup successful:", response.data);

        if (swiperRef.current) {
          swiperRef.current.slideTo(0);
        }
      } catch (error) {
        console.error("Error during signup:", error);
      }
    },
  });

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
            slidesPerView={1}
            ref={swiperRef}
            effect={"flip"}
            style={{ minWidth: "386px", width: "34vw" }}
            modules={[EffectFlip, Navigation]}
            allowTouchMove={false}
            onSwiper={(swiper) => (swiperRef.current = swiper)} // تنظیم مرجع برای Swiper
            className="mySwiper"
          >
            <SwiperSlide className={styles.card}>
              <form onSubmit={loginFormik.handleSubmit}>
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
                    <Grid style={{ position: "relative" }} size={12}>
                      <input
                        name="username"
                        type="text"
                        className={styles.input}
                        placeholder="UserName*"
                        onChange={loginFormik.handleChange}
                        value={loginFormik.values.username}
                        style={{
                          border:
                            loginFormik.touched.username &&
                            loginFormik.errors.username
                              ? "solid red 2px"
                              : "",
                        }}
                      />
                      {/* show error: */}
                      {loginFormik.touched.username &&
                        loginFormik.errors.username && (
                          <p className={styles.errorText}>
                            {loginFormik.errors.username}
                          </p>
                        )}
                    </Grid>
                    <Grid style={{ position: "relative" }} size={12}>
                      <input
                        name="password"
                        type="password"
                        className={styles.input}
                        placeholder="Password*"
                        onChange={loginFormik.handleChange}
                        value={loginFormik.values.password}
                        style={{
                          border:
                            loginFormik.touched.password &&
                            loginFormik.errors.password
                              ? "solid red 2px"
                              : "",
                        }}
                      />
                      {/* show error: */}
                      {loginFormik.touched.password &&
                        loginFormik.errors.password && (
                          <p className={styles.errorText}>
                            {loginFormik.errors.password}
                          </p>
                        )}
                    </Grid>

                    <Grid size={12}>
                      <p className={styles.tologin}>
                        Don't have an account?{" "}
                        <span
                          onClick={() => swiperRef.current?.slideNext()}
                          className={styles.loginbtn}
                        >
                          SignUp
                        </span>
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
              <form onSubmit={signupFormik.handleSubmit}>
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
                        name="firstName"
                        type="text"
                        className={styles.input}
                        placeholder="First Name*"
                        onChange={signupFormik.handleChange}
                        value={signupFormik.values.firstName}
                        style={{
                          border:
                            signupFormik.touched.firstName &&
                            signupFormik.errors.firstName
                              ? "solid red 2px"
                              : "",
                        }}
                      />
                      {/* show error: */}
                      {signupFormik.touched.firstName &&
                        signupFormik.errors.firstName && (
                          <p
                            className={styles.errorText}
                            style={{ left: "2.8rem" }}
                          >
                            {signupFormik.errors.firstName}
                          </p>
                        )}
                    </Grid>
                    <Grid style={{ position: "relative" }} size={6}>
                      <input
                        name="lastName"
                        type="text"
                        className={styles.input}
                        placeholder="Last Name*"
                        onChange={signupFormik.handleChange}
                        value={signupFormik.values.lastName}
                        style={{
                          border:
                            signupFormik.touched.lastName &&
                            signupFormik.errors.lastName
                              ? "solid red 2px"
                              : "",
                        }}
                      />
                      {/* show error: */}
                      {signupFormik.touched.lastName &&
                        signupFormik.errors.lastName && (
                          <p className={styles.errorText}>
                            {signupFormik.errors.lastName}
                          </p>
                        )}
                    </Grid>
                    <Grid size={12}>
                      <input
                        name="username"
                        type="text"
                        className={styles.input}
                        placeholder="UserName*"
                        onChange={signupFormik.handleChange}
                        value={signupFormik.values.username}
                        style={{
                          border:
                            signupFormik.touched.username &&
                            signupFormik.errors.username
                              ? "solid red 2px"
                              : "",
                        }}
                      />
                      {/* show error: */}
                      {signupFormik.touched.username &&
                        signupFormik.errors.username && (
                          <p
                            className={styles.errorText}
                            style={{ left: "2.8rem" }}
                          >
                            {signupFormik.errors.username}
                          </p>
                        )}
                    </Grid>
                    <Grid size={12}>
                      <input
                        name="email"
                        type="email"
                        className={styles.input}
                        placeholder="Email*"
                        onChange={signupFormik.handleChange}
                        value={signupFormik.values.email}
                        style={{
                          border:
                            signupFormik.touched.email &&
                            signupFormik.errors.email
                              ? "solid red 2px"
                              : "",
                        }}
                      />
                      {/* show error: */}
                      {signupFormik.touched.email &&
                        signupFormik.errors.email && (
                          <p
                            className={styles.errorText}
                            style={{ left: "2.8rem" }}
                          >
                            {signupFormik.errors.email}
                          </p>
                        )}
                    </Grid>
                    <Grid size={12}>
                      <input
                        name="password"
                        type="password"
                        className={styles.input}
                        placeholder="Password*"
                        onChange={signupFormik.handleChange}
                        value={signupFormik.values.password}
                        style={{
                          border:
                            signupFormik.touched.password &&
                            signupFormik.errors.password
                              ? "solid red 2px"
                              : "",
                        }}
                      />
                      {/* show error: */}
                      {signupFormik.touched.password &&
                        signupFormik.errors.password && (
                          <p
                            className={styles.errorText}
                            style={{ left: "2.8rem" }}
                          >
                            {signupFormik.errors.password}
                          </p>
                        )}
                    </Grid>
                    <Grid size={12}>
                      <input
                        name="confirmPassword"
                        type="password"
                        className={styles.input}
                        placeholder="Confirm Password*"
                        onChange={signupFormik.handleChange}
                        value={signupFormik.values.confirmPassword}
                        style={{
                          border:
                            signupFormik.touched.confirmPassword &&
                            signupFormik.errors.confirmPassword
                              ? "solid red 2px"
                              : "",
                        }}
                      />
                      {/* show error: */}
                      {signupFormik.touched.confirmPassword &&
                        signupFormik.errors.confirmPassword && (
                          <p
                            className={styles.errorText}
                            style={{ left: "2.8rem" }}
                          >
                            {signupFormik.errors.confirmPassword}
                          </p>
                        )}
                    </Grid>
                    <Grid size={12}>
                      <p className={styles.tologin}>
                        You have already registered?{" "}
                        <span
                          onClick={() => swiperRef.current?.slidePrev()}
                          className={styles.loginbtn}
                        >
                          login
                        </span>
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
