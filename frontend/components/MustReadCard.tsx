import Image, { StaticImageData } from "next/image";
import React, { useState } from "react";
import mustread from "../assets/coupons/mustread1.png";
import message from "../assets/actions/message.svg";
import share from "../assets/actions/share.svg";
import percentage from "../assets/actions/percent.svg";
import mytra from "../assets/dominos/logo.png";
import coupon from "../assets/images/desktop/8.jpg";
import UserLoginNotice from "./UserLoginNotice";
import CommentsCard from "./CommentsCard";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
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
import { useSession } from "next-auth/react";

function MustReadCard(props: {
  mobile_image: StaticImageData;
  desktop_image: StaticImageData;
  title: string;
  content_above: string;
  content_below: string;
  link: string;
}) {
  const [showDetails, setShowDetails] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [reviewCount, setreviewCount] = useState(0);

  const { data: session } = useSession();

  const [showMore, setShowMore] = useState(false);
  const maxWordsToShow = 20; // Maximum number of words to show

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  const contentWords = props?.content_below.split(" ");
  const truncatedContent = contentWords.slice(0, maxWordsToShow).join(" ");
  const remainingWords = contentWords.slice(maxWordsToShow);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  return (
    <div className=" mb-4">
      <div className="lg:w-[550px] w-full border overflow-hidden rounded-3xl bg-[#FFFFFF] drop-shadow-md duration-200 hover:border hover:shadow-2xl">
        <div>
          <div className="flex gap-4 mt-2 px-4 py-2">
            <Image
              src={mytra}
              alt="plant"
              className="h-10 w-10 rounded-full border"
            />
            <div>
              <h1 className="text-[#D62828] font-satoshi font-extrabold text-xl">
                {props.title}
              </h1>
              <h5 className="text-[#003049] font-bold text-md">
                <div className="text-sm text-justify overflow-hidden">
                  <div
                    className="text-sm text-justify overflow-hidden"
                    dangerouslySetInnerHTML={{ __html: truncatedContent }}
                  ></div>{" "}
                  {!showMore && remainingWords.length > 0 && (
                    <span
                      className="text-blue-500 cursor-pointer"
                      onClick={toggleShowMore}
                    >
                      ...Read more
                    </span>
                  )}
                </div>
                {showMore && (
                  <div className="text-sm text-justify">
                    <div
                      className="text-sm text-justify overflow-hidden"
                      dangerouslySetInnerHTML={{ __html: props?.content_below }}
                    ></div>
                    <span
                      className="text-blue-500 cursor-pointer"
                      onClick={toggleShowMore}
                    >
                      Show less
                    </span>
                  </div>
                )}
              </h5>
              {/* <h5 className="text-[#003049] font-bold text-md">
                <div
                  className="text-sm p-6 text-justify overflow-hidden"
                  dangerouslySetInnerHTML={{ __html: props?.content_below }}
                ></div>
              </h5> */}
              <p className="text-[10px] font-semibold lg:text-[16px] mb-5 text-gray-700">
                {props.content_above}
              </p>
            </div>
          </div>
          {/* <Image src={mustread} alt="must-read" className="h-auto w-full" /> */}
          <Image
            src={props.desktop_image || coupon}
            alt="plant"
            className="h-auto w-full hidden lg:block"
            width={5500}
            height={1000}
          />
          <Image
            src={props.mobile_image || coupon}
            alt="plant"
            className="h-auto w-full lg:hidden"
            width={5500}
            height={1000}
          />
          <hr className="w-full mt-4" />
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
            <div
              className="text-sm p-6 text-justify overflow-hidden"
              dangerouslySetInnerHTML={{ __html: props?.content_below }}
            ></div>

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
                url={props?.link}
                subject={props?.title}
                body="body"
              >
                <EmailIcon size={32} round />
              </EmailShareButton>
              <FacebookShareButton
                url={props?.link}
                quote={props?.title}
                hashtag={"#rezgari"}
              >
                <FacebookIcon size={32} round />
              </FacebookShareButton>
              <LinkedinShareButton url={props?.link}>
                <LinkedinIcon size={32} round />
              </LinkedinShareButton>

              <TwitterShareButton url={props?.link} title={props?.title}>
                <TwitterIcon size={32} round />
              </TwitterShareButton>
              <WhatsappShareButton
                url={props?.link}
                title={props?.title}
                separator=":: "
              >
                <WhatsappIcon size={32} round />
              </WhatsappShareButton>
              <TelegramShareButton url={props?.link} title={props?.title}>
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
                // onSubmit={handleSubmit(handleReview)}
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

export default MustReadCard;
