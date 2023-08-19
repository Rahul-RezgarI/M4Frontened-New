import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function CategorySection(props: any) {
  return (
    <section className="w-full mt-8">
      <h1 className="font-bold lg:font-extrabold my-4 text-[24px]  lg:text-[24px] underline uppercase">
        Top Categories
      </h1>
      <div className="flex">
        <div className="bg-[#F77F00]  hidden w-[417px] min-h-[40vh] rounded-[30px]  drop-shadow-2xl px-6 text-white lg:flex">
          <h5 className="font-bold my-auto text-2xl">
            Trending categarios:Shop Now and Save BIG!
          </h5>
        </div>
        <div className="flex lg:grid grid-cols-4 w-[90vw] lg:w-full gap-4 overflow-x-auto hide-scroll-bar py-4">
          {props.categories?.map((category: any) => (
            <Link
              key={category?._id}
              href={"/category/" + category?.slug}
              className="flex flex-col items-center text-center"
            >
              <div className="h-[84px] w-[84px] rounded-lg bg-[#FBFBFB] hover:bg-white mb-4 border  transition-transform duration-300 ease-in-out transform hover:scale-110 lg:rounded-full lg:bg-[#D9D9D9] flex justify-center items-center">
                <Image
                  src={category?.icon}
                  alt=""
                  className="h-[45px] w-[45px] m-auto"
                  height={45}
                  width={45}
                />
              </div>
              <span>{category?.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
