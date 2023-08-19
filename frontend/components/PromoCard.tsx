import Image from "next/image";
import React from "react";
import coupon from "../assets/coupons/promo.png";
import message from "../assets/actions/message.svg";
import share from "../assets/actions/share.svg";
import percentage from "../assets/actions/percent.svg";
import mytra from "../assets/brands/mytra.svg";

function PromoCard() {
  return (
    <div>
      <div className="lg:w-[550px] overflow-hidden rounded-xl bg-white shadow-md duration-200 hover:shadow-xl">
        <div className="flex gap-4 p-5">
          <Image src={mytra} alt="plant" className="h-10 w-10 rounded-full" />
          <div>
            <h3 className="text-[#D62828] font-bold text-xl my-2">
              Dominos Offers
            </h3>
            <h5 className="text-[#003049] font-bold text-md">
              Super Saver Deal
            </h5>
            <p className="text-[10px] font-semibold lg:text-[16px] mb-5 text-gray-700">
              Lorem ipsum dolor sit amet consectetur. Felis consequat orci
              dictum dui nunc. Nibh vehicula et turpis pulvinar ipsum id a.
            </p>
          </div>
        </div>
        <Image src={coupon} alt="plant" className="h-auto w-full" />
        <hr className="w-full" />
        <div className="mt-2 flex justify-between">
          <div className="flex gap-[32px] lg:gap-[50px]">
            <Image
              src={percentage}
              alt="plant"
              className="h-5 w-5 lg:h-[26px] lg:w-[26px]"
            />
            <Image
              src={message}
              alt="plant"
              className="h-5 w-5 lg:h-[26px] lg:w-[26px]"
            />
            <Image
              src={share}
              alt="plant"
              className="h-5 w-5 lg:h-[26px] lg:w-[26px]"
            />
          </div>
          <button className="rounded-full text-[10px] lg:text-[18px] rounded-tr-3xl bg-[#D62828] px-4 py-2 text-indigo-100 hover:bg-[#D62828] hover:shadow-md duration-75">
            Visit the Store!
          </button>
        </div>
      </div>
    </div>
  );
}

export default PromoCard;
