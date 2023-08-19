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
import SubHeader2 from "../../components/SubHeader2";
import VideoCard from "../../components/VIdeoCard";
import { video } from "../../constants/interfaces";
import Head from "next/head";

export default function Home(props: any) {
  const router = useRouter();
  const currentPath = router.asPath;
  const lastSlashIndex = currentPath.lastIndexOf("/");
  const pathBeforeCurrent = currentPath.slice(0, lastSlashIndex);

  return (
    <>
      <Head>
        <title>Rezgari || Videos</title>
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
          <div className="flex flex-col items-center px-4 md:px-8 mx-auto my-8 p-auto gap-3">
            {/* <SubHeader /> */}
            <div className="w-[90%]">
              <RecommendedStores />
            </div>
            {pathBeforeCurrent}
            <AddInterestBtn />
            <SubHeader2
              picks={`videos?q=picks`}
              popular={`videos?q=popular`}
              recently={`videos?q=recently`}
              recommended={`videos?q=recommended`}
              rated={`videos?q=rated`}
            />
            {/* <SubHeader2 /> */}
            {props.videos?.length <= 0 && <EmptyList />}
            {props.videos?.map((video: video, i: number) => (
              <VideoCard
                key={i}
                _id={video?._id}
                mobile_image={video?.mobile_image}
                desktop_image={video?.desktop_image}
                icon={video?.store?.icon}
                title={video?.title}
                total_clicks={video?.total_clicks}
                total_votes={video?.total_votes}
                content_above={video?.description}
                thumbnail={video?.thumbnail}
                description={video?.description}
                store={video?.store}
                category={video?.category}
                content_below={video?.content_below}
              />
            ))}
          </div>
          <RightSideBar />
        </div>
        {/* <AboutSection /> */}
        {/* <FAQ />
      <AskExpertSection /> */}
        <Footer />
      </div>
    </>
  );
}

export async function getServerSideProps(context: any) {
  let videos;

  if (context.query.q === "picks") {
    videos = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}videos/myclicks?name=&order=${context?.query?.q}
    `
    ).then((res) => res.json());
  } else if (context.query.q === "popular") {
    videos = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}videos/mostpopular?name=&order=${context?.query?.q}
    `
    ).then((res) => res.json());
  } else if (context.query.q === "recommended") {
    videos = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}videos/recommended?name=&order=${context?.query?.q}
    `
    ).then((res) => res.json());
  } else if (context.query.q === "recently") {
    videos = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}videos/recentlyadded?name=&order=${context?.query?.q}
    `
    ).then((res) => res.json());
  } else if (context.query.q === "rated") {
    videos = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}videos/rated?name=&order=${context?.query?.q}
    `
    ).then((res) => res.json());
  } else {
    videos = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}videos/mostpopular?name=&order=
    `
    ).then((res) => res.json());
  }

  const stores = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}store/top
    `
  ).then((res) => res.json());

  return {
    props: {
      videos: videos?.videos || [],
      store: videos?.store || [],
      category: videos?.category || [],
      stores: stores?.relatedStores || [],
      popularStores: stores?.stores || [],
    },
  };
}
