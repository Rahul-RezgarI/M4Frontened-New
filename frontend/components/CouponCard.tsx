/* eslint-disable react/jsx-no-target-blank */
import Image from "next/image";
import React, { useState } from "react";
import couponImg from "../assets/images/desktop/11.jpg";
import message from "../assets/actions/message.svg";
import clicks from "../assets/actions/click.svg";
import reviews from "../assets/actions/reviews.svg";
import share from "../assets/actions/share.svg";
import percentage from "../assets/actions/percent.svg";
import like from "../assets/actions/like2.png";
import votes from "../assets/actions/vote.svg";
import { coupon } from "../constants/interfaces";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Slider from "react-slick";
import { toast } from "react-hot-toast";
import {
  EmailShareButton,
  EmailIcon,
  FacebookShareButton,
  LinkedinShareButton,
  LinkedinIcon,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  TelegramShareButton,
  TelegramIcon,
} from "next-share";

import CommentsCard from "./CommentsCard";
import UserLoginNotice from "./UserLoginNotice";
import Link from "next/link";

function CouponCard(props: coupon) {
  const [showDetails, setShowDetails] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [reviewCount, setreviewCount] = useState(0);

  const { data: session } = useSession();

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 9000,
    speed: 4000,
    arrows: false,
    variableWidth: true,
    adaptiveHeight: true,
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleReview = async (dataProps: any) => {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}review`,
      {
        ...dataProps,
        item_id: props?.store?._id,
        coupon: props?._id,
      },
      {
        headers: {
          "Content-Type": "application/json", // @ts-ignore
          Authorization: `Bearer ${session?.user?.accessToken}`,
        },
      }
    );

    if (res?.data?.success) {
      toast.success("Reviewed successfully");
      setreviewCount((prev) => prev + 1);
      reset();
    } else {
      toast.error("Something went wrong");
    }
  };

  //take my click
  const handleClick = async () => {
    // @ts-ignore
    if (session && session?.user?.accessToken) {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}clicks`,
        {
          store: props?.store?._id,
          category: props?.category?._id,
          coupon: props?._id,
        },
        {
          headers: {
            "Content-Type": "application/json", // @ts-ignore
            Authorization: `Bearer ${session?.user?.accessToken}`,
          },
        }
      );
    }
  };

  //take a like
  const handleLike = async () => {
    await axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}likes`,
        {
          item_id: props._id,
          tag: "review",
        },
        {
          headers: {
            "Content-Type": "application/json", // @ts-ignore
            Authorization: `Bearer ${session?.user?.accessToken}`,
          },
        }
      )
      .then((res) => {
        if (res?.data?.success) {
          toast.success("Good to know this helps");
          setLikeCount((prev) => prev + 1);
        }
      })
      .catch((error) => {
        toast.error(error.response.data.message || error.response.data.error);
      });
  };

  return (
    <div className=" mb-4">
      <div className="lg:w-[550px] w-full border overflow-hidden rounded-3xl bg-[#FFFFFF] drop-shadow-md duration-200 hover:border hover:shadow-2xl">
        <div className="relative h-auto w-full">
          {props?.coupon_format !== "Image" ? (
            <div className="w-[93vw] min-h-[190px] min lg:w-full flex">
              <div className="border-r border-slate-600 w-1/2 p-4 flex flex-col justify-center">
                <Image
                  src={props.icon}
                  alt="plant"
                  className="h-auto w-full bg-white "
                  width={1034}
                  height={1034}
                />
              </div>
              <div className="w-1/2 p-4 flex flex-col justify-center py-20">
                <h1 className="text-[#000000] font-satoshi font-extrabold text-2xl mb-2">
                  {props.title}
                </h1>
                <p>{props?.text}</p>
              </div>
            </div>
          ) : (
            <>
              <div className="h-[100%] w-full block lg:hidden  bottom-0">
                {props?.image_format_mobile === "album" ? (
                  <div className="w-[90vw] h-auto">
                    {/* @ts-ignore */}
                    <Slider {...settings}>
                      {props?.mobile_image?.map((img: any, i: number) => (
                        <div className="w-full h-full" key={i}>
                          <Image
                            // @ts-ignore
                            src={img}
                            alt="Slide 1"
                            width={2000}
                            height={1000}
                            className="border-2 border-white mx-auto"
                          />
                        </div>
                      ))}
                    </Slider>
                  </div>
                ) : (
                  <Image
                    src={props.mobile_image[0] || couponImg}
                    alt="plant"
                    className="h-auto bottom-0 w-full"
                    width={5500}
                    height={1000}
                  />
                )}
              </div>
              <div className="h-[100%] w-full hidden lg:block bottom-0">
                {props?.image_format_desktop === "album" ? (
                  <div className="w-full h-full">
                    {/* @ts-ignore */}
                    <Slider {...settings}>
                      {props?.desktop_image?.map((img: any, i: number) => (
                        <div className="w-full h-auto" key={i}>
                          <Image
                            // @ts-ignore
                            src={img}
                            alt="Slide 1"
                            width={5500}
                            height={1000}
                            className="border-2 border-white mx-auto h-auto w-full"
                          />
                        </div>
                      ))}
                    </Slider>{" "}
                  </div>
                ) : (
                  <Image
                    src={props.desktop_image[0] || couponImg}
                    alt="plant"
                    className="h-auto w-full hidden lg:block bottom-0"
                    width={5500}
                    height={1000}
                  />
                )}
              </div>
            </>
          )}
        </div>
        <div className="pt-0 bg-white relative z-20 top-3/3 w-full">
          {props?.coupon_format === "Image" && (
            <div className="px-6 pt-4">
              <div className="pb-2 mb-2">
                <div className="flex gap-4 justify-between w-full">
                  <Image
                    src={props.icon}
                    alt="plant"
                    className="h-12 w-12 rounded-full border border-slate-600"
                    width={1034}
                    height={1034}
                  />
                  <div className="w-full">
                    <div className="flex justify-between mb-1">
                      <h1 className="text-black text-[20px] font-extrabold">
                        {props.store?.name}
                      </h1>
                      <Image
                        src={like}
                        alt="plant"
                        className="h-5 w-auto lg:h-[26px] cursor-pointer hover:rotate-[-45deg] hover:ease-linear"
                        onClick={handleLike}
                      />
                    </div>
                    <div>
                      <h1 className="text-[#D62828] font-satoshi font-extrabold text-xl">
                        {props.title}
                      </h1>
                      <div
                        className="text-[16px] my-2 font-montserrat font-semibold lg:text-[16px] text-gray-700"
                        dangerouslySetInnerHTML={{
                          __html: props.content_above,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <hr className="w-full" />
          <div className="mt-0 px-4 py-2 flex items-center justify-between">
            <div className="flex gap-[32px] lg:gap-[50px]">
              <Image
                src={percentage}
                alt="plant"
                className="h-5 w-5 lg:h-[26px] lg:w-[26px] cursor-pointer transition hover:rotate-45"
                onClick={() => {
                  setShowForm(false);
                  setShowForm(false);
                  setShowDetails(!showDetails);
                }}
              />
              <Image
                src={message}
                alt="plant"
                className="h-5 w-5 lg:h-[26px] lg:w-[26px] cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-110"
                onClick={() => {
                  setShowDetails(false);
                  setShowShare(false);
                  setShowForm(!showForm);
                }}
              />
              <Image
                src={share}
                onClick={() => {
                  setShowDetails(false);
                  setShowForm(false);
                  setShowShare(!showShare);
                }}
                alt="plant"
                className="h-5 w-5 lg:h-[26px] lg:w-[26px] cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-110"
              />
            </div>
            {/* @ts-ignore */}
            <a
              onClick={handleClick}
              href={`${
                props?.affiliate_url?.startsWith("https://")
                  ? props?.affiliate_url
                  : `https://${props?.affiliate_url}`
              }`}
              target="_blank"
              className="rounded-full font-extrabold lg:text-[18px] rounded-tr-3xl bg-[#D62828] px-6 py-1 text-indigo-100 hover:bg-[#081930] hover:shadow-md duration-75"
            >
              Visit the Store!
            </a>
          </div>
        </div>
        {/* </div> */}
        {showDetails && (
          <div className="p-6 pt-2 w-full relative">
            {props?.content_below?.map(
              (cont: any, i: number) =>
                cont?.desc?.trim() !== "" && (
                  <div key={i}>
                    <h1 className="text-red-700 text-sm">{cont?.tab}</h1>
                    <div
                      className="text-sm"
                      dangerouslySetInnerHTML={{ __html: cont?.desc }}
                    ></div>
                  </div>
                )
            )}
            <button
              onClick={() => setShowDetails(false)}
              className="ml-auto absolute right-4 bottom-4 text-blue-500"
            >
              Hide
            </button>
            <div className="pb-6"></div>
          </div>
        )}
        {showShare && (
          <div className="p-6 pt-2 w-full relative">
            <div className="flex gap-4">
              <EmailShareButton
                url={props?.affiliate_url}
                subject={props?.title}
                body="body"
              >
                <EmailIcon size={32} round />
              </EmailShareButton>
              <FacebookShareButton
                url={props?.affiliate_url}
                quote={props?.title}
                hashtag={"#rezgari"}
              >
                <FacebookIcon size={32} round />
              </FacebookShareButton>
              <LinkedinShareButton url={props?.affiliate_url}>
                <LinkedinIcon size={32} round />
              </LinkedinShareButton>

              <TwitterShareButton
                url={props?.affiliate_url}
                title={props?.title}
              >
                <TwitterIcon size={32} round />
              </TwitterShareButton>
              <WhatsappShareButton
                url={props?.affiliate_url}
                title={props?.title}
                separator=":: "
              >
                <WhatsappIcon size={32} round />
              </WhatsappShareButton>
              <TelegramShareButton
                url={props?.affiliate_url}
                title={props?.title}
              >
                <TelegramIcon size={32} round />
              </TelegramShareButton>
            </div>
            <button
              onClick={() => setShowShare(false)}
              className="ml-auto absolute right-4 bottom-4 text-blue-500"
            >
              Hide
            </button>
            <div className="pb-6"></div>
          </div>
        )}
        {showForm && (
          <div className="p-6 pt-2 w-full relative">
            {session ? (
              <form
                onSubmit={handleSubmit(handleReview)}
                className="w-full flex"
              >
                <input
                  type="text"
                  placeholder="comment here"
                  className="rounded-md border bg-gray-200 py-2 px-3 w-[90%]"
                  {...register("comment", { required: true })}
                />
                <button
                  type="submit"
                  className="bg-yellow-700 rounded-md py-2 px-3 text-white text-sm"
                >
                  submit
                </button>
              </form>
            ) : (
              <UserLoginNotice />
            )}
            <CommentsCard id={props._id} />
            <button
              onClick={() => setShowForm(false)}
              className="ml-auto absolute right-4 bottom-4 text-blue-500"
            >
              Hide
            </button>{" "}
            <div className="pb-6"></div>
          </div>
        )}
      </div>
      <div className="flex gap-2">
        <div className="w-1/2 lg:w-1/3 overflow-hidden rounded-xl bg-white shadow-md duration-200 hover:shadow-xl flex items-center py-2 mt-3 mb-3 px-4">
          <Image src={clicks} alt="plant" className="h-5 mr-3" />

          <p className="font-extrabold block lg:font-regular  lg:text-xs">
            {props.admin_clicks + props.actual_clicks <= 1000
              ? props.admin_clicks + props.actual_clicks
              : `${((props.admin_clicks + props.actual_clicks) / 1000).toFixed(
                  1
                )}k`}{" "}
            clicked
          </p>
        </div>
        <div className="w-1/3 hidden lg:flex overflow-hidden rounded-xl bg-white shadow-md duration-200 hover:shadow-xl items-center py-2 mt-3 mb-3 px-4">
          <Image src={votes} alt="plant" className="h-5 mr-3" />

          <p className=" font-extrabold block lg:font-regular lg:text-xs">
            {props.admin_votes + props.actual_votes <= 1000
              ? props.admin_votes + props.actual_votes + likeCount
              : `${(
                  (props.admin_votes + props.actual_votes + likeCount) /
                  1000
                ).toFixed(1)}k`}{" "}
            Votes
          </p>
        </div>
        <div className="w-1/2 lg:w-1/3 overflow-hidden rounded-xl bg-white shadow-md duration-200 hover:shadow-xl flex items-center py-2 mt-3 mb-3 px-4">
          <Image src={reviews} alt="plant" className="h-5 mr-3" />

          <p className=" font-extrabold block lg:font-regular lg:text-xs">
            {props.total_reviews <= 1000
              ? props.total_reviews + reviewCount
              : `${((props.total_reviews + reviewCount) / 1000).toFixed(
                  1
                )}k`}{" "}
            Reviews
          </p>
        </div>
      </div>
      <div className="w-full flex lg:hidden overflow-hidden rounded-xl bg-white shadow-md duration-200 hover:shadow-xl items-center justify-center py-2 mb-5 px-4">
        <Image src={votes} alt="plant" className="h-5 mr-3" />

        <p className="font-extrabold block">
          More than{" "}
          {props.admin_votes + props.actual_votes <= 1000
            ? props.admin_votes + props.actual_votes + likeCount
            : `${(
                (props.admin_votes + props.actual_votes + likeCount) /
                1000
              ).toFixed(1)}k`}{" "}
          Votes
        </p>
      </div>
    </div>
  );
}

export default CouponCard;
