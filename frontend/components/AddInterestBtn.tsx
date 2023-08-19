import { useRouter } from "next/router";
import React, { useState } from "react";

export default function AddInterestBtn(props: any) {
  const [show, setShow] = useState(false);

  const { query } = useRouter();

  return (
    <div className="shadow-md border rounded-md lg:rounded-full items-center my-3 p-4 w-full h-auto cursor-pointer">
      <div onClick={() => setShow(!show)} className="flex justify-between">
        <span className="text-[16px]">
          Interesting Facts about the {query?.category || query?.store}
          {query?.category ? " category" : " store"}
        </span>
        <i className="ri-add-line text-xl"></i>
      </div>

      {show && (
        <div className="h-auto w-full lg:w-[50vw] p-6">
          <hr className="my-2 border-rose-400" />
          <div>
            <span className="text-ellipsis whitespace-wrap break-words">
              {props?.content?.content_above}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
