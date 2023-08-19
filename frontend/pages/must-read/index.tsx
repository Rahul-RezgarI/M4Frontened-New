import { StaticImageData } from "next/image";
import AboutSection from "../../components/AboutSection";
import AddInterestBtn from "../../components/AddInterestBtn";
import AskExpertSection from "../../components/AskExpertSection";
import FAQ from "../../components/FAQ";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import LeftSideBar from "../../components/LeftSideBar";
import MustReadCard from "../../components/MustReadCard";
import RecommendedStores from "../../components/RecommendedStores";
import RightSideBar from "../../components/RightSideBar";
import SubHeader from "../../components/SubHeader";
import SubHeader2 from "../../components/SubHeader2";
import mustreads from "../../data/mustread";
import EmptyList from "../../components/EmptyList";
import { useState } from "react";

export default function Home(props: any) {
  const itemsPerPage = 2; // Number of blogs to display per page
  const totalPages = Math.ceil(props?.blogs?.length / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  const goToPreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const blogsToDisplay = props?.blogs?.slice(startIndex, endIndex);

  return (
    <div className="w-screen">
      <Header />
      <div className="flex w-full">
        <LeftSideBar
          stores={props?.stores}
          popularStores={props?.popularStores}
        />
        <div className="flex flex-col lg:w-[60%] items-center px-4 md:px-8 mx-auto my-8 p-auto gap-3">
          <RecommendedStores />

          <AddInterestBtn />

          <section className="w-[90vw] lg:w-full p-4 overflow-x-auto hide-scroll-bar">
            <div className="flex flex-grow"></div>
          </section>
          {/* <SubHeader2 /> */}
          {props?.blogs?.length <= 0 && <EmptyList />}
          {blogsToDisplay.length === 0 && <EmptyList />}
          {blogsToDisplay.map((mustread: any, i: number) => (
            <MustReadCard
              key={i}
              mobile_image={mustread?.jetpack_featured_media_url}
              desktop_image={mustread?.jetpack_featured_media_url}
              title={mustread?.title?.rendered as string}
              content_below={mustread?.content?.rendered}
              link={mustread?.link as string}
              content_above={mustread.content_above}
            />
          ))}

          <div className="pagination border drop-shadow-lg shadow-xl p-2">
            {currentPage > 1 && (
              <button
                className="border-r-2 pr-2 mr-2 text-red-600"
                onClick={goToPreviousPage}
              >
                Prev
              </button>
            )}
            <span>
              Page {currentPage} of{" "}
              {Math.ceil(props?.blogs?.length / itemsPerPage)}
            </span>
            {currentPage < totalPages && (
              <button
                className="border-l-2 pl-2 ml-2 text-red-600"
                onClick={goToNextPage}
              >
                Next
              </button>
            )}
          </div>
        </div>
        <RightSideBar />
      </div>
      <AboutSection />
      <FAQ />
      <AskExpertSection />
      <Footer />
    </div>
  );
}

export async function getServerSideProps(context: any) {
  const blogs = await fetch(
    `https://vps54436.inmotionhosting.com/~stageserver/rezgari/wp-json/wp/v2/posts`
  ).then((res) => res.json());

  const stores = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}store/related/${"food"}
    `
  ).then((res) => res.json());

  return {
    props: {
      blogs,
      stores: stores.stores || [],
      popularStores: stores.popularStores || [],
    },
  };
}
