import React, { useEffect, useState } from "react";
// import ReactPlayer from "react-player";
import moment from "moment";
import Header from "../../../components/Header";
import dynamic from "next/dynamic";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { fetcher } from "../../../helpers/fetcher";
import useSWR from "swr";
import user from "../../../assets/users/profile.png";
import UserLoginNotice from "../../../components/UserLoginNotice";
import Head from "next/head";
const ReactPlayer = dynamic(() => import("react-player"), {
  ssr: false,
});

function VideoScreen(props: any) {
  const { query } = useRouter();
  const { data: session } = useSession();

  const [comments, setcomments] = useState([]);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        process.env.NEXT_PUBLIC_API_URL + "comments/all/" + query?.id
      );
      setcomments(data.comments);
    };
    fetchData();
  }, [query?.id, success]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleSave = async (dataProps: any) => {
    try {
      setSuccess(true);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}comments`,
        {
          ...dataProps,
          item_id: query?.id,
        },
        {
          headers: {
            "Content-Type": "application/json", // @ts-ignore
            Authorization: `Bearer ${session?.user?.accessToken}`,
          },
        }
      );

      if (res?.data?.success) {
        toast.success("Comment sent successfully");
        reset();
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setSuccess(false);
    }
  };

  return (
    <>
      <Head>
        <title>Rezgari || {props?.video?.title}</title>
        <meta
          name="description"
          content={`Welcome to Rezgari - India's Trusted Coupons, Offers & Cashback Website`}
        />
      </Head>
      <div className="w-screen overflow-hidden bg-white">
        <Header />
        <div className="p4 lg:p-6 flex flex-col lg:flex-row w-full">
          <div className="w-full lg:w-2/3">
            <div className="w-full h-[70vh]">
              <ReactPlayer
                url={props?.video?.link}
                controls={true}
                width={"100%"}
                height={"100%"}
                className="w-full h-full"
              />
            </div>
            <div className="my-6 px-4">
              <h1 className="my-4 text-xl font-bold">{props?.video?.title}</h1>
              <h2 className="my-4 text-gray-600">
                {props?.video?.description}
              </h2>
              <h1 className="my-4 text-gray-600">
                {props?.video?.actual_views + props?.video?.admin_views} Views
              </h1>
              <hr />
              {session ? (
                <form className="w-full" onSubmit={handleSubmit(handleSave)}>
                  <div className="flex items-center gap-4">
                    <Image
                      src={session?.user?.image || user}
                      height={100}
                      width={100}
                      alt="plant"
                      className="h-10 w-10 rounded-full"
                    />
                    <input
                      type="text"
                      className={
                        "placeholder-gray-700 border-b border-gray-500 my-4 w-full focus:outline-none pb-3"
                      }
                      {...register("comment", { required: true })}
                      placeholder="Add a comment..."
                    />
                  </div>
                  <div className="flex justify-end w-full">
                    <button
                      type="submit"
                      className="bg-gray-500 p-3 text-white rounded-md"
                    >
                      Comment
                    </button>
                  </div>
                </form>
              ) : (
                <UserLoginNotice />
              )}

              {comments?.map((com: any, i: number) => (
                <div key={i} className="flex items-center gap-6 ">
                  <Image
                    src={com?.user?.profile || user}
                    height={100}
                    width={100}
                    alt="plant"
                    className="h-10 w-10 rounded-full"
                  />
                  <div>
                    <div className="flex items-center my-2">
                      <h1 className="m-0">
                        {com?.user?.first_name} {com?.user?.last_name}
                      </h1>
                      <span className="ml-10 text-gray-500 text-sm">
                        {moment(com?.createdAt).fromNow()}
                      </span>
                    </div>
                    <span className="text-gray-600 text-md mt-0">
                      {com?.comment}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full lg:w-1/3 ml-6">
            {props?.videos?.map((video: any) => (
              <div key={video?._id} className="flex w-full">
                <div className="w-1/2">
                  <ReactPlayer
                    url={video?.link}
                    controls={true}
                    width={"100%"}
                    height={"90%"}
                    className="w-full h-full"
                  />
                </div>

                <div className="ml-4 w-1/2">
                  <h3 className="my-4 text-lg font-satoshi">{video?.title}</h3>
                  <div className="flex items-center gap-4">
                    <h1 className="text-gray-600">
                      {video?.store?.name ||
                        video?.category?.name ||
                        "General video"}
                    </h1>
                    <i className="ri-checkbox-circle-fill text-lg"></i>
                  </div>

                  <h1 className="my-4 text-gray-600">
                    {video?.actual_views + video?.admin_views} Views
                  </h1>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default VideoScreen;

export async function getServerSideProps(context: any) {
  const video = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}video/${context.query?.id}
    `
  ).then((res) => res.json());

  return {
    props: {
      video: video?.video || {},
      videos: video?.videos || [],
    },
  };
}
