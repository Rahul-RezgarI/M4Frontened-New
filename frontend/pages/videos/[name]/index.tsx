import { useRouter } from "next/router";
import AboutSection from "../../../components/AboutSection";
import AddInterestBtn from "../../../components/AddInterestBtn";
import AskExpertSection from "../../../components/AskExpertSection";
import EmptyList from "../../../components/EmptyList";
import FAQ from "../../../components/FAQ";
import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import LeftSideBar from "../../../components/LeftSideBar";
import RecommendedStores from "../../../components/RecommendedStores";
import RightSideBar from "../../../components/RightSideBar";
import SubHeader from "../../../components/SubHeader";
import SubHeader2 from "../../../components/SubHeader2";
import VideoCard from "../../../components/VIdeoCard";
import { video } from "../../../constants/interfaces";
import Head from "next/head";

export default function Home(props: any) {
  const router = useRouter();
  const { query, asPath } = router;

  return (
    <>
      <Head>
        <title>Rezgari || {query.name}</title>
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
            <SubHeader
              offers={() => router.back()}
              videos={`${asPath}`}
              mustread={`must-read/${query?.name}`}
              reviews={`reviews/${query?.name}`}
            />
            <div className="w-[90%]">
              <RecommendedStores />
            </div>
            <AddInterestBtn />
            <section className="w-[90vw] lg:w-full p-4 overflow-x-auto hide-scroll-bar">
              <div className="flex flex-grow"></div>
            </section>
            <SubHeader2
              picks={`${query?.name}?q=picks`}
              popular={`${query?.name}?q=popular`}
              recently={`${query?.name}?q=recently`}
              recommended={`${query?.name}?q=recommended`}
              rated={`${query?.name}?q=rated`}
            />
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
                  className="min-w-screen mx-auto p-4 lg:px-72 bg-white"
                >
                  <h3 className="text-[#D62828] font-extrabold text-xl my-4">
                    {cont?.tab}
                  </h3>
                  <div className="flex flex-col-reverse lg:flex-row w-full gap-8 overflow-auto">
                    <div dangerouslySetInnerHTML={{ __html: cont?.desc }} />
                  </div>
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
  let videos;

  if (context.query.q === "picks") {
    videos = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}videos/myclicks?name=${context.query.name}&order=${context?.query?.q}
    `
    ).then((res) => res.json());
  } else if (context.query.q === "popular") {
    videos = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}videos/mostpopular?name=${context.query.name}&order=${context?.query?.q}
    `
    ).then((res) => res.json());
  } else if (context.query.q === "recommended") {
    videos = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}videos/recommended?name=${context.query.name}&order=${context?.query?.q}
    `
    ).then((res) => res.json());
  } else if (context.query.q === "recently") {
    videos = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}videos/recentlyadded?name=${context.query.name}&order=${context?.query?.q}
    `
    ).then((res) => res.json());
  } else if (context.query.q === "rated") {
    videos = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}videos/rated?name=${context.query.name}&order=${context?.query?.q}
    `
    ).then((res) => res.json());
  } else {
    videos = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}video/all/${context?.query?.name}`
    ).then((res) => res.json());
  }

  const stores = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}store/related/${context.query?.name}
    `
  ).then((res) => res.json());

  return {
    props: {
      videos: videos?.videos || [],
      store: videos?.store || [],
      category: videos?.category || [],
      stores: stores.stores || [],
      popularStores: stores.popularStores || [],
    },
  };
}
