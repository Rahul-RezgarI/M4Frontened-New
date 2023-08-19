import React from "react";

export default function SubscribeSection() {
  return (
    <div className="mx-auto px-4 lg:px-72 pb-8 bg-[#FAFAFB]">
      <div className="flex flex-col lg:flex-row items-center justify-between space-y-6 ">
        <p className="font-bold text-2xl mt-5 mb-8 tracking-tight">
          Got Your Perfect Coupon
        </p>
        <form className="flex w-full max-w-md items-center justify-center flex-row sm:space-y-0 shadow-lg rounded-lg bg-white">
          <input
            type="email"
            className="w-full rounded-md border-0 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#003049] disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="you@website.com"
          />
          <button
            type="submit"
            className="rounded-md border border-[#003049] uppercase bg-[#003049] py-2 px-6 text-white transition hover:border-blue-600 hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-[#003049] focus:ring-opacity-50 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-[#003049] disabled:hover:bg-[#003049] sm:max-w-max"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
}
