import Image from "next/image";
import React from "react";
import noresults from "../assets/vectors/notfound.svg";

function EmptyList() {
  return (
    <div className="w-full flex flex-col min-h-[40vh] justify-center items-center">
      <h1>No results found</h1>
      <Image
        src={noresults}
        alt="No results found"
        className="w-40 h-40"
        height={100}
        width={100}
      />
    </div>
  );
}

export default EmptyList;
