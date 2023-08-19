import Image from "next/image";
import React from "react";
import home from "../assets/vectors/home.svg";
import video from "../assets/vectors/video.svg";
import reviews from "../assets/vectors/reviews.svg";
import mustread from "../assets/vectors/must-read.svg";
import Link from "next/link";
import { useSidebarContext } from "../context/toggle.context";

function HomeSideBar(props: any) {
  const { isSidebarOpen, toggleSidebar } = useSidebarContext();

  return (
    <>
      <aside className="sticky top-16 py-8 w-[300px] bg-[#D62828] overflow-x-auto hide-scroll-bar z-20  hidden lg:flex min-h-full h-screen flex-col justify-center items-center space-y-4">
        <div
          className={`flex flex-col p-6 space-y-8 pb-40 overflow-auto hide-scroll-bar`}
        >
          <Link
            href={"/"}
            className="w-full pr-3 flex flex-col gap-y-1 text-gray-500 fill-gray-500 text-sm"
          >
            <div className="w-full flex items-center gap-x-1.5 group select-none">
              <div className="w-1 rounded-xl h-8 bg-transparent transition-colors duration-200 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[102%] group-hover:translate-y-0 translate-y-0 bg-red-600 transition-all duration-300"></div>
              </div>
              <div className="text-white group-hover:bg-white/10 w-full group-active:scale-95 self-stretch pl-2 rounded flex items-center space-x-2 transition-all duration-200 dark:group-hover:text-white dark:hover:text-white text-sm">
                <Image src={home} alt="" className="h-5 w-5" />
                <span className="font-QuicksandMedium uppercase">Home</span>
              </div>
            </div>
          </Link>
          <Link
            href={"/videos"}
            className="w-full pr-3 flex flex-col gap-y-1 text-gray-500 fill-gray-500 text-sm"
          >
            <div className="w-full flex items-center gap-x-1.5 group select-none">
              <div className="w-1 rounded-xl h-8 bg-transparent transition-colors duration-200 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[102%] group-hover:translate-y-0 translate-y-0 bg-red-600 transition-all duration-300"></div>
              </div>
              <div className="text-white group-hover:bg-white/10 w-full group-active:scale-95 self-stretch pl-2 rounded flex items-center space-x-2 transition-all duration-200 dark:group-hover:text-white dark:hover:text-white text-sm">
                <Image src={video} alt="" className="h-5 w-5" />
                <span className="font-QuicksandMedium uppercase">Video</span>
              </div>
            </div>
          </Link>
          <Link
            href={"/must-read"}
            className="w-full pr-3 flex flex-col gap-y-1 text-gray-500 fill-gray-500 text-sm pointer-events-none"
          >
            <div className="w-full flex items-center gap-x-1.5 group select-none">
              <div className="w-1 rounded-xl h-8 bg-transparent transition-colors duration-200 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[102%] group-hover:translate-y-0 translate-y-0 bg-red-600 transition-all duration-300"></div>
              </div>
              <div className="text-white group-hover:bg-white/10 w-full group-active:scale-95 self-stretch pl-2 rounded flex items-center space-x-2 transition-all duration-200 dark:group-hover:text-white dark:hover:text-white text-sm">
                <Image src={mustread} alt="" className="h-5 w-5" />
                <span className="font-QuicksandMedium uppercase">
                  Must Read
                </span>
              </div>
            </div>
          </Link>
          <Link
            href={"/reviews"}
            className="w-full pr-3 flex flex-col gap-y-1 text-gray-500 fill-gray-500 text-sm"
          >
            <div className="w-full flex items-center gap-x-1.5 group select-none">
              <div className="w-1 rounded-xl h-8 bg-transparent transition-colors duration-200 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[102%] group-hover:translate-y-0 translate-y-0 bg-red-600 transition-all duration-300"></div>
              </div>
              <div className="text-white group-hover:bg-white/10 w-full group-active:scale-95 self-stretch pl-2 rounded flex items-center space-x-2 transition-all duration-200 dark:group-hover:text-white dark:hover:text-white text-sm">
                <Image src={reviews} alt="" className="h-5 w-5" />
                <span className="font-QuicksandMedium uppercase">Review</span>
              </div>
            </div>
          </Link>
          <div className="text-white">
            <h1 className="font-bold">Most clicked stores</h1>
            <hr />
            <div>
              {props?.most_clicks?.map((store: any) => (
                <Link
                  href={`store/${store?.slug}`}
                  key={store?._id}
                  className="w-[172px] h-[40px] rounded-full overflow-hidden transition-transform ease-in-out transform hover:scale-110 bg-white shadow-md duration-200 hover:shadow-xl flex items-center py-1 my-2 px-4"
                >
                  <Image
                    src={store?.icon}
                    alt="plant"
                    className="h-8 w-8"
                    width={100}
                    height={100}
                  />{" "}
                  <span className="text-black truncate text-xs ml-4 font-extrabold">
                    {store?.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </aside>
      {isSidebarOpen && (
        <aside
          onClick={toggleSidebar}
          className="fixed top-16 py-8 bg-[#D62828] z-30 overflow-x-auto duration-200 transition-all px-6  lg:hidden min-h-full h-screen flex-col justify-center items-center space-y-4"
        >
          <div
            className={`flex flex-col p-6 space-y-8 pb-40 overflow-auto hide-scroll-bar`}
          >
            <Link
              href={"/"}
              className="w-full pr-3 flex flex-col gap-y-1 text-gray-500 fill-gray-500 text-sm"
            >
              <div className="w-full flex items-center gap-x-1.5 group select-none">
                <div className="w-1 rounded-xl h-8 bg-transparent transition-colors duration-200 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-[102%] group-hover:translate-y-0 translate-y-0 bg-red-600 transition-all duration-300"></div>
                </div>
                <div className="text-white group-hover:bg-white/10 w-full group-active:scale-95 self-stretch pl-2 rounded flex items-center space-x-2 transition-all duration-200 dark:group-hover:text-white dark:hover:text-white text-sm">
                  <Image src={home} alt="" className="h-5 w-5" />
                  <span className="font-QuicksandMedium uppercase">Home</span>
                </div>
              </div>
            </Link>
            <Link
              href={"/videos"}
              className="w-full pr-3 flex flex-col gap-y-1 text-gray-500 fill-gray-500 text-sm"
            >
              <div className="w-full flex items-center gap-x-1.5 group select-none">
                <div className="w-1 rounded-xl h-8 bg-transparent transition-colors duration-200 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-[102%] group-hover:translate-y-0 translate-y-0 bg-red-600 transition-all duration-300"></div>
                </div>
                <div className="text-white group-hover:bg-white/10 w-full group-active:scale-95 self-stretch pl-2 rounded flex items-center space-x-2 transition-all duration-200 dark:group-hover:text-white dark:hover:text-white text-sm">
                  <Image src={video} alt="" className="h-5 w-5" />
                  <span className="font-QuicksandMedium uppercase">Video</span>
                </div>
              </div>
            </Link>
            <Link
              href={"/must-read"}
              className="w-full pr-3 flex flex-col gap-y-1 text-gray-500 fill-gray-500 text-sm pointer-events-none"
            >
              <div className="w-full flex items-center gap-x-1.5 group select-none">
                <div className="w-1 rounded-xl h-8 bg-transparent transition-colors duration-200 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-[102%] group-hover:translate-y-0 translate-y-0 bg-red-600 transition-all duration-300"></div>
                </div>
                <div className="text-white group-hover:bg-white/10 w-full group-active:scale-95 self-stretch pl-2 rounded flex items-center space-x-2 transition-all duration-200 dark:group-hover:text-white dark:hover:text-white text-sm">
                  <Image src={mustread} alt="" className="h-5 w-5" />
                  <span className="font-QuicksandMedium uppercase">
                    Must Read
                  </span>
                </div>
              </div>
            </Link>
            <Link
              href={"/reviews"}
              className="w-full pr-3 flex flex-col gap-y-1 text-gray-500 fill-gray-500 text-sm"
            >
              <div className="w-full flex items-center gap-x-1.5 group select-none">
                <div className="w-1 rounded-xl h-8 bg-transparent transition-colors duration-200 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-[102%] group-hover:translate-y-0 translate-y-0 bg-red-600 transition-all duration-300"></div>
                </div>
                <div className="text-white group-hover:bg-white/10 w-full group-active:scale-95 self-stretch pl-2 rounded flex items-center space-x-2 transition-all duration-200 dark:group-hover:text-white dark:hover:text-white text-sm">
                  <Image src={reviews} alt="" className="h-5 w-5" />
                  <span className="font-QuicksandMedium uppercase">Review</span>
                </div>
              </div>
            </Link>

            <div className="text-white">
              <h1 className="font-bold">Most clicked stores</h1>
              <hr />
              <div>
                {props?.most_clicks?.map((store: any) => (
                  <Link
                    href={`store/${store?.slug}`}
                    key={store?._id}
                    className="w-[172px] h-[40px] rounded-full overflow-hidden transition-transform ease-in-out transform hover:scale-110 bg-white shadow-md duration-200 hover:shadow-xl flex items-center py-1 my-2 px-4"
                  >
                    <Image
                      src={store?.icon}
                      alt="plant"
                      className="h-8 w-8"
                      width={100}
                      height={100}
                    />{" "}
                    <span className="text-black truncate text-xs ml-4 font-extrabold">
                      {store?.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </aside>
      )}
    </>
  );
}

export default HomeSideBar;
