import { useRouter } from "next/router";
import AboutSection from "../../components/AboutSection";
import AddInterestBtn from "../../components/AddInterestBtn";
import AskExpertSection from "../../components/AskExpertSection";
import EmptyList from "../../components/EmptyList";
import FAQ from "../../components/FAQ";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import LeftSideBar from "../../components/LeftSideBar";
import RecommendedStores from "../../components/RecommendedStores";
import RightSideBar from "../../components/RightSideBar";
import SubHeader from "../../components/SubHeader";
import user from "../../assets/users/profile.png";
import { review } from "../../constants/interfaces";
import ReviewCard from "../../components/ReviewCard";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import Resizer from "react-image-file-resizer";
import Image from "next/image";
import Head from "next/head";
import dynamic from "next/dynamic";

export default function Home(props: any) {
  const StarPicker = dynamic(() => import("react-star-picker"), {
    ssr: false,
  });

  const router = useRouter();
  const { query, asPath } = router;

  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [rating, setRating] = useState(0);

  const toggle = () => setShowForm(!showForm);

  const { data: session } = useSession();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onChange = (value: any) => {
    setRating(value);
  };

  const handleImage = (e: any) => {
    e.preventDefault();
    let file = e.target.files[0];
    setLoading(true);
    // resize image and send image to backend
    Resizer.imageFileResizer(
      file,
      720,
      500,
      "PNG",
      100,
      0,
      async (uri: any) => {
        try {
          let { data } = await axios.post(
            process.env.NEXT_PUBLIC_API_URL + `images`,
            {
              image: uri,
            }
          );
          // @ts-ignore
          setImages([...images, data.Location]);
          toast.success("Success");
        } catch (err) {
          toast.error("Something went wrong");
        } finally {
          setLoading(false);
        }
      }
    );
  };

  const handleSave = async (dataProps: any) => {
    setIsLoading(true);
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}review`,
      {
        ...dataProps,
        item_id: query?.name,
        ratings: rating,
        images,
      },
      {
        headers: {
          "Content-Type": "application/json", // @ts-ignore
          Authorization: `Bearer ${session?.user?.accessToken}`,
        },
      }
    );

    if (res?.data?.success) {
      toast.success("reviewed successfully");
      reset();
      setLoading(false);
      setShowForm(false);
      setImages([]);
    } else {
      toast.error("Something went wrong");
    }
    setIsLoading(false);
  };

  return (
    <>
      <Head>
        <title>Rezgari || Reviews</title>
        <meta
          name="description"
          content={`Welcome to Rezgari - India's Trusted Coupons, Offers & Cashback Website`}
        />
      </Head>
      <div className="w-screen">
        <Header />
        <div className="flex">
          <LeftSideBar
            stores={props?.stores}
            popularStores={props?.popularStores}
          />
          <div className="flex flex-col items-center px-4 md:px-8 mx-auto my-8 p-auto gap-3 w-full lg:w-[60%]">
            {/* <SubHeader
              offers={`store/${query?.name}`}
              videos={`videos/${query?.name}`}
              mustread={`videos/${query?.name}`}
              reviews={asPath}
            /> */}
            <div className="flex justify-center items-center w-full my-4">
              <button
                onClick={toggle}
                className="block mx-auto rounded-full shadow-lg lg:w-1/3 bg-[#003049] hover:bg-[#003049] focus:shadow-outline focus:outline-none text-white text-xs py-4 lg:py-6 px-10 lg:rounded-xl"
              >
                write a review
              </button>
              <div className="w-1/2 lg:w-1/3 flex rounded-full justify-center items-center mx-auto border border-slate-200 bg-white lg:py-6 lg:rounded-lg shadow-lg">
                <div className="relative z-20">
                  <Image
                    src={user}
                    height={100}
                    width={100}
                    alt="plant"
                    className="h-10 w-10 rounded-full absolute right-4 top-4"
                  />
                  <Image
                    src={user}
                    height={100}
                    width={100}
                    alt="plant"
                    className="h-10 w-10 rounded-full"
                  />
                </div>
                <div className="ml-4">
                  <h1 className="text-2xl font-bold ">{props?.count}</h1>
                  <p className="font-thin text-sm text-slate-500">Reviews</p>
                </div>
              </div>
            </div>
            {showForm && (
              <form onSubmit={handleSubmit(handleSave)}>
                <div className="relative w-full mb-3">
                  <label
                    className="block text-gray-800 text-lg font-extrabold mb-2"
                    htmlFor="message"
                  >
                    Add your Review
                  </label>
                  <textarea
                    maxLength={300}
                    rows={4}
                    cols={80}
                    className="px-3 py-3 bg-white rounded-2xl border placeholder-gray-400 text-gray-600 text-sm shadow focus:outline-none w-full"
                    placeholder="write here...."
                    {...register("comment", { required: true })}
                  ></textarea>
                </div>
                {images.length > 0 && (
                  <>
                    <div className="flex gap-2 my-4">
                      {images.map((image, index) => (
                        <div
                          key={index}
                          className="flex flex-col gap-2 w-32 h-32 bg-white rounded-2xl border border-gray-300 p-2 shadow-md"
                        >
                          <div className="flex gap-2 w-full h-full">
                            <div className="flex flex-col gap-2 w-full h-full relative">
                              <Image
                                src={image}
                                alt="plant"
                                className="w-full h-full rounded-lg"
                                height={100}
                                width={1000}
                              />
                              <button
                                onClick={() =>
                                  setImages(
                                    images?.filter((img) => img !== image)
                                  )
                                }
                                className="btn absolute p-1 h-8 w-8 flex justify-center items-center -top-4 -right-4 z-40 bg-white rounded-full border border-gray-700"
                              >
                                {""}{" "}
                                <i className="dropdown-icon text-xl ri-delete-bin-6-line"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
                <div className="border rounded-2xl border-dashed border-gray-500 bg-white relative">
                  <input
                    type="file"
                    placeholder=""
                    name="files"
                    id="files"
                    multiple
                    className="cursor-pointer relative block opacity-0 w-full h-full p-10 z-50"
                    onChange={handleImage}
                  />
                  <div className="text-center p-10 absolute top-0 right-0 left-0 m-auto">
                    <i className="ri-camera-line text-3xl"></i>
                  </div>
                </div>

                <label
                  className="block mt-6 text-gray-800 text-lg font-extrabold mb-2"
                  htmlFor="files"
                >
                  Give your ratings
                </label>
                <div className="border p-6 rounded-2xl border-dashed border-gray-500 bg-white relative">
                  {/* @ts-ignore */}
                  <StarPicker onChange={onChange} value={rating} />
                </div>
                <button
                  type="submit"
                  className="rounded-full bg-gray-800 mt-6 py-2 px-10 text-white"
                  disabled={isLoading}
                >
                  {isLoading ? "Sending..." : "Submit"}
                </button>
              </form>
            )}

            {/* <div className="w-[90%]">
            <RecommendedStores />
          </div> */}
            <section className="w-[90vw] lg:w-full p-4 overflow-x-auto hide-scroll-bar">
              <div className="flex flex-grow"></div>
            </section>
            {/* <SubHeader2
            picks={`${query?.category}?q=picks`}
            popular={`${query?.category}?q=popular`}
            recently={`${query?.category}?q=recently`}
            recommended={`${query?.category}?q=recommended`}
            rated={`${query?.category}?q=rated`}
          /> */}
            {props.reviews?.length <= 0 && <EmptyList />}
            {props.reviews?.map((review: review, i: number) => (
              <ReviewCard
                key={i}
                _id={review?._id}
                comment={review?.comment}
                user_id={review?.user_id}
                ratings={review?.ratings}
                images={review?.images}
                createdAt={review?.createdAt}
              />
            ))}
          </div>
          <RightSideBar />
        </div>
        {/* <AboutSection /> */}
        <div>
          {props.store?.content_below?.map(
            (cont: any, i: number) =>
              cont?.desc !== "" && (
                <div
                  key={i}
                  className="min-w-screen mx-auto p-4 lg:px-72 bg-white"
                >
                  <>
                    <h3 className="text-[#D62828] font-extrabold text-xl my-4">
                      {cont?.tab}
                    </h3>
                    <div className="flex flex-col-reverse lg:flex-row w-full gap-8 overflow-auto">
                      <div dangerouslySetInnerHTML={{ __html: cont?.desc }} />
                    </div>
                  </>
                </div>
              )
          )}
        </div>
        <div>
          {props.category?.content_below?.map(
            (cont: any, i: number) =>
              cont?.desc !== "" && (
                <div
                  key={i}
                  className="min-w-screen mx-auto pt-12 px-4 lg:px-72 bg-white"
                >
                  <>
                    <h3 className="text-[#D62828] font-extrabold text-xl my-4">
                      {cont?.tab}
                    </h3>
                    <div className="flex flex-col-reverse lg:flex-row w-full gap-8 overflow-auto">
                      <div dangerouslySetInnerHTML={{ __html: cont?.desc }} />
                    </div>
                  </>
                </div>
              )
          )}
        </div>
        <FAQ faqs={props.store?.faqs} />

        <AskExpertSection />
        <Footer />
      </div>
    </>
  );
}

export async function getServerSideProps(context: any) {
  const reviews = await fetch(`${process.env.NEXT_PUBLIC_API_URL}reviews`).then(
    (res) => res.json()
  );

  const stores = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}store/top
    `
  ).then((res) => res.json());

  return {
    props: {
      reviews: reviews?.reviews || null,
      count: reviews?.count || 0,
      store: reviews?.store || {},
      category: reviews?.category || {},
      stores: stores.stores || [],
      popularStores: stores.popularStores || [],
    },
  };
}
