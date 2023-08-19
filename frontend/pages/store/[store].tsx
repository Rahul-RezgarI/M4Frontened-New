import Image from "next/image";
import AddInterestBtn from "../../components/AddInterestBtn";
import CouponCard from "../../components/CouponCard";
import FAQ from "../../components/FAQ";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import LeftSideBar from "../../components/LeftSideBar";
import RecommendedStores from "../../components/RecommendedStores";
import RightSideBar from "../../components/RightSideBar";
import SubHeader from "../../components/SubHeader";
import SubHeader2 from "../../components/SubHeader2";
import info from "../../assets/dominos/info.jpeg";
import EmptyList from "../../components/EmptyList";
import { useRouter } from "next/router";
import { coupon } from "../../constants/interfaces";
import { getSession, useSession } from "next-auth/react";
import AskExpertSection from "../../components/AskExpertSection";
import Head from "next/head";

export default function Home(props: any) {
  const { query, asPath, push } = useRouter();

  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>Rezgari || {query?.store}</title>
        <meta name="description" content={`${query?.store} is on Rezgari`} />
      </Head>
      <div>
        <Header />
        <div className="flex">
          <LeftSideBar
            stores={props?.stores}
            popularStores={props?.popularStores}
          />
          <div className="flex flex-col items-center px-4 md:px-8 mx-auto my-8 p-auto gap-3">
            <SubHeader
              offers={() => push(asPath)}
              videos={`videos/${query?.store}`}
              mustread={`must-read/${query?.store}`}
              reviews={`reviews/${query?.store}`}
            />
            <RecommendedStores />
            <AddInterestBtn content={props?.store} />
            <SubHeader2
              picks={`${query?.store}?q=picks`}
              popular={`${query?.store}?q=popular`}
              recently={`${query?.store}?q=recently`}
              recommended={`${query?.store}?q=recommended`}
              rated={`${query?.store}?q=rated`}
            />
            {props.coupons.length <= 0 && <EmptyList />}
            {props.coupons?.map((coupon: coupon, i: number) => (
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
                is_content_above={coupon?.is_content_above}
                is_content_below={coupon?.is_content_below}
                text={coupon?.text}
                total_reviews={coupon?.total_reviews}
                coupon_format={coupon?.coupon_format}
                image_format_desktop={coupon?.image_format_desktop}
              />
            ))}
          </div>
          <RightSideBar />
        </div>
        <div>
          {props.store?.content_below?.map(
            (content: any, i: number) =>
              content?.desc !== "" && (
                <div
                  key={i}
                  className="min-w-screen mx-auto p-4 lg:px-72 bg-white"
                >
                  <>
                    <h3 className="text-[#D62828] font-extrabold text-xl my-4">
                      {content?.tab}
                    </h3>
                    <div className="flex flex-col-reverse lg:flex-row w-full gap-8 overflow-auto">
                      <div
                        dangerouslySetInnerHTML={{ __html: content?.desc }}
                      />
                    </div>
                  </>
                </div>
              )
          )}
        </div>

        {props?.store?.is_faqs && <FAQ faqs={props.store?.faqs} />}
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
      `${process.env.NEXT_PUBLIC_API_URL}clicks/me?name=${context.params.store}&order=${context?.query?.q}
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
      `${process.env.NEXT_PUBLIC_API_URL}coupon/mostpopular?name=${context.params.store}&order=${context?.query?.q}
    `
    ).then((res) => res.json());
  } else if (context.query.q === "recommended") {
    coupons = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}coupon/recommended?name=${context.params.store}&order=${context?.query?.q}
    `
    ).then((res) => res.json());
  } else if (context.query.q === "recently") {
    coupons = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}coupon/recentlyadded?name=${context.params.store}&order=${context?.query?.q}
    `
    ).then((res) => res.json());
  } else if (context.query.q === "rated") {
    coupons = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}coupon/rated?name=${context.params.store}&order=${context?.query?.q}
    `
    ).then((res) => res.json());
  } else {
    coupons = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}coupon/stores/${
        context.params.store
      }?order=${context?.query?.q}&tags=${
        context?.query?.tags || ""
      }&subcategory=${context?.query?.subcategory || ""}
    `
    ).then((res) => res.json());
  }

  const stores = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}store/related/${context.params.store}
    `
  ).then((res) => res.json());

  return {
    props: {
      session,
      coupons: coupons?.coupons || [],
      store: coupons?.store || [],
      stores: stores.stores || [],
      popularStores: stores.popularStores || [],
    },
  };
}
