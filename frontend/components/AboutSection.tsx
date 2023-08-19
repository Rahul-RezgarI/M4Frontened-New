import Image from "next/image";
import React from "react";
import mytra from "../assets/coupons/coupon.png";

export default function AboutSection() {
  return (
    <div className="min-w-screen mx-auto pt-12 px-4 lg:px-72 bg-white">
      <h3 className="text-[#D62828] font-extrabold text-xl my-4">About Food</h3>
      <div className="flex flex-col-reverse lg:flex-row w-full gap-8">
        <Image src={mytra} alt="plant" className="w-full lg:w-1/2" />
        <div className="w-full lg:w-1/2">
          Lorem ipsum dolor sit amet consectetur. Felis consequat orci dictum
          dui nunc. Nibh vehicula et turpis pulvinar ipsum id a. Rutrum enim
          elit euismod enim. Elit fermentum posuere amet dolor fermentum
          condimentum luctus. Tortor tortor dolor tortor metus fermentum eget
          rhoncus facilisis massa.Lorem ipsum dolor sit amet consectetur. Felis
          consequat orci dictum dui nunc. Nibh vehicula et turpis pulvinar ipsum
          id a. Rutrum enim elit euismod enim. Elit fermentum posuere amet dolor
          fermentum condimentum luctus. Tortor tortor dolor tortor metus
          fermentum eget rhoncus facilisis massa.
        </div>
      </div>
      <div className="py-12">
        Lorem ipsum dolor sit amet consectetur. Felis consequat orci dictum dui
        nunc. Nibh vehicula et turpis pulvinar ipsum id a. Rutrum enim elit
        euismod enim. Elit fermentum posuere amet dolor fermentum condimentum
        luctus. Tortor tortor dolor tortor metus fermentum eget rhoncus
        facilisis massa.Lorem ipsum dolor sit amet consectetur. Felis consequat
        orci dictum dui nunc. Nibh vehicula et turpis pulvinar ipsum id a.
        Rutrum enim elit euismod enim. Elit fermentum posuere amet dolor
        fermentum condimentum luctus. Tortor tortor dolor tortor metus fermentum
        eget rhoncus facilisis massa.
      </div>
    </div>
  );
}
