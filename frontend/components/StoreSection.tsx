import Image from "next/image";
import Link from "next/link";
import React from "react";
import message from "../assets/stores/pizza.svg";
import dominos from "../assets/dominos/logo.png";

export default function StoreSection(props: any) {
  return (
    <section className="w-full">
      <h1 className="font-bold lg:font-extrabold my-4 text-[24px] underline uppercase">
        Top Stores
      </h1>
      <div className="flex">
        <div className="bg-[#003049] hidden  w-[417px]  min-h-[40vh] drop-shadow-2xl rounded-[30px] px-6 text-white text-center lg:flex flex-col">
          <h5 className="font-bold my-auto text-2xl">
            We’ve more than 500 stores listed!
          </h5>
          <h5 className="font-bold my-auto text-2xl">
            Shop on your favoritestore now!
          </h5>
        </div>
        <div className="grid grid-cols-4 w-[90vw] lg:w-full gap-4 overflow-x-auto hide-scroll-bar">
          {props?.stores?.map((store: any) => (
            <Link
              key={store._id}
              href={"/store/" + store?.slug}
              className="flex flex-col items-center text-center"
            >
              <div className="h-[84px] w-[84px] flex justify-center items-center  transition-transform duration-300 ease-in-out transform hover:scale-110">
                <Image
                  src={store?.icon}
                  alt=""
                  className="h-[45px] w-[45px] m-auto"
                  height={45}
                  width={45}
                />
              </div>
              <span>{store?.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
