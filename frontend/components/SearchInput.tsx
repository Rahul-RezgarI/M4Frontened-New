import React from "react";

export default function SearchInput(props: any) {
  return (
    <div className="w-full lg:w-[560px] flex flex-col gap-4">
      <h1 className="text-sm lg:text-[24px] font-bold lg:text-center">
        Let Your Discovery Begin
      </h1>
      <input
        type="search"
        id="simple-search"
        className="bg-slate-100 border-b border-gray-300 text-[#3A3A3A] text-sm rounded-none focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 "
        placeholder="What are You Looking For"
        value={props?.value}
        onChange={props?.onChange}
      />
    </div>
  );
}
