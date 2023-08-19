import { useRouter } from "next/router";
import AboutSection from "../../components/AboutSection";
import AddInterestBtn from "../../components/AddInterestBtn";
import CouponCard from "../../components/CouponCard";
import EmptyList from "../../components/EmptyList";
import FAQ from "../../components/FAQ";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import LeftSideBar from "../../components/LeftSideBar";
import RecommendedStores from "../../components/RecommendedStores";
import RightSideBar from "../../components/RightSideBar";
import SubHeader from "../../components/SubHeader";
import SubHeader2 from "../../components/SubHeader2";
import { coupon } from "../../constants/interfaces";
import { getSession } from "next-auth/react";
import AskExpertSection from "../../components/AskExpertSection";
import Head from "next/head";

export default function Category(props: any) {
  const { query, push, asPath } = useRouter();

  return (
    <>
      <Head>
        <title>Rezgari || {query?.category}</title>
        <meta name="description" content={`${query?.category} is on Rezgari`} />
      </Head>
      <div className="w-screen">
        <Header />
        <div className="flex">
          <LeftSideBar
            stores={props?.stores}
            popularStores={props?.popularStores}
          />
          <div className="flex flex-col items-center px-4 md:px-8 mx-auto my-8 p-auto gap-3">
            <SubHeader
              offers={() => push(asPath)}
              videos={`videos/${query?.category}`}
              mustread={`must-read/${query?.category}`}
              reviews={`reviews/${query?.category}`}
            />
            <RecommendedStores />
            <AddInterestBtn content={props?.store?.categories} />
            <SubHeader2
              picks={`${query?.category}?q=picks`}
              popular={`${query?.category}?q=popular`}
              recently={`${query?.category}?q=recently`}
              recommended={`${query?.category}?q=recommended`}
              rated={`${query?.category}?q=rated`}
            />
            {props?.coupons?.length <= 0 && <EmptyList />}
            {props?.coupons?.map((coupon: coupon, i: number) => (
              <CouponCard
                key={i}
                mobile_image={coupon?.mobile_image}
                desktop_image={coupon?.desktop_image}
                icon={coupon?.store?.icon}
                title={coupon?.title}
                admin_clicks={coupon?.admin_clicks}
                admin_votes={coupon?.admin_votes}
                actual_clicks={coupon?.actual_clicks}
                actual_votes={coupon?.actual_votes}
                content_above={coupon?.description}
                _id={coupon?._id}
                affiliate_url={coupon?.affiliate_url}
                clicks={0}
                votes={0}
                description={coupon?.description}
                category={coupon?.category}
                store={coupon?.store}
                content_below={coupon?.content_below}
                image_format_mobile={coupon?.image_format_mobile}
                image_format_desktop={coupon?.image_format_desktop}
                is_content_above={coupon?.is_content_above}
                is_content_below={coupon?.is_content_below}
                text={coupon?.text}
                total_reviews={coupon?.total_reviews}
                coupon_format={coupon?.coupon_format}
              />
            ))}
          </div>
          <RightSideBar />
        </div>
        {/* <AboutSection /> */}
        <div>
          {props.store?.content_below?.map(
            (content: any, i: number) =>
              content?.desc !== "" && (
                <div
                  key={i}
                  className="min-w-screen mx-auto pt-12 px-4 lg:px-72 bg-white"
                >
                  <h3 className="text-[#D62828] font-extrabold text-xl my-4">
                    {content?.tab}
                  </h3>
                  <div className="flex flex-col-reverse lg:flex-row w-full gap-8 overflow-auto">
                    <div dangerouslySetInnerHTML={{ __html: content?.desc }} />
                  </div>
                </div>
              )
          )}
        </div>
        {/* @ts-ignore */}
        {/* <FAQ faqs={props.store?.faqs} /> */}
        <AskExpertSection />
        <Footer />
      </div>
    </>
  );
}

export async function getServerSideProps(context: any) {
  let coupons;

  const session = await getSession(context);

  if (context.query.q === "picks") {
    coupons = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}clicks/me?name=${context.params.category}&order=${context?.query?.q}
    `,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json", // @ts-ignore
          Authorization: `Bearer ${context?.query?.token}`,
        },
      }
    ).then((res) => res.json());
  } else if (context.query.q === "popular") {
    coupons = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}coupon/mostpopular?name=${context.params.category}&order=${context?.query?.q}
    `
    ).then((res) => res.json());
  } else if (context.query.q === "recommended") {
    coupons = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}coupon/recommended?name=${context.params.category}&order=${context?.query?.q}
    `
    ).then((res) => res.json());
  } else if (context.query.q === "recently") {
    coupons = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}coupon/recentlyadded?name=${context.params.category}&order=${context?.query?.q}
    `
    ).then((res) => res.json());
  } else if (context.query.q === "rated") {
    coupons = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}coupon/rated?name=${context.params.category}&order=${context?.query?.q}
    `
    ).then((res) => res.json());
  } else {
    coupons = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}coupon/categories/${
        context.params.category
      }?tags=${context?.query?.tags || ""}&subcategory=${
        context?.query?.subcategory || ""
      }`
    ).then((res) => res.json());
  }

  const stores = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}store/related/${context.params.category}
    `
  ).then((res) => res.json());

  return {
    props: {
      session,
      coupons: coupons?.coupons || null,
      store: coupons?.store || null,
      stores: stores.stores || [],
      popularStores: stores.popularStores || [],
    },
  };
}
