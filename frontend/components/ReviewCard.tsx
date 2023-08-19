import Image from "next/image";
import message from "../assets/actions/message.svg";
import share from "../assets/actions/share.svg";
import percentage from "../assets/actions/percent.svg";
import like from "../assets/actions/like2.png";
import user from "../assets/users/profile.png";
import Rating from "./Rating";
import { review } from "../constants/interfaces";
import moment from "moment";
import UserLoginNotice from "./UserLoginNotice";
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
import { useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import VideoComments from "./VideoComments";
import dynamic from "next/dynamic";

function ReviewCard(props: review) {
  const StarPicker = dynamic(() => import("react-star-picker"), {
    ssr: false,
  });

  const [showDetails, setShowDetails] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [rating, setRating] = useState(3.5);

  const { data: session } = useSession();

  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onChange = (value: number) => {
    setRating(value);
  };

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

  //take my click
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
    <div className="w-full my-3">
      <div className="w-full lg:w-[550px] drop-shadow-sm border overflow-hidden rounded-3xl bg-white shadow-md duration-200 mx-auto hover:shadow-xl">
        <div>
          <div className="flex gap-4 p-6 pb-4">
            <Image
              src={props?.user_id?.profile || user}
              height={100}
              width={100}
              alt="plant"
              className="h-16 w-16 rounded-full"
            />
            <div className="w-full">
              <div className="flex justify-between">
                <h3 className="font-bold text-md my-2">
                  {props?.user_id?.first_name} {props?.user_id?.last_name}
                </h3>
                <div className="h-1 w-auto flex">
                  {/* @ts-ignore */}
                  <StarPicker
                    value={props.ratings}
                    className="text-sm"
                    size={24}
                  />
                </div>
              </div>
              <h5 className="text-[#999a9a] font-bold text-xs">
                {moment(props?.createdAt).fromNow()}
              </h5>
              <p className="text-[14px] mt-3 mb-5 text-[#133240]">
                {props?.comment}
              </p>
              <div className="flex mx-auto gap-4">
                {props?.images?.map((img: any, i: number) => (
                  <Image
                    key={i}
                    src={img}
                    alt="review pic"
                    className="h-auto w-1/3"
                    height={400}
                    width={400}
                  />
                ))}
              </div>
            </div>
          </div>

          <hr className="w-full my-4" />
          <div className="mt-2 flex justify-between px-6 pb-4">
            <Image
              src={like}
              alt="plant"
              className="h-5 w-auto lg:h-[26px] cursor-pointer hover:rotate-[-45deg]"
              onClick={handleLike}
            />
            <Image
              src={message}
              alt="plant"
              className="h-5 w-5 lg:h-[26px] lg:w-[26px] cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-110"
              onClick={() => {
                setShowDetails(false);
                setShowShare(false);
                setShowForm(!showForm);
              }}
            />
            <Image
              src={share}
              alt="plant"
              className="h-5 w-5 lg:h-[26px] lg:w-[26px] cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-110"
              onClick={() => {
                setShowDetails(false);
                setShowForm(false);
                setShowShare(!showShare);
              }}
            />
          </div>
        </div>

        {showShare && (
          <div className="p-6 pt-2 w-full relative">
            <div className="flex gap-4">
              <EmailShareButton
                url={`${
                  typeof window !== "undefined" &&
                  window.location.origin &&
                  window.location.origin
                }${router.asPath}`}
                subject={`${router.query.name as string} On Rezgari`}
                body={`Have a look at ${router.query.name as string}, on`}
              >
                <EmailIcon size={32} round />
              </EmailShareButton>
              <FacebookShareButton
                url={`${
                  typeof window !== "undefined" &&
                  window.location.origin &&
                  window.location.origin
                }${router.asPath}`}
                quote={`Have a look at ${router.query.name as string}, on`}
                hashtag={"#rezgari"}
              >
                <FacebookIcon size={32} round />
              </FacebookShareButton>
              <LinkedinShareButton
                url={`${
                  typeof window !== "undefined" &&
                  window.location.origin &&
                  window.location.origin
                }${router.asPath}`}
              >
                <LinkedinIcon size={32} round />
              </LinkedinShareButton>

              <TwitterShareButton
                url={`${
                  typeof window !== "undefined" &&
                  window.location.origin &&
                  window.location.origin
                }${router.asPath}`}
                title={`Have a look at ${router.query.name as string}, on`}
              >
                <TwitterIcon size={32} round />
              </TwitterShareButton>
              <WhatsappShareButton
                url={`${
                  typeof window !== "undefined" &&
                  window.location.origin &&
                  window.location.origin
                }${router.asPath}`}
                title={`Have a look at ${router.query.name as string}, on`}
                separator=":: "
              >
                <WhatsappIcon size={32} round />
              </WhatsappShareButton>
              <TelegramShareButton
                url={`${
                  typeof window !== "undefined" &&
                  window.location.origin &&
                  window.location.origin
                }${router.asPath}`}
                title={`Have a look at ${router.query.name as string}, on`}
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
            <VideoComments id={props._id} />
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

export default ReviewCard;
