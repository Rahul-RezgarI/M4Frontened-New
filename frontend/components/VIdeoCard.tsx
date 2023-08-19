import Image from "next/image";
import React, { useState } from "react";
import mustread from "../assets/coupons/videoimg.png";
import coupon from "../assets/images/desktop/15.jpg";
import coupon1 from "../assets/images/9.jpg";
import message from "../assets/actions/message.svg";
import share from "../assets/actions/share.svg";
import percentage from "../assets/actions/percent.svg";
import videoImg from "../assets/vectors/video.svg";
import like from "../assets/actions/like2.png";

import { video } from "../constants/interfaces";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import axios from "axios";
import Link from "next/link";
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
import { useRouter } from "next/router";
import UserLoginNotice from "./UserLoginNotice";
import VideoComments from "./VideoComments";

function VideoCard(props: video) {
  const [showDetails, setShowDetails] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const [success, setSuccess] = useState();

  const router = useRouter();

  const { data: session } = useSession();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleSave = async (dataProps: any) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}comments`,
        {
          ...dataProps,
          item_id: props._id,
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
        reset();
        setShowForm(false);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  //take a like
  const handleLike = async () => {
    await axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}likes`,
        {
          item_id: props._id,
          tag: "video",
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
    <div className="mb-6">
      <div className="lg:w-[550px] w-[90vw] overflow-hidden rounded-3xl bg-white drop-shadow-md duration-200 hover:shadow-xl">
        <div>
          <div className="relative opacity-100">
            <div className="h-[100%] w-full block lg:hidden  bottom-0">
              <Image
                src={props?.mobile_image || props?.desktop_image}
                alt="plant"
                className="h-auto bottom-0 w-full"
                width={5500}
                height={1000}
              />
            </div>
            <div className="h-[100%] w-full hidden lg:block bottom-0">
              <Image
                src={props?.desktop_image || props?.mobile_image}
                alt="plant"
                className="h-auto w-full hidden lg:block bottom-0"
                width={5500}
                height={1000}
              />
            </div>

            {/* <Image
              src={props?.desktop_image || props?.mobile_image}
              alt="plant"
              className="h-auto w-full"
              height={1440}
              width={1440}
            /> */}
            <Link
              href={"/videos/details/" + props?._id}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Image
                src={videoImg}
                alt="play-video"
                className="h-20 w-20"
                height={100}
                width={100}
              />
            </Link>
          </div>

          <div className="px-6">
            <div className="pb-2 mb-2">
              <div className="flex gap-4 justify-between w-full mt-4">
                <Image
                  src={props?.store?.icon || props?.category?.icon}
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
                    <p className="text-[16px] my-2 font-montserrat font-semibold lg:text-[16px] text-gray-700">
                      {props.content_above}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
              href={``}
              className="rounded-full font-extrabold lg:text-[18px] rounded-tr-3xl bg-[#D62828] px-6 py-1 text-indigo-100 hover:bg-[#081930] hover:shadow-md duration-75"
            >
              Visit the Store!
            </a>
          </div>
        </div>
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
                url={"https://www.rezgari.com/videos/details/" + props?._id}
                subject={props?.title}
                body="body"
              >
                <EmailIcon size={32} round />
              </EmailShareButton>
              <FacebookShareButton
                url={"https://www.rezgari.com/videos/details/" + props?._id}
                quote={props?.title}
                hashtag={"#rezgari"}
              >
                <FacebookIcon size={32} round />
              </FacebookShareButton>
              <LinkedinShareButton
                url={"https://www.rezgari.com/videos/details/" + props?._id}
              >
                <LinkedinIcon size={32} round />
              </LinkedinShareButton>

              <TwitterShareButton
                url={"https://www.rezgari.com/videos/details/" + props?._id}
                title={props?.title}
              >
                <TwitterIcon size={32} round />
              </TwitterShareButton>
              <WhatsappShareButton
                url={"https://www.rezgari.com/videos/details/" + props?._id}
                title={props?.title}
                separator=":: "
              >
                <WhatsappIcon size={32} round />
              </WhatsappShareButton>
              <TelegramShareButton
                url={"https://www.rezgari.com/videos/details/" + props?._id}
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
              <form onSubmit={handleSubmit(handleSave)} className="w-full flex">
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
            <VideoComments id={props?._id} />
            {/* <CommentsCard id={props._id} /> */}
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
    </div>
  );
}

export default VideoCard;
