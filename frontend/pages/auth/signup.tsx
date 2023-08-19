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
import zig from "../../assets/auth/zig.png";
import Slider from "react-slick";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import Head from "next/head";

export default function Signup() {
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

  const { data: session } = useSession();

  const [loading, setIsLoading] = useState(false);

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [router, session]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      setIsLoading(true);
      await signIn("register", {
        redirect: false,
        ...data,
        callbackUrl: `${window.location.origin}`,
      }).then(({ ok, error }: any) => {
        if (ok) {
          toast.success("Registered success");
        } else {
          toast.error("Invalid credentials");
        }
      });

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Rezgari || Sign Up</title>
        <meta
          name="description"
          content={`Welcome to Rezgari - India's Trusted Coupons, Offers & Cashback Website`}
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
              <div className="wrap_upper p-6 flex flex-col-reverse lg:flex-col">
                <div className="block">
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
                      <span className="text-red-700">जन हित मे जारी</span>
                    </h3>
                  </div>
                </div>
                <div className="first">
                  <hr />

                  <h2 className="text-2xl font-extrabold text-center my-4">
                    Register
                  </h2>
                  <div className="sign_in_div">
                    <div className="flex justify-center gap-4">
                      <div
                        className="col-xs-6 rb1"
                        onClick={() => signIn("google")}
                      >
                        <Image
                          src={google}
                          className="img-responsive cursor-pointer"
                          alt=""
                        />
                      </div>
                      <div
                        onClick={() => signIn("facebook")}
                        className="col-xs-6 rb2"
                      >
                        <Image
                          src={facebook}
                          className="img-responsive cursor-pointer"
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row sign_row material">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="grid py-6 lg:py-4 grid-cols-2 gap-8">
                        <div className="form-group my-2 lg:m-2 flex flex-col">
                          <input
                            type="text"
                            placeholder="First Name"
                            className={
                              "placeholder-gray-700 border-b border-gray-500  focus:outline-none"
                            }
                            {...register("first_name", { required: true })}
                          />
                          {errors?.first_name && (
                            <span className="text-red-700">
                              First Name is required
                            </span>
                          )}
                        </div>
                        <div className="form-group my-2 lg:m-2  flex flex-col">
                          <input
                            type="text"
                            placeholder="Last Name"
                            className={
                              "placeholder-gray-700 border-b border-gray-500  focus:outline-none"
                            }
                            {...register("last_name", { required: true })}
                          />
                          {errors?.last_name && (
                            <span className="text-red-700">
                              Last Name is required
                            </span>
                          )}
                        </div>

                        <div className="form-group my-2 lg:m-2  flex flex-col">
                          <input
                            type="email"
                            placeholder="Email"
                            className={
                              "placeholder-gray-700 border-b border-gray-500  focus:outline-none"
                            }
                            {...register("email", { required: true })}
                          />
                          {errors?.email && (
                            <span className="text-red-700">
                              Email is required
                            </span>
                          )}
                        </div>

                        <div className="form-group my-2 lg:m-2  flex flex-col">
                          <input
                            type="text"
                            placeholder="Phone"
                            className={
                              "placeholder-gray-700 border-b border-gray-500  focus:outline-none"
                            }
                            {...register("phone", { required: true })}
                          />
                          {errors?.phone && (
                            <span className="text-red-700">
                              Phone Number is required
                            </span>
                          )}
                        </div>

                        <div className="form-group my-2 lg:m-2  flex flex-col">
                          <input
                            type="password"
                            placeholder="Password"
                            className={
                              "placeholder-gray-700 border-b border-gray-500  focus:outline-none"
                            }
                            {...register("password", { required: true })}
                          />
                          {errors?.password && (
                            <span className="text-red-700">
                              Password is required
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="w-full">
                        <button
                          type="submit"
                          className="w-full bg-yellow-600 px-2 py-2 text-white my-4 text-center rounded-md"
                          disabled={loading}
                        >
                          {loading ? "Signing..." : "Sign Up"}
                        </button>
                      </div>
                    </form>
                  </div>
                  <div className="text-center">
                    <span className="text-red-700">Existing user! </span>
                    <Link href={"/auth/login"} className="text-blue-700">
                      Login
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.right_box}>
              {/* <Image src={zig} className="img-responsive zig" alt="" /> */}
              <div className="inner_right">
                {/* <img
                src="images/coupon.jpg"
                className="img-responsive center-block coupon wow flash"
                data-wow-iteration="100"
                data-wow-duration="4s"
                alt=""
              /> */}
                <div id="owl-demo3" className="owl-carousel owl-theme">
                  <Slider {...settings}>
                    <div>
                      <Image
                        src={ri2}
                        alt=""
                        className="mx-auto h-10 w-10 lg:h-40 lg:w-40"
                      />
                    </div>
                    <div>
                      <Image
                        src={ri2}
                        alt=""
                        className="mx-auto h-10 w-10 lg:h-40 lg:w-40"
                      />
                    </div>
                    <div>
                      <Image
                        src={ri3}
                        alt=""
                        className="mx-auto h-10 w-10 lg:h-40 lg:w-40"
                      />
                    </div>
                    <div>
                      <Image
                        src={ri4}
                        alt=""
                        className="mx-auto h-10 w-10 lg:h-40 lg:w-40"
                      />
                    </div>
                    <div>
                      <Image
                        src={ri5}
                        alt=""
                        className="mx-auto h-10 w-10 lg:h-40 lg:w-40"
                      />
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
