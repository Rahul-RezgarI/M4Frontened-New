import { useEffect, useState } from "react";
import AboutSection from "../components/AboutSection";
import CategorySection from "../components/CategorySection";
import ContactUs from "../components/ContactUs";
import CouponCard from "../components/CouponCard";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import HomeSideBar from "../components/HomeSideBar";
import PromoCard from "../components/PromoCard";
import RightSideBar from "../components/RightSideBar";
import SearchInput from "../components/SearchInput";
import StoreSection from "../components/StoreSection";
import SubHeader2 from "../components/SubHeader2";
import SubscribeSection from "../components/SubscribeSection";
import { coupon } from "../constants/interfaces";
import Loader from "../components/Loader";
import EmptyList from "../components/EmptyList";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import AskExpertSection from "../components/AskExpertSection";
import Head from "next/head";

export default function Home(props: any) {
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);

  const query = useRouter();
  // @ts-ignore
  const { name, q } = query;

  useEffect(() => {
    const handleSearch = async () => {
      setSearchLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}coupon/search?q=${searchQuery}`
      );
      const data = await res.json();

      setSearchResults(data?.coupons);
      setSearchLoading(false);
    };

    handleSearch();
  }, [searchQuery]);

  return (
    <>
      <Head>
        <title>Rezgari || Home</title>
        <meta
          name="description"
          content={`Welcome to Rezgari - India's Trusted Coupons, Offers & Cashback Website`}
        />
      </Head>
      <main className="w-screen -z-10">
        <Header />
        {searchQuery === "" && <HeroSection />}
        <div className="flex">
          <HomeSideBar most_clicks={props.most_clicks} />
          <div className="flex w-full lg:w-2/3 flex-col items-center px-4 md:px-8 mx-auto my-8 p-auto gap-3">
            <SearchInput
              value={searchQuery}
              onChange={(e: any) => setSearchQuery(e.target.value)}
            />
            {/* @ts-ignore */}

            {searchQuery === "" ? (
              <>
                <CategorySection
                  categories={props.home_settings?.categories}
                  category_images={props.home_settings?.category_images}
                />
                {/* @ts-ignore */}
                <StoreSection stores={props.home_settings?.stores} />
                <SubHeader2
                  picks={`?q=picks`}
                  popular={`?q=popular`}
                  recently={`?q=recently`}
                  recommended={`?q=recommended`}
                  rated={`?q=rated`}
                />
                {props.coupons?.map((coupon: coupon, i: number) => (
                  <CouponCard
                    key={i}
                    mobile_image={coupon?.mobile_image}
                    desktop_image={coupon?.desktop_image}
                    icon={coupon?.store?.icon || coupon?.category?.icon}
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
              </>
            ) : (
              <>
                {searchLoading && <Loader />}
                {searchResults?.length <= 0 && !searchLoading && <EmptyList />}
                {searchResults?.map((coupon: coupon, i: number) => (
                  <CouponCard
                    key={i}
                    mobile_image={coupon?.mobile_image}
                    desktop_image={coupon?.desktop_image}
                    icon={coupon?.category?.icon}
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
              </>
            )}
            {!props.coupons && <EmptyList />}
          </div>

          <RightSideBar />
        </div>
        {/* <AboutSection /> */}

        {props?.home_settings?.is_content_below && (
          <div>
            {props.home_settings?.content_below?.map((home: any, i: number) => (
              <div
                key={i}
                className="min-w-screen mx-auto pt-12 px-4 lg:px-72 bg-white"
              >
                {home?.desc !== "" && (
                  <>
                    <h3 className="text-[#D62828] font-extrabold text-xl my-4">
                      {home?.tab}
                    </h3>
                    <div className="flex flex-col-reverse lg:flex-row w-full gap-8 overflow-auto">
                      <div dangerouslySetInnerHTML={{ __html: home?.desc }} />
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}

        {/* @ts-ignore */}
        {props?.home_settings?.is_faqs && (
          <FAQ faqs={props.home_settings?.faqs} />
        )}
        <AskExpertSection />
        <SubscribeSection />

        <hr />
        <ContactUs />
        <Footer />
      </main>
    </>
  );
}

export async function getServerSideProps(context: any) {
  const session = await getSession(context);

  const [coupons, categories, stores, most_clicks, home_settings] =
    await Promise.all([
      context.query.q === "picks"
        ? fetch(`${process.env.NEXT_PUBLIC_API_URL}clicks/me`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json", // @ts-ignore
              Authorization: `Bearer ${context?.query?.token}`,
            },
          }).then((res) => res.json())
        : context.query.q === "popular"
        ? fetch(
            `${process.env.NEXT_PUBLIC_API_URL}coupon/mostpopular?name=&order=${context?.query?.q}
    `
          ).then((res) => res.json())
        : context.query.q === "recommended"
        ? fetch(
            `${process.env.NEXT_PUBLIC_API_URL}coupon/recommended?name=&order=${context?.query?.q}
    `
          ).then((res) => res.json())
        : context.query.q === "recently"
        ? fetch(
            `${process.env.NEXT_PUBLIC_API_URL}coupon/recentlyadded?name=&order=${context?.query?.q}
    `
          ).then((res) => res.json())
        : context.query.q === "rated"
        ? fetch(
            `${process.env.NEXT_PUBLIC_API_URL}coupon/rated?name=&order=${context?.query?.q}
    `
          ).then((res) => res.json())
        : fetch(`${process.env.NEXT_PUBLIC_API_URL}coupon`).then((res) =>
            res.json()
          ),

      fetch(`${process.env.NEXT_PUBLIC_API_URL}category`).then((res) =>
        res.json()
      ),
      fetch(`${process.env.NEXT_PUBLIC_API_URL}store`).then((res) =>
        res.json()
      ),
      fetch(`${process.env.NEXT_PUBLIC_API_URL}store/top`).then((res) =>
        res.json()
      ),
      fetch(`${process.env.NEXT_PUBLIC_API_URL}settings/settings`).then((res) =>
        res.json()
      ),
    ]);

  return {
    props: {
      session,
      coupons: coupons?.coupons || null,
      categories: categories?.categories || null,
      stores: stores?.stores || null,
      most_clicks: most_clicks?.stores || null,
      home_settings: home_settings?.data || null,
    },
  };
}
