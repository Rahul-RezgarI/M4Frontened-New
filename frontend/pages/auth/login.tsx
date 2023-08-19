"use-client";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import styles from "./custom.module.css";
import logo from "../../assets/brands/logo.jpeg";
import google from "../../assets/auth/google.jpg";
import facebook from "../../assets/auth/facebook.jpg";
import l1 from "../../assets/auth/l1.png";
import l2 from "../../assets/auth/l2.png";
import l3 from "../../assets/auth/l3.png";
import ri3 from "../../assets/auth/ri3.png";
import ri4 from "../../assets/auth/ri4.png";
import ri5 from "../../assets/auth/ri5.png";
import ri2 from "../../assets/auth/ri2.png";
import Slider from "react-slick";
import Link from "next/link";
import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import dynamic from "next/dynamic";
import { toast } from "react-hot-toast";
import Head from "next/head";

// import SocialBtn from "../../components/SocialBtn";

export default function SignIn() {
  const SocialBtn = dynamic(() => import("../../components/SocialBtn"), {
    ssr: false,
  });
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    // cssEase: "linear",
  };

  const settings2 = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    adaptiveHeight: true,
    // cssEase: "linear",
  };

  const router = useRouter();
  const [visible, setVisible] = useState(false);
  // const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { data: session, status } = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session]);

  const handleSave = async (dataProps: any) => {
    try {
      setLoading(true);

      await signIn("signin", {
        redirect: false,
        email: dataProps.email,
        password: dataProps.password,
        callbackUrl: `${window.location.origin}`,
      }).then(({ ok, error }: any) => {
        if (ok) {
          toast.success("Login success");
        } else {
          toast.error("Invalid credentials");
        }
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Rezgari || Login</title>
        <meta
          name="description"
          content="Rezgari is your number coupons or offers supplier"
        />
      </Head>
      <div className={styles.body}>
        <div className="h-auto lg:h-screen flex items-center justify-around">
          <div className="grid grid-cols-1 lg:grid-cols-2 w-full lg:w-2/3 mx-auto px-0 p lg:p-4">
            <div className="block lg:hidden w-full bg-white">
              <Link href={"/"}>
                <Image src={logo} alt="" className="mx-auto h-36 w-auto" />
              </Link>
            </div>
            <div className={styles.left_box}>
              <div className="hidden lg:block">
                <Link href={"/"}>
                  <Image
                    src={logo}
                    alt=""
                    className="border-2 border-white mx-auto h-36 w-auto"
                  />
                </Link>
              </div>

              <div className="wrap_upper p-6">
                <div className=" space-x-5">
                  <Slider {...settings2} className="relative">
                    <div className="m-4">
                      <Image
                        // @ts-ignore
                        src={l1}
                        alt="Slide 1"
                        className="rounded-full shadow-lg shadow-indigo-500/50 w-[25%]"
                        style={{ width: "60%" }}
                      />
                    </div>

                    <div className="m-4">
                      <Image
                        src={l2}
                        alt=""
                        className="rounded-full shadow-lg shadow-indigo-500/50 w-[25%]"
                        style={{ width: "60%" }}
                      />
                    </div>
                    <div className="m-4">
                      <Image
                        src={l3}
                        alt=""
                        className="rounded-full shadow-lg shadow-indigo-500/50 w-[25%]"
                        style={{ width: "60%" }}
                      />
                    </div>
                    <div className="m-4">
                      <Image
                        // @ts-ignore
                        src={l1}
                        alt="Slide 1"
                        className="rounded-full shadow-lg shadow-indigo-500/50 w-[25%]"
                        style={{ width: "60%" }}
                      />
                    </div>
                  </Slider>

                  <div className="col-md-12 tagline">
                    <h3 className="text-3xl font-extrabold my-4 text-center">
                      <span>जन हित मे जारी</span>
                    </h3>
                  </div>
                </div>
                <div className="first">
                  <hr />

                  <h2 className="text-2xl font-extrabold text-center my-6">
                    Log In
                  </h2>
                  <div className="sign_in_div">
                    <div className="flex justify-center gap-4">
                      <div
                        onClick={() => signIn("google")}
                        className="col-xs-6 rb1"
                      >
                        <Image
                          src={google}
                          className="img-responsive cursor-pointer"
                          alt=""
                        />
                        {/* </SocialBtn> */}
                      </div>
                      <div
                        onClick={() => signIn("facebook")}
                        className="col-xs-6 rb2"
                      >
                        <Image
                          src={facebook}
                          className="img-responsiv cursor-pointer"
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                  <div className="w-full">
                    <form onSubmit={handleSubmit(handleSave)}>
                      <div className="w-full my-4">
                        <div className="form-group">
                          <input
                            type="email"
                            placeholder="Email"
                            className={
                              "placeholder-gray-700 border-b border-gray-500 my-4 w-full focus:outline-none"
                            }
                            {...register("email", { required: true })}
                          />
                          {errors.email && (
                            <span className="text-red-600">
                              Email is required
                            </span>
                          )}
                        </div>
                        <div className="form-group">
                          <div className="flex">
                            <input
                              type={visible ? "text" : "password"}
                              placeholder="Password"
                              className={
                                "placeholder-gray-700 border-b border-gray-500 my-4 w-full focus:outline-none"
                              }
                              {...register("password", { required: true })}
                            />
                            <button
                              className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted"
                              type="button"
                              onClick={() => setVisible(!visible)}
                            >
                              {visible ? (
                                <i className="ri-eye-fill align-middle"></i>
                              ) : (
                                <i className="ri-eye-off-line align-middle"></i>
                              )}
                            </button>
                          </div>

                          {errors.password && (
                            <span className="text-red-600">
                              Password is required
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="w-full">
                        <button
                          type="submit"
                          className="w-full bg-yellow-800 px-2 py-2 text-white my-4 text-center rounded-md"
                          disabled={loading}
                        >
                          {loading ? "Signing..." : "Sign In"}
                        </button>
                      </div>
                    </form>
                  </div>
                  <div className="text-center">
                    <span>I'm New here! </span>
                    <Link href={"/auth/signup"} className="text-blue-700">
                      Register
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.right_box}>
              <img src="images/zig.png" className="img-responsive zig" alt="" />
              <div className="inner_right">
                <img
                  src="images/coupon.jpg"
                  className="img-responsive center-block coupon wow flash"
                  data-wow-iteration="100"
                  data-wow-duration="4s"
                  alt=""
                />
                <div id="owl-demo3" className="owl-carousel owl-theme">
                  <Slider {...settings}>
                    <div>
                      <Image src={ri2} alt="" className="mx-auto h-40 w-40" />
                    </div>
                    <div>
                      <Image src={ri2} alt="" className="mx-auto h-40 w-40" />
                    </div>
                    <div>
                      <Image src={ri3} alt="" className="mx-auto h-40 w-40" />
                    </div>
                    <div>
                      <Image src={ri4} alt="" className="mx-auto h-40 w-40" />
                    </div>
                    <div>
                      <Image src={ri5} alt="" className="mx-auto h-40 w-40" />
                    </div>
                  </Slider>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
